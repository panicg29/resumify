const mongoose = require('mongoose');
const Resume = require('../models/resumeModel');
const { fetchJobDetailsFromUrl, buildJobDetailsFromText } = require('../utils/jobScraper');
const { generateJobTailoredResume } = require('../utils/openaiHelper');

const filterEducation = (education = []) =>
  (education || []).filter(edu => edu && edu.degree && edu.institution && edu.year);

const filterExperience = (experience = []) =>
  (experience || []).filter(exp => exp && exp.title && exp.company && exp.startDate && exp.description);

const filterSkills = (skills = []) =>
  (skills || []).filter(skill => skill && skill.name);

const filterProjects = (projects = []) =>
  (projects || []).filter(project => project && project.name && project.description);

const resolveJobDetails = async ({ jobUrl, jobDescription }) => {
  let jobDetails = null;
  let scrapeError = null;
  const cleanedDescription = (jobDescription || '').trim();

  if (jobUrl) {
    try {
      jobDetails = await fetchJobDetailsFromUrl(jobUrl);
    } catch (error) {
      scrapeError = error;
      console.error('Job scraping failed:', error.message);
    }
  }

  if ((!jobDetails || !jobDetails.fullDescription) && cleanedDescription) {
    jobDetails = buildJobDetailsFromText(cleanedDescription);
  }

  if (!jobDetails || !jobDetails.fullDescription) {
    if (scrapeError && !jobDescription) {
      throw scrapeError;
    }
    throw new Error('Failed to extract job details. Provide a valid job description or URL.');
  }

  return jobDetails;
};

const DEFAULT_CONTACT = {
  name: 'Candidate Name',
  email: 'candidate@example.com',
  phone: '+00000000000'
};

const getExperienceTitle = (experience = []) => {
  if (!experience || !experience.length) return 'No title';

  const currentRole = experience.find(exp => exp.current);
  if (currentRole && currentRole.title) {
    return currentRole.title;
  }

  const sortedByDate = [...experience].sort((a, b) => {
    const aDate = new Date(a.endDate || a.startDate || 0).getTime();
    const bDate = new Date(b.endDate || b.startDate || 0).getTime();
    return bDate - aDate;
  });

  return (sortedByDate[0] && sortedByDate[0].title) || 'No title';
};

const getResumeOptions = async (req, res) => {
  try {
    const resumes = await Resume.find({})
      .select('name experience template updatedAt')
      .sort({ updatedAt: -1 })
      .lean();

    const options = resumes.map(resume => {
      const title = getExperienceTitle(resume.experience);
      const label = `${resume.name || 'Unnamed'} - ${title}`;
      return {
        id: resume._id,
        label,
        template: resume.template || 'template1',
        updatedAt: resume.updatedAt
      };
    });

    return res.json({
      success: true,
      data: { options }
    });
  } catch (error) {
    console.error('Failed to load resume options:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to load resume dropdown options'
    });
  }
};

const generateJobAlignedResume = async (req, res) => {
  try {
    const { resumeId, jobDescription, jobUrl, template } = req.body || {};

    if (!resumeId || !mongoose.Types.ObjectId.isValid(resumeId)) {
      return res.status(400).json({
        success: false,
        message: 'A valid resumeId must be provided'
      });
    }

    if ((!jobDescription || !jobDescription.trim()) && !jobUrl) {
      return res.status(400).json({
        success: false,
        message: 'Provide either jobDescription text or jobUrl'
      });
    }

    const baseResume = await Resume.findById(resumeId).lean();
    if (!baseResume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found for tailoring'
      });
    }

    const jobDetails = await resolveJobDetails({ jobUrl, jobDescription });

    const aiResult = await generateJobTailoredResume({ jobDetails, baseResume });

    if (!aiResult.success) {
      return res.status(502).json({
        success: false,
        message: 'AI failed to generate a tailored resume',
        error: aiResult.error
      });
    }

    const aiResume = aiResult.data || {};
    const resolvedSummary =
      aiResume.summary || baseResume.summary || 'Results-driven professional aligning closely with the target role.';

    const resumePayload = {
      userId: baseResume.userId,
      name: aiResume.name || baseResume.name || DEFAULT_CONTACT.name,
      email: aiResume.email || baseResume.email || DEFAULT_CONTACT.email,
      phone: aiResume.phone || baseResume.phone || DEFAULT_CONTACT.phone,
      summary: resolvedSummary,
      education: filterEducation(aiResume.education && aiResume.education.length ? aiResume.education : baseResume.education),
      experience: filterExperience(
        aiResume.experience && aiResume.experience.length ? aiResume.experience : baseResume.experience
      ),
      skills: filterSkills(aiResume.skills && aiResume.skills.length ? aiResume.skills : baseResume.skills),
      projects: filterProjects(aiResume.projects && aiResume.projects.length ? aiResume.projects : baseResume.projects),
      template: template || aiResume.template || baseResume.template || 'template1',
      pageCount: baseResume.pageCount || 1
    };

    const resume = new Resume(resumePayload);
    await resume.save();

    return res.status(201).json({
      success: true,
      message: 'Job-tailored resume generated and saved successfully',
      data: {
        resume,
        baseResume: {
          id: baseResume._id,
          name: baseResume.name
        },
        jobDetails,
        aiGeneration: {
          model: 'gpt-4o-mini',
          source: jobDetails.sourceType,
          usedUrl: jobDetails.sourceType === 'url' ? jobDetails.source : null
        }
      }
    });
  } catch (error) {
    console.error('Job tailored resume endpoint error:', error);
    const isFetchError = error.message && error.message.includes('Failed to fetch job post');
    const isMissingJobData = error.message && error.message.includes('Failed to extract job details');
    const status = isFetchError ? 502 : isMissingJobData ? 400 : 500;
    return res.status(status).json({
      success: false,
      message: error.message || 'Unable to generate tailored resume',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

module.exports = {
  generateJobAlignedResume,
  getResumeOptions
};
