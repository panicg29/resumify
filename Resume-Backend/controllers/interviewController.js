const mongoose = require('mongoose');
const Resume = require('../models/resumeModel');
const { fetchJobDetailsFromUrl, buildJobDetailsFromText } = require('../utils/jobScraper');
const { generateInterviewPrep, OPENAI_MODEL } = require('../utils/openaiHelper');

const resolveJobDetails = async ({ jobUrl, jobDescription }) => {
  let jobDetails = null;
  let scrapeError = null;
  const cleanedDescription = (jobDescription || '').trim();

  if (jobUrl) {
    try {
      jobDetails = await fetchJobDetailsFromUrl(jobUrl);
    } catch (error) {
      scrapeError = error;
      console.error('Interview assistant job scrape failed:', error.message);
    }
  }

  if ((!jobDetails || !jobDetails.fullDescription) && cleanedDescription) {
    jobDetails = buildJobDetailsFromText(cleanedDescription);
  }

  if (!jobDetails || !jobDetails.fullDescription) {
    if (scrapeError && !jobDescription) {
      throw scrapeError;
    }
    throw new Error('Unable to read job description. Provide a valid job URL or paste the description text.');
  }

  return jobDetails;
};

const loadResume = async (resumeId) => {
  if (!resumeId) return null;
  if (!mongoose.Types.ObjectId.isValid(resumeId)) {
    throw new Error('Invalid resumeId. Must be a valid MongoDB ObjectId.');
  }
  const resume = await Resume.findById(resumeId).lean();
  if (!resume) {
    throw new Error('Resume not found for the provided resumeId.');
  }
  return resume;
};

/**
 * @route   POST /api/ai/interview-prep
 * @desc    Generate interview questions, answers, and rationales using job posting + resume/skills
 * @access  Public
 */
const generateInterviewAssistant = async (req, res) => {
  try {
    const { jobUrl, jobDescription, resumeId, skills } = req.body || {};

    if ((!jobUrl || !jobUrl.trim()) && (!jobDescription || !jobDescription.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Provide a jobUrl or jobDescription to generate interview questions.'
      });
    }

    let resumeProfile = null;
    try {
      resumeProfile = await loadResume(resumeId);
    } catch (resumeError) {
      return res.status(400).json({
        success: false,
        message: resumeError.message
      });
    }

    let jobDetails;
    try {
      jobDetails = await resolveJobDetails({ jobUrl, jobDescription });
    } catch (jobError) {
      const status = jobError.message && jobError.message.includes('fetch job post') ? 502 : 400;
      return res.status(status).json({
        success: false,
        message: jobError.message
      });
    }

    const aiResult = await generateInterviewPrep({
      jobDetails,
      resumeProfile: resumeProfile || {},
      userSkills: Array.isArray(skills) ? skills : []
    });

    if (!aiResult.success) {
      return res.status(502).json({
        success: false,
        message: 'AI failed to generate interview preparation set',
        error: aiResult.error
      });
    }

    return res.json({
      success: true,
      message: 'Interview preparation set generated successfully',
      data: {
        jobDetails,
        resume: resumeProfile ? { id: resumeProfile._id, name: resumeProfile.name } : null,
        interviewPack: aiResult.data,
        meta: {
          model: OPENAI_MODEL,
          questionCount: (aiResult.data && aiResult.data.questions && aiResult.data.questions.length) || 0,
          jobSource: jobDetails.sourceType || (jobUrl ? 'url' : 'text')
        }
      }
    });
  } catch (error) {
    console.error('Interview assistant endpoint error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while generating interview preparation',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  generateInterviewAssistant
};
