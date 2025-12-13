const Resume = require('../models/resumeModel');
const mongoose = require('mongoose');

// @desc    Create a new resume
// @route   POST /api/resumes
// @access  Public
const createResume = async (req, res) => {
  try {
    const {
      userId,
      name,
      email,
      phone,
      summary,
      education,
      experience,
      skills,
      projects,
      certifications,
      trainings,
      awards,
      languages,
      publications,
      patents,
      volunteerWork,
      professionalMemberships,
      conferences,
      speakingEngagements,
      teachingExperience,
      mentoring,
      leadershipRoles,
      internships,
      licenses,
      references,
      socialMedia,
      hobbies,
      interests,
      openSourceContributions,
      additionalInfo,
      location,
      role,
      template
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !summary) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, phone, and summary'
      });
    }

    // Filter out empty objects from arrays to avoid validation errors
    const filteredEducation = (education || []).filter(edu => edu.degree && edu.institution && edu.year);
    const filteredExperience = (experience || []).filter(exp => exp.title && exp.company && exp.startDate && exp.description);
    const filteredSkills = (skills || []).filter(skill => skill.name);
    const filteredProjects = (projects || []).filter(project => project.name && project.description);
    const filteredCertifications = (certifications || []).filter(cert => cert.name);
    const filteredTrainings = (trainings || []).filter(training => training.name);
    const filteredAwards = (awards || []).filter(award => award.name);
    const filteredLanguages = (languages || []).filter(lang => lang.name);
    const filteredPublications = (publications || []).filter(pub => pub.title);
    const filteredPatents = (patents || []).filter(patent => patent.title);
    const filteredVolunteerWork = (volunteerWork || []).filter(vol => vol.organization);
    const filteredMemberships = (professionalMemberships || []).filter(mem => mem.organization);
    const filteredConferences = (conferences || []).filter(conf => conf.name);
    const filteredSpeaking = (speakingEngagements || []).filter(speak => speak.title);
    const filteredTeaching = (teachingExperience || []).filter(teach => teach.course);
    const filteredMentoring = (mentoring || []).filter(ment => ment.organization);
    const filteredLeadership = (leadershipRoles || []).filter(lead => lead.title);
    const filteredInternships = (internships || []).filter(intern => intern.title && intern.company);
    const filteredLicenses = (licenses || []).filter(lic => lic.name);
    const filteredReferences = (references || []).filter(ref => ref.name);
    const filteredOpenSource = (openSourceContributions || []).filter(os => os.project);

    const resume = new Resume({
      userId,
      name,
      email,
      phone,
      summary,
      education: filteredEducation,
      experience: filteredExperience,
      skills: filteredSkills,
      projects: filteredProjects,
      certifications: filteredCertifications,
      trainings: filteredTrainings,
      awards: filteredAwards,
      languages: filteredLanguages,
      publications: filteredPublications,
      patents: filteredPatents,
      volunteerWork: filteredVolunteerWork,
      professionalMemberships: filteredMemberships,
      conferences: filteredConferences,
      speakingEngagements: filteredSpeaking,
      teachingExperience: filteredTeaching,
      mentoring: filteredMentoring,
      leadershipRoles: filteredLeadership,
      internships: filteredInternships,
      licenses: filteredLicenses,
      references: filteredReferences,
      socialMedia: socialMedia || {},
      hobbies: hobbies || [],
      interests: interests || [],
      openSourceContributions: filteredOpenSource,
      additionalInfo: additionalInfo || '',
      location: location || '',
      role: role || '',
      template: template || 'template1'
    });

    await resume.save();

    res.status(201).json({
      success: true,
      message: 'Resume created successfully',
      data: { resume }
    });

  } catch (error) {
    console.error('Create resume error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all resumes
// @route   GET /api/resumes
// @access  Public
const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().populate('userId', 'name email');
    
    res.json({
      success: true,
      count: resumes.length,
      data: { resumes }
    });

  } catch (error) {
    console.error('Get all resumes error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get resumes by user ID
// @route   GET /api/resumes/user/:userId
// @access  Public
const getResumesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const resumes = await Resume.find({ userId }).populate('userId', 'name email');
    
    res.json({
      success: true,
      count: resumes.length,
      data: { resumes }
    });

  } catch (error) {
    console.error('Get resumes by user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get resume by ID
// @route   GET /api/resumes/:id
// @access  Public
const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id).populate('userId', 'name email');
    
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    res.json({
      success: true,
      data: { resume }
    });

  } catch (error) {
    console.error('Get resume error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid resume ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update resume
// @route   PUT /api/resumes/:id
// @access  Public
const updateResume = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      summary,
      education,
      experience,
      skills,
      projects,
      template
    } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (summary) updateData.summary = summary;
    if (education) updateData.education = education;
    if (experience) updateData.experience = experience;
    if (skills) updateData.skills = skills;
    if (projects) updateData.projects = projects;
    if (template) updateData.template = template;

    const resume = await Resume.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('userId', 'name email');

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    res.json({
      success: true,
      message: 'Resume updated successfully',
      data: { resume }
    });

  } catch (error) {
    console.error('Update resume error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid resume ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Public
const deleteResume = async (req, res) => {
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║     DELETE REQUEST RECEIVED            ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('🆔 Resume ID:', req.params.id);
  console.log('⏰ Time:', new Date().toISOString());
  
  // Wrap EVERYTHING in try-catch
  try {
    // STEP 1: Validate ID exists
    if (!req.params.id) {
      console.log('❌ No ID provided');
      return res.status(400).json({
        success: false,
        message: 'Resume ID is required'
      });
    }

    // STEP 2: Validate ID format
    const id = req.params.id.trim();
    console.log('📋 Checking ID format...');
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log('❌ Invalid ID format:', id);
      return res.status(400).json({
        success: false,
        message: 'Invalid resume ID format. Must be 24 character hex string.'
      });
    }
    console.log('✅ ID format valid');

    // STEP 3: Check database connection
    console.log('📡 Checking database connection...');
    const dbState = mongoose.connection.readyState;
    console.log('🔌 Database state:', dbState, '(1=connected)');
    
    if (dbState !== 1) {
      console.log('❌ Database not connected (state:', dbState, ')');
      return res.status(503).json({
        success: false,
        message: 'Database temporarily unavailable. Please try again.'
      });
    }
    console.log('✅ Database connected');

    // STEP 4: Attempt to delete
    console.log('🗑️  Attempting to delete resume...');
    let resume = null;
    
    try {
      resume = await Resume.findByIdAndDelete(id);
    } catch (dbError) {
      console.error('❌ Database operation error:', dbError.message);
      return res.status(500).json({
        success: false,
        message: 'Database error during deletion'
      });
    }

    // STEP 5: Check if resume was found
    if (!resume) {
      console.log('❌ Resume not found with ID:', id);
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    // STEP 6: Success! Send response
    console.log('✅ Resume deleted successfully!');
    console.log('📄 Deleted resume:', resume.name);
    
    const response = {
      success: true,
      message: 'Resume deleted successfully',
      data: {
        deletedId: id,
        deletedName: resume.name
      }
    };
    
    // Send response
    res.status(200).json(response);
    
    console.log('📤 Response sent to client');
    console.log('╚════════════════════════════════════════╝\n');
    
    // Explicitly return to stop execution
    return;

  } catch (error) {
    // Catch ANY error
    console.error('\n╔════════════════════════════════════════╗');
    console.error('║     ❌ ERROR IN DELETE FUNCTION       ║');
    console.error('╚════════════════════════════════════════╝');
    console.error('Error Type:', error.name);
    console.error('Error Message:', error.message);
    console.error('Stack Trace:', error.stack);
    console.error('╚════════════════════════════════════════╝\n');

    // Check if response already sent
    if (res.headersSent) {
      console.error('⚠️  Response already sent - cannot send error response');
      return;
    }

    // Send error response
    return res.status(500).json({
      success: false,
      message: 'An error occurred while deleting the resume',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Generate resume from natural language prompt
// @route   POST /api/ai/generate-resume
// @access  Public
const generateResumeFromPrompt = async (req, res) => {
  try {
    const { prompt, template } = req.body;

    // Validate required fields
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Prompt is required and must be a non-empty string'
      });
    }

    // Import OpenAI helper
    const { generateResumeFromPrompt: generateWithAI } = require('../utils/openaiHelper');

    // Generate resume with AI
    console.log('Generating resume from prompt...');
    const aiResult = await generateWithAI(prompt);

    if (!aiResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to generate resume with AI',
        error: aiResult.error
      });
    }

    const resumeData = aiResult.data;
    console.log('AI resume generation successful');

    // Validate parsed data has required fields
    if (!resumeData.name || !resumeData.email || !resumeData.phone || !resumeData.summary) {
      return res.status(500).json({
        success: false,
        message: 'AI could not generate complete resume data. Please provide more details in your prompt.'
      });
    }

    // Filter out empty objects from arrays to avoid validation errors
    const filteredEducation = (resumeData.education || []).filter(edu => edu.degree && edu.institution && edu.year);
    const filteredExperience = (resumeData.experience || []).filter(exp => exp.title && exp.company && exp.startDate && exp.description);
    const filteredSkills = (resumeData.skills || []).filter(skill => skill.name);
    const filteredProjects = (resumeData.projects || []).filter(project => project.name && project.description);
    const filteredCertifications = (resumeData.certifications || []).filter(cert => cert.name);
    const filteredTrainings = (resumeData.trainings || []).filter(training => training.name);
    const filteredAwards = (resumeData.awards || []).filter(award => award.name);
    const filteredLanguages = (resumeData.languages || []).filter(lang => lang.name);
    const filteredPublications = (resumeData.publications || []).filter(pub => pub.title);
    const filteredPatents = (resumeData.patents || []).filter(patent => patent.title);
    const filteredVolunteerWork = (resumeData.volunteerWork || []).filter(vol => vol.organization);
    const filteredMemberships = (resumeData.professionalMemberships || []).filter(mem => mem.organization);
    const filteredConferences = (resumeData.conferences || []).filter(conf => conf.name);
    const filteredSpeaking = (resumeData.speakingEngagements || []).filter(speak => speak.title);
    const filteredTeaching = (resumeData.teachingExperience || []).filter(teach => teach.course);
    const filteredMentoring = (resumeData.mentoring || []).filter(ment => ment.organization);
    const filteredLeadership = (resumeData.leadershipRoles || []).filter(lead => lead.title);
    const filteredInternships = (resumeData.internships || []).filter(intern => intern.title && intern.company);
    const filteredLicenses = (resumeData.licenses || []).filter(lic => lic.name);
    const filteredReferences = (resumeData.references || []).filter(ref => ref.name);
    const filteredOpenSource = (resumeData.openSourceContributions || []).filter(os => os.project);

    // Create resume record (without userId)
    const resume = new Resume({
      name: resumeData.name,
      email: resumeData.email,
      phone: resumeData.phone,
      summary: resumeData.summary,
      education: filteredEducation,
      experience: filteredExperience,
      skills: filteredSkills,
      projects: filteredProjects,
      certifications: filteredCertifications,
      trainings: filteredTrainings,
      awards: filteredAwards,
      languages: filteredLanguages,
      publications: filteredPublications,
      patents: filteredPatents,
      volunteerWork: filteredVolunteerWork,
      professionalMemberships: filteredMemberships,
      conferences: filteredConferences,
      speakingEngagements: filteredSpeaking,
      teachingExperience: filteredTeaching,
      mentoring: filteredMentoring,
      leadershipRoles: filteredLeadership,
      internships: filteredInternships,
      licenses: filteredLicenses,
      references: filteredReferences,
      socialMedia: resumeData.socialMedia || {},
      hobbies: resumeData.hobbies || [],
      interests: resumeData.interests || [],
      openSourceContributions: filteredOpenSource,
      additionalInfo: resumeData.additionalInfo || '',
      location: resumeData.location || '',
      role: resumeData.role || '',
      template: template || 'template1'
    });

    await resume.save();

    res.status(201).json({
      success: true,
      message: 'Resume generated successfully from prompt',
      data: {
        resume,
        aiGeneration: {
          success: true,
          promptLength: prompt.length,
          model: 'gpt-4o-mini'
        }
      }
    });

  } catch (error) {
    console.error('Generate resume from prompt error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during resume generation',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
};

// @desc    Update resume from natural language prompt
// @route   PUT /api/ai/update-resume/:id
// @access  Public
const updateResumeFromPrompt = async (req, res) => {
  try {
    const { id } = req.params;
    const { prompt, template } = req.body;

    // Validate resume ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid resume ID format. Must be a valid MongoDB ObjectId.'
      });
    }

    // Validate prompt
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Prompt is required and must be a non-empty string'
      });
    }

    // Get existing resume
    const existingResume = await Resume.findById(id);
    if (!existingResume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    // Convert resume to plain object for AI
    const resumeObj = existingResume.toObject();

    // Import OpenAI helper
    const { updateResumeFromPrompt: updateWithAI } = require('../utils/openaiHelper');

    // Get updated fields from AI
    console.log('Updating resume from prompt...');
    const aiResult = await updateWithAI(resumeObj, prompt);

    if (!aiResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to process update with AI',
        error: aiResult.error
      });
    }

    const updateData = aiResult.data;
    console.log('AI update successful, applying changes...');

    // Validate that we have some update data
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No changes detected from the prompt. Please be more specific about what you want to update.'
      });
    }

    // Prepare update data (filter empty arrays and objects)
    const finalUpdateData = {};
    
    if (updateData.name) finalUpdateData.name = updateData.name;
    if (updateData.email) finalUpdateData.email = updateData.email;
    if (updateData.phone) finalUpdateData.phone = updateData.phone;
    if (updateData.summary) finalUpdateData.summary = updateData.summary;
    
    if (updateData.education && Array.isArray(updateData.education) && updateData.education.length > 0) {
      finalUpdateData.education = updateData.education.filter(edu => edu.degree && edu.institution && edu.year);
    }
    
    if (updateData.experience && Array.isArray(updateData.experience) && updateData.experience.length > 0) {
      finalUpdateData.experience = updateData.experience.filter(exp => exp.title && exp.company && exp.startDate && exp.description);
    }
    
    if (updateData.skills && Array.isArray(updateData.skills) && updateData.skills.length > 0) {
      finalUpdateData.skills = updateData.skills.filter(skill => skill.name);
    }
    
    if (updateData.projects && Array.isArray(updateData.projects) && updateData.projects.length > 0) {
      finalUpdateData.projects = updateData.projects.filter(project => project.name && project.description);
    }
    
    if (updateData.certifications && Array.isArray(updateData.certifications) && updateData.certifications.length > 0) {
      finalUpdateData.certifications = updateData.certifications.filter(cert => cert.name);
    }
    
    if (updateData.trainings && Array.isArray(updateData.trainings) && updateData.trainings.length > 0) {
      finalUpdateData.trainings = updateData.trainings.filter(training => training.name);
    }
    
    if (updateData.awards && Array.isArray(updateData.awards) && updateData.awards.length > 0) {
      finalUpdateData.awards = updateData.awards.filter(award => award.name);
    }
    
    if (updateData.languages && Array.isArray(updateData.languages) && updateData.languages.length > 0) {
      finalUpdateData.languages = updateData.languages.filter(lang => lang.name);
    }
    
    if (updateData.publications && Array.isArray(updateData.publications) && updateData.publications.length > 0) {
      finalUpdateData.publications = updateData.publications.filter(pub => pub.title);
    }
    
    if (updateData.patents && Array.isArray(updateData.patents) && updateData.patents.length > 0) {
      finalUpdateData.patents = updateData.patents.filter(patent => patent.title);
    }
    
    if (updateData.volunteerWork && Array.isArray(updateData.volunteerWork) && updateData.volunteerWork.length > 0) {
      finalUpdateData.volunteerWork = updateData.volunteerWork.filter(vol => vol.organization);
    }
    
    if (updateData.professionalMemberships && Array.isArray(updateData.professionalMemberships) && updateData.professionalMemberships.length > 0) {
      finalUpdateData.professionalMemberships = updateData.professionalMemberships.filter(mem => mem.organization);
    }
    
    if (updateData.conferences && Array.isArray(updateData.conferences) && updateData.conferences.length > 0) {
      finalUpdateData.conferences = updateData.conferences.filter(conf => conf.name);
    }
    
    if (updateData.speakingEngagements && Array.isArray(updateData.speakingEngagements) && updateData.speakingEngagements.length > 0) {
      finalUpdateData.speakingEngagements = updateData.speakingEngagements.filter(speak => speak.title);
    }
    
    if (updateData.teachingExperience && Array.isArray(updateData.teachingExperience) && updateData.teachingExperience.length > 0) {
      finalUpdateData.teachingExperience = updateData.teachingExperience.filter(teach => teach.course);
    }
    
    if (updateData.mentoring && Array.isArray(updateData.mentoring) && updateData.mentoring.length > 0) {
      finalUpdateData.mentoring = updateData.mentoring.filter(ment => ment.organization);
    }
    
    if (updateData.leadershipRoles && Array.isArray(updateData.leadershipRoles) && updateData.leadershipRoles.length > 0) {
      finalUpdateData.leadershipRoles = updateData.leadershipRoles.filter(lead => lead.title);
    }
    
    if (updateData.internships && Array.isArray(updateData.internships) && updateData.internships.length > 0) {
      finalUpdateData.internships = updateData.internships.filter(intern => intern.title && intern.company);
    }
    
    if (updateData.licenses && Array.isArray(updateData.licenses) && updateData.licenses.length > 0) {
      finalUpdateData.licenses = updateData.licenses.filter(lic => lic.name);
    }
    
    if (updateData.references && Array.isArray(updateData.references) && updateData.references.length > 0) {
      finalUpdateData.references = updateData.references.filter(ref => ref.name);
    }
    
    if (updateData.openSourceContributions && Array.isArray(updateData.openSourceContributions) && updateData.openSourceContributions.length > 0) {
      finalUpdateData.openSourceContributions = updateData.openSourceContributions.filter(os => os.project);
    }
    
    if (updateData.socialMedia) {
      finalUpdateData.socialMedia = updateData.socialMedia;
    }
    
    if (updateData.hobbies && Array.isArray(updateData.hobbies)) {
      finalUpdateData.hobbies = updateData.hobbies;
    }
    
    if (updateData.interests && Array.isArray(updateData.interests)) {
      finalUpdateData.interests = updateData.interests;
    }
    
    if (updateData.additionalInfo) {
      finalUpdateData.additionalInfo = updateData.additionalInfo;
    }
    
    if (updateData.location) {
      finalUpdateData.location = updateData.location;
    }
    
    if (updateData.role) {
      finalUpdateData.role = updateData.role;
    }
    
    // Add template if provided
    if (template) {
      finalUpdateData.template = template;
    }

    // Update the resume
    const updatedResume = await Resume.findByIdAndUpdate(
      id,
      finalUpdateData,
      { new: true, runValidators: true }
    ).populate('userId', 'name email');

    if (!updatedResume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    res.json({
      success: true,
      message: 'Resume updated successfully from prompt',
      data: {
        resume: updatedResume,
        aiUpdate: {
          success: true,
          promptLength: prompt.length,
          model: 'gpt-4o-mini',
          fieldsUpdated: Object.keys(finalUpdateData)
        }
      }
    });

  } catch (error) {
    console.error('Update resume from prompt error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid resume ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during resume update',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
};

// @desc    Analyze resume and generate detailed report
// @route   GET /api/ai/analyze-resume/:id
// @access  Public
const analyzeResumeReport = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate resume ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid resume ID format. Must be a valid MongoDB ObjectId.'
      });
    }

    // Get resume
    const resume = await Resume.findById(id);
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    // Convert resume to plain object for AI
    const resumeObj = resume.toObject();

    // Import OpenAI helper
    const { analyzeResumeReport: analyzeWithAI } = require('../utils/openaiHelper');

    // Generate analysis report
    console.log('Generating detailed resume analysis report...');
    const aiResult = await analyzeWithAI(resumeObj);

    if (!aiResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to analyze resume with AI',
        error: aiResult.error
      });
    }

    const report = aiResult.data;
    console.log('Resume analysis completed successfully');

    res.json({
      success: true,
      message: 'Resume analysis report generated successfully',
      data: {
        resumeId: id,
        report: report,
        generatedAt: new Date().toISOString(),
        model: 'gpt-4o-mini'
      }
    });

  } catch (error) {
    console.error('Analyze resume report error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during resume analysis',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
};

module.exports = {
  createResume,
  getAllResumes,
  getResumesByUserId,
  getResumeById,
  updateResume,
  deleteResume,
  generateResumeFromPrompt,
  updateResumeFromPrompt,
  analyzeResumeReport
};
