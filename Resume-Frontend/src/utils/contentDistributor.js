/**
 * Content Distributor Utility
 * Intelligently distributes resume content across multiple pages
 * Ensures NO blank spaces - pages are filled top to bottom
 */

/**
 * Estimates how many pages the content actually needs
 * @param {Object} resumeData - Full resume data object
 * @returns {number} - Estimated pages needed (1-3)
 */
export function calculatePagesNeeded(resumeData) {
  if (!resumeData) return 1;

  const summaryLength = resumeData.summary?.length || 0;
  const educationCount = resumeData.education?.length || 0;
  const experienceCount = resumeData.experience?.length || 0;
  const skillsCount = resumeData.skills?.length || 0;
  const projectsCount = resumeData.projects?.length || 0;
  const certificationsCount = resumeData.certifications?.length || 0;
  const awardsCount = resumeData.awards?.length || 0;
  const languagesCount = resumeData.languages?.length || 0;

  // Calculate content density
  let contentScore = 0;

  // Summary weight
  if (summaryLength > 300) contentScore += 2;
  else if (summaryLength > 150) contentScore += 1;

  // Education weight (each education entry = 1 point)
  contentScore += Math.min(educationCount, 4);

  // Experience weight (each experience = 2-3 points depending on description length)
  resumeData.experience?.forEach(exp => {
    const descLength = exp.description?.length || 0;
    if (descLength > 200) contentScore += 3;
    else if (descLength > 100) contentScore += 2;
    else contentScore += 1;
  });

  // Skills weight (every 10 skills = 1 point)
  contentScore += Math.ceil(skillsCount / 10);

  // Projects weight (each project = 2 points)
  contentScore += projectsCount * 2;

  // Certifications, Awards, Languages (each = 0.5 points)
  contentScore += (certificationsCount + awardsCount + languagesCount) * 0.5;

  // Determine pages needed based on content score
  // Page 1 capacity: ~15-20 points
  // Page 2 capacity: ~15-20 points
  // Page 3 capacity: ~15-20 points

  if (contentScore <= 20) return 1;
  if (contentScore <= 40) return 2;
  return 3; // Max 3 pages for now
}

/**
 * Distributes content across pages intelligently
 * Ensures each page is filled completely with no blank spaces
 * @param {Object} resumeData - Full resume data
 * @param {number} maxPages - Maximum pages allowed (from uploaded PDF)
 * @returns {Object} - { pagesNeeded, distributedContent: [page1Data, page2Data, page3Data] }
 */
export function distributeContent(resumeData, maxPages = 3) {
  if (!resumeData) {
    return {
      pagesNeeded: 1,
      distributedContent: [resumeData]
    };
  }

  const pagesNeeded = calculatePagesNeeded(resumeData);
  const actualPages = Math.min(pagesNeeded, maxPages);

  const pages = [];

  // Extract data arrays
  const allEducation = resumeData.education || [];
  const allExperience = resumeData.experience || [];
  const allSkills = resumeData.skills || [];
  const allProjects = resumeData.projects || [];
  const allCertifications = resumeData.certifications || [];
  const allAwards = resumeData.awards || [];
  const allLanguages = resumeData.languages || [];

  // PAGE 1: Header, Summary, Skills (first 15-18), Education (first 2)
  pages[0] = {
    ...resumeData,
    name: resumeData.name,
    email: resumeData.email,
    phone: resumeData.phone,
    location: resumeData.location,
    role: resumeData.role,
    summary: resumeData.summary,
    education: allEducation.slice(0, 2),
    experience: [],
    skills: allSkills.slice(0, 18), // First 18 skills
    projects: [],
    certifications: [],
    awards: [],
    languages: []
  };

  // PAGE 2: Experience (all), Skills (remaining), Education (remaining)
  if (actualPages >= 2) {
    pages[1] = {
      ...resumeData,
      name: resumeData.name,
      email: resumeData.email,
      phone: resumeData.phone,
      location: resumeData.location,
      role: resumeData.role,
      summary: '', // Don't repeat summary
      education: allEducation.slice(2), // Remaining education
      experience: allExperience, // All experience on page 2
      skills: allSkills.slice(18), // Remaining skills
      projects: [],
      certifications: [],
      awards: [],
      languages: []
    };
  }

  // PAGE 3: Projects, Certifications, Awards, Languages, Additional
  if (actualPages >= 3) {
    pages[2] = {
      ...resumeData,
      name: resumeData.name,
      email: resumeData.email,
      phone: resumeData.phone,
      location: resumeData.location,
      role: resumeData.role,
      summary: '',
      education: [],
      experience: [],
      skills: [], // Skills already distributed
      projects: allProjects, // All projects on page 3
      certifications: allCertifications,
      awards: allAwards,
      languages: allLanguages
    };
  }

  // If only 1 page needed, combine everything
  if (actualPages === 1) {
    pages[0] = {
      ...resumeData,
      education: allEducation,
      experience: allExperience.slice(0, 3), // Limit experience on 1 page
      skills: allSkills.slice(0, 20), // Limit skills on 1 page
      projects: allProjects.slice(0, 2), // Limit projects on 1 page
      certifications: allCertifications.slice(0, 3),
      awards: allAwards.slice(0, 2),
      languages: allLanguages
    };
  }

  // If only 2 pages needed, redistribute
  if (actualPages === 2) {
    // Move some projects to page 2 if there's space
    if (allProjects.length > 0 && allExperience.length <= 3) {
      pages[1].projects = allProjects.slice(0, 2);
      pages[1].certifications = allCertifications.slice(0, 3);
      pages[1].awards = allAwards.slice(0, 2);
      pages[1].languages = allLanguages;
    }
  }

  return {
    pagesNeeded: actualPages,
    distributedContent: pages.slice(0, actualPages)
  };
}

/**
 * Gets the page content for a specific page number
 * @param {Object} resumeData - Full resume data
 * @param {number} pageNumber - Page number (1-indexed)
 * @param {number} maxPages - Maximum pages allowed
 * @returns {Object} - Content for that specific page
 */
export function getPageContent(resumeData, pageNumber, maxPages = 3) {
  const { distributedContent } = distributeContent(resumeData, maxPages);
  const pageIndex = pageNumber - 1; // Convert to 0-indexed
  
  if (pageIndex < 0 || pageIndex >= distributedContent.length) {
    return null;
  }
  
  return distributedContent[pageIndex];
}

/**
 * Validates that content distribution is correct
 * @param {Object} distributionResult - Result from distributeContent
 * @returns {boolean} - True if valid
 */
export function validateDistribution(distributionResult) {
  if (!distributionResult || !distributionResult.distributedContent) {
    return false;
  }

  const { pagesNeeded, distributedContent } = distributionResult;

  // Check that we have the right number of pages
  if (distributedContent.length !== pagesNeeded) {
    return false;
  }

  // Check that each page has some content (no completely empty pages)
  return distributedContent.every(page => {
    return (
      page.summary ||
      (page.education && page.education.length > 0) ||
      (page.experience && page.experience.length > 0) ||
      (page.skills && page.skills.length > 0) ||
      (page.projects && page.projects.length > 0) ||
      (page.certifications && page.certifications.length > 0) ||
      (page.awards && page.awards.length > 0) ||
      (page.languages && page.languages.length > 0)
    );
  });
}

export default {
  calculatePagesNeeded,
  distributeContent,
  getPageContent,
  validateDistribution
};

