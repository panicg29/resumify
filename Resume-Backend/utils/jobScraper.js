const axios = require('axios');
const cheerio = require('cheerio');

const DEFAULT_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
};

const normalizeText = (text = '') =>
  text
    .replace(/\s+/g, ' ')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .trim();

const splitList = (text = '') =>
  text
    .split(/\n|•|-/)
    .map(part => normalizeText(part))
    .filter(Boolean);

const limitText = (text = '', maxLength = 8000) =>
  text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;

const getFirstMatch = ($, selectors = []) => {
  for (const selector of selectors) {
    const value = normalizeText($(selector).first().text());
    if (value) {
      return value;
    }
  }
  return '';
};

const extractMetaContent = ($, names = []) => {
  for (const name of names) {
    const meta = $(`meta[name="${name}"], meta[property="${name}"]`).attr('content');
    if (meta) {
      return normalizeText(meta);
    }
  }
  return '';
};

const isHeading = tagName => /^H[1-6]$/i.test(tagName || '');

const collectSectionAfterHeading = ($, headingEl) => {
  const content = [];
  let pointer = $(headingEl).next();
  let guard = 0;

  while (pointer.length && guard < 30) {
    guard += 1;
    const tagName = pointer[0].tagName ? pointer[0].tagName.toUpperCase() : '';
    if (isHeading(tagName)) break;

    const text = normalizeText(pointer.text());
    if (text) content.push(text);

    const listItems = pointer
      .find('li')
      .map((_, li) => normalizeText($(li).text()))
      .get()
      .filter(Boolean);

    if (listItems.length) {
      return listItems;
    }

    pointer = pointer.next();
  }

  return splitList(content.join('\n'));
};

const extractSection = ($, keywords = []) => {
  const matches = [];
  $('h1, h2, h3, h4, h5, h6, strong, b, p').each((_, el) => {
    const text = normalizeText($(el).text());
    const lower = text.toLowerCase();

    if (keywords.some(keyword => lower.includes(keyword))) {
      const sectionContent = collectSectionAfterHeading($, el);
      if (sectionContent.length) {
        matches.push(...sectionContent);
        return false; // break loop
      }
    }
  });
  return matches;
};

const extractExperienceLevel = (text = '') => {
  const expMatch = text.match(/(\d+)\+?\s*(?:years|yrs?).{0,30}(?:experience|exp)/i);
  if (expMatch) {
    return `${expMatch[1]}+ years experience`;
  }

  const seniorityMatch = text.match(/\b(junior|mid(?:-level)?|senior|lead|entry level)\b/i);
  if (seniorityMatch) {
    return seniorityMatch[1];
  }

  return '';
};

const extractSkills = (text = '') => {
  const skillKeywords = text
    .match(/\b[A-Za-z]{2,}(?:\s+[A-Za-z]{2,})?(?=(?:,|\sand|\sor|\.) )/g) || [];

  const cleaned = skillKeywords
    .map(word => normalizeText(word))
    .filter(Boolean)
    .filter(word => word.length <= 40);

  return Array.from(new Set(cleaned)).slice(0, 20);
};

const buildJobDetailsFromText = (jobDescription = '') => {
  const normalized = jobDescription.replace(/\r/g, '\n');

  const section = (labelRegex) => {
    const regex = new RegExp(`${labelRegex}[:\\-\\s]*([\\s\\S]+?)(?=\\n\\s*[A-Z][^\\n]{2,40}:|$)`, 'i');
    const match = normalized.match(regex);
    if (!match) return [];
    return splitList(match[1]);
  };

  const responsibilities = section('(responsibilities|what you will do|duties)');
  const requirements = section('(requirements|qualifications|must have)');
  const skills = section('(skills|tech stack|tools)') || extractSkills(normalized);
  const experienceLevel = extractExperienceLevel(normalized);

  return {
    sourceType: 'text',
    source: 'direct-input',
    title: '',
    company: '',
    location: '',
    responsibilities,
    requirements,
    skills,
    experienceLevel,
    fullDescription: limitText(normalizeText(normalized))
  };
};

const fetchJobDetailsFromUrl = async (jobUrl) => {
  if (!jobUrl || typeof jobUrl !== 'string') {
    throw new Error('Job URL is required');
  }

  try {
    // Validate URL
    // eslint-disable-next-line no-new
    new URL(jobUrl);
  } catch (error) {
    throw new Error('Invalid job URL provided');
  }

  try {
    const response = await axios.get(jobUrl, {
      headers: DEFAULT_HEADERS,
      timeout: 15000
    });

    const html = response.data;
    const $ = cheerio.load(html);

    const title =
      extractMetaContent($, ['og:title', 'twitter:title']) ||
      getFirstMatch($, ['h1', '.job-title', '.top-card-layout__title', '[data-testid="jobTitle"]']);

    const company =
      extractMetaContent($, ['og:site_name']) ||
      getFirstMatch($, ['.company', '.company-name', '.topcard__org-name-link', '[data-testid="companyName"]']);

    const location = getFirstMatch($, ['.location', '.job-location', '[data-testid="jobLocation"]', '.topcard__flavor']);

    const responsibilities = extractSection($, ['responsibil', 'duties', 'what you will do']);
    const requirements = extractSection($, ['requirement', 'qualification', 'must have', 'you have']);
    const skills = extractSection($, ['skill', 'tech stack', 'tools']) || extractSkills(normalizeText($('body').text()));

    const bodyText = limitText(normalizeText($('main').text()) || normalizeText($('body').text()));

    return {
      sourceType: 'url',
      source: jobUrl,
      title,
      company,
      location,
      responsibilities,
      requirements,
      skills,
      experienceLevel: extractExperienceLevel(bodyText),
      fullDescription: bodyText
    };
  } catch (error) {
    if (error.response) {
      throw new Error(`Failed to fetch job post (status ${error.response.status})`);
    }
    if (error.code === 'ECONNABORTED') {
      throw new Error('Timeout while fetching job post');
    }
    throw new Error(error.message || 'Could not fetch job post');
  }
};

module.exports = {
  fetchJobDetailsFromUrl,
  buildJobDetailsFromText
};
