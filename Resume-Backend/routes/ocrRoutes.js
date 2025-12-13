/**
 * OCR Routes (CommonJS)
 * Express routes for OCR functionality using OCR.Space API
 * Uses ES Module service via dynamic imports
 */

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/ocr';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, 'ocr-' + uniqueSuffix + extension);
  }
});

// File filter for OCR - allow images and PDFs
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/tiff',
    'image/tif',
    'application/pdf'
  ];
  
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.tif', '.pdf'];
  const fileExtension = file.originalname
    .toLowerCase()
    .substring(file.originalname.lastIndexOf('.'));
  
  const isValidMimeType = allowedMimeTypes.includes(file.mimetype);
  const isValidExtension = allowedExtensions.includes(fileExtension);
  
  if (isValidMimeType || isValidExtension) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Allowed types: ${allowedExtensions.join(', ')}`), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

/**
 * @route   POST /api/ocr/file
 * @desc    Extract text from uploaded file (image or PDF), parse it with OpenAI, and create structured resume
 * @access  Public
 */
router.post('/file', upload.single('file'), async (req, res) => {
  // Cleanup function to remove uploaded file after processing
  const cleanup = (filePath) => {
    if (filePath && fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (error) {
        console.error('Error cleaning up file:', error.message);
      }
    }
  };

  let uploadedFilePath = null;

  try {
    // Dynamic import of ES Module service
    const { extractTextFromFile } = await import('../utils/ocrService.mjs');

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
        error: 'Please provide a file in the request. Use multipart/form-data with key "file".'
      });
    }

    uploadedFilePath = req.file.path;

    // Extract OCR options from request body or query parameters
    const ocrOptions = {
      language: req.body.language || req.query.language,
      OCREngine: req.body.OCREngine || req.query.OCREngine,
      detectOrientation: req.body.detectOrientation || req.query.detectOrientation,
      scale: req.body.scale || req.query.scale,
      isCreateSearchablePdf: req.body.isCreateSearchablePdf || req.query.isCreateSearchablePdf,
      isSearchablePdfHideTextLayer: req.body.isSearchablePdfHideTextLayer || req.query.isSearchablePdfHideTextLayer
    };

    // Process OCR
    const result = await extractTextFromFile(req.file, ocrOptions);

    let parsedResume = null;
    let parseError = null;

    // Parse extracted text using OpenAI and create structured resume
    if (result.extractedText && result.extractedText.trim().length > 0) {
      try {
        const { parseResumeWithAI } = require('../utils/openaiHelper');
        
        // Parse the extracted text using OpenAI
        const parseResult = await parseResumeWithAI(result.extractedText);
        
        if (parseResult.success && parseResult.data) {
          const resumeData = parseResult.data;
          
          // Filter out invalid entries to avoid validation errors
          const filteredEducation = (resumeData.education || []).filter(
            edu => edu.degree && edu.institution && edu.year
          );
          
          const filteredExperience = (resumeData.experience || []).filter(
            exp => exp.title && exp.company && exp.startDate && exp.description
          );
          
          const filteredSkills = (resumeData.skills || []).filter(
            skill => skill.name
          );
          
          const filteredProjects = (resumeData.projects || []).filter(
            project => project.name && project.description
          );
          
          const filteredCertifications = (resumeData.certifications || []).filter(
            cert => cert.name
          );
          
          const filteredTrainings = (resumeData.trainings || []).filter(
            training => training.name
          );
          
          const filteredAwards = (resumeData.awards || []).filter(
            award => award.name
          );
          
          const filteredLanguages = (resumeData.languages || []).filter(
            lang => lang.name
          );
          
          const filteredPublications = (resumeData.publications || []).filter(
            pub => pub.title
          );
          
          const filteredPatents = (resumeData.patents || []).filter(
            patent => patent.title
          );
          
          const filteredVolunteerWork = (resumeData.volunteerWork || []).filter(
            vol => vol.organization
          );
          
          const filteredMemberships = (resumeData.professionalMemberships || []).filter(
            mem => mem.organization
          );
          
          const filteredConferences = (resumeData.conferences || []).filter(
            conf => conf.name
          );
          
          const filteredSpeaking = (resumeData.speakingEngagements || []).filter(
            speak => speak.title
          );
          
          const filteredTeaching = (resumeData.teachingExperience || []).filter(
            teach => teach.course
          );
          
          const filteredMentoring = (resumeData.mentoring || []).filter(
            ment => ment.organization
          );
          
          const filteredLeadership = (resumeData.leadershipRoles || []).filter(
            lead => lead.title
          );
          
          const filteredInternships = (resumeData.internships || []).filter(
            intern => intern.title && intern.company
          );
          
          const filteredLicenses = (resumeData.licenses || []).filter(
            lic => lic.name
          );
          
          const filteredReferences = (resumeData.references || []).filter(
            ref => ref.name
          );
          
          const filteredOpenSource = (resumeData.openSourceContributions || []).filter(
            os => os.project
          );
          
          // Create and save resume to database
          const Resume = require('../models/resumeModel');
          const resume = new Resume({
            userId: req.body.userId || null,
            name: resumeData.name || 'Unknown',
            email: resumeData.email || 'unknown@example.com',
            phone: resumeData.phone || '',
            summary: resumeData.summary || '',
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
            template: req.body.template || 'template1'
          });

          await resume.save();
          parsedResume = resume;
        } else {
          parseError = parseResult.error || 'Failed to parse resume';
        }
      } catch (error) {
        console.error('Resume parsing error:', error);
        parseError = error.message || 'Failed to parse and create resume';
      }
    } else {
      parseError = 'No text extracted from file';
    }

    // Cleanup uploaded file after processing
    cleanup(uploadedFilePath);

    // Return success response with resume only
    if (parsedResume) {
      return res.status(200).json({
        success: true,
        message: 'Resume created successfully from file',
        data: {
          resume: parsedResume
        }
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Failed to create resume from file',
        error: parseError || 'Unknown error occurred during resume creation'
      });
    }

  } catch (error) {
    // Cleanup uploaded file on error
    if (uploadedFilePath) {
      cleanup(uploadedFilePath);
    }

    // Handle different error types
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large',
        error: 'File size exceeds the 10MB limit'
      });
    }

    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Unexpected file field',
        error: 'Please use "file" as the field name for file upload'
      });
    }

    // Handle OCR service errors
    if (error.success === false) {
      return res.status(500).json({
        success: false,
        message: 'OCR processing failed',
        error: error.error || 'Unknown error occurred',
        fileInfo: error.fileInfo || null
      });
    }

    // Handle validation errors
    if (error.message && error.message.includes('Invalid file type')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid file type',
        error: error.message
      });
    }

    // Generic error handler
    console.error('OCR File Endpoint Error:', {
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'An error occurred while processing the file'
    });
  }
});

/**
 * @route   POST /api/ocr/url
 * @desc    Extract text from remote file URL
 * @access  Public
 */
router.post('/url', async (req, res) => {
  try {
    // Dynamic import of ES Module service
    const { extractTextFromUrl } = await import('../utils/ocrService.mjs');

    // Validate request body
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Invalid request body',
        error: 'Request body must be a JSON object'
      });
    }

    // Extract URL from request body
    const url = req.body.url;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: 'URL is required',
        error: 'Please provide a "url" field in the request body'
      });
    }

    // Extract OCR options from request body
    const ocrOptions = {
      language: req.body.language,
      OCREngine: req.body.OCREngine,
      detectOrientation: req.body.detectOrientation,
      scale: req.body.scale,
      isCreateSearchablePdf: req.body.isCreateSearchablePdf,
      isSearchablePdfHideTextLayer: req.body.isSearchablePdfHideTextLayer
    };

    // Process OCR from URL
    const result = await extractTextFromUrl(url, ocrOptions);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Text extracted successfully from URL',
      data: {
        extractedText: result.extractedText,
        url: result.url,
        rawResponse: result.rawResponse
      }
    });

  } catch (error) {
    // Handle different error types
    if (error.success === false) {
      return res.status(500).json({
        success: false,
        message: 'OCR processing failed',
        error: error.error || 'Unknown error occurred',
        url: error.url || null
      });
    }

    // Handle validation errors
    if (error.message && (error.message.includes('Invalid URL') || error.message.includes('URL must'))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid URL',
        error: error.message
      });
    }

    // Generic error handler
    console.error('OCR URL Endpoint Error:', {
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'An error occurred while processing the URL'
    });
  }
});

/**
 * @route   GET /api/ocr/health
 * @desc    Health check endpoint for OCR service
 * @access  Public
 */
router.get('/health', (req, res) => {
  const apiKeyConfigured = !!process.env.OCR_SPACE_API_KEY;
  
  return res.status(200).json({
    success: true,
    message: 'OCR service health check',
    data: {
      status: apiKeyConfigured ? 'configured' : 'not_configured',
      apiKeySet: apiKeyConfigured,
      timestamp: new Date().toISOString()
    }
  });
});

module.exports = router;
