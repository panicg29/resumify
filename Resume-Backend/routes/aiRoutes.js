const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const { parseResumeWithAI, OPENAI_MODEL } = require('../utils/openaiHelper');
const { createResume, generateResumeFromPrompt, updateResumeFromPrompt, analyzeResumeReport } = require('../controllers/resumeController');
const { generateJobAlignedResume, getResumeOptions } = require('../controllers/jobTailoredResumeController');
const { processDocument } = require('../controllers/textractController');
const { generateInterviewAssistant } = require('../controllers/interviewController');
const { awsClient } = require('../utils/awsClient');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'resume-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to only allow PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' || path.extname(file.originalname).toLowerCase() === '.pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: fileFilter
});

/**
 * Helper function to delete file safely
 */
const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`File deleted: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error deleting file ${filePath}:`, error);
  }
};

// ============================================================================
// SIMPLE PDF TEXT EXTRACTION ENDPOINT
// ============================================================================

/**
 * @route   POST /api/ai/extract-pdf-text
 * @desc    Extract all text from any PDF (text-based or image-based)
 * @access  Public
 */
router.post('/extract-pdf-text', upload.single('file'), async (req, res) => {
  let filePath = null;

  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No PDF file uploaded. Please upload a PDF file.'
      });
    }

    filePath = req.file.path;
    console.log(`Processing PDF: ${req.file.originalname}`);

    // Read PDF file
    const dataBuffer = fs.readFileSync(filePath);
    console.log(`PDF size: ${dataBuffer.length} bytes`);

    // Step 1: Try direct text extraction with pdf-parse
    let extractedText = '';
    try {
      console.log('Attempting direct text extraction...');
      const pdfData = await pdfParse(dataBuffer);
      extractedText = pdfData.text || '';
      console.log(`Direct extraction result: ${extractedText.length} characters`);
    } catch (error) {
      console.log('Direct extraction failed:', error.message);
      extractedText = '';
    }

    // Step 2: If no text extracted, try AWS Textract
    if (!extractedText || extractedText.trim().length < 10) {
      console.log('Direct extraction failed or insufficient text, trying AWS Textract...');
      try {
        if (awsClient.isAvailable()) {
          const textractResult = await processDocument(filePath, false);
          extractedText = textractResult.text || '';
          console.log(`AWS Textract extraction result: ${extractedText.length} characters`);
        } else {
          console.log('AWS Textract not configured');
        }
      } catch (textractError) {
        console.error('AWS Textract extraction failed:', textractError.message);
        extractedText = '';
      }
    }

    // Clean up uploaded file
    deleteFile(filePath);

    // Return results
    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Could not extract any text from the PDF. The PDF might be corrupted or contain only images without readable text.',
        data: {
          originalFileName: req.file.originalname,
          fileSize: req.file.size,
          extractedTextLength: 0
        }
      });
    }

    res.json({
      success: true,
      message: 'Text extracted successfully from PDF',
      data: {
        extractedText: extractedText.trim(),
        extractedTextLength: extractedText.trim().length,
        originalFileName: req.file.originalname,
        fileSize: req.file.size,
        extractionMethod: extractedText.length > 10 ? 'pdf-parse' : 'AWS Textract'
      }
    });

  } catch (error) {
    console.error('PDF text extraction error:', error);
    
    // Clean up file if it exists
    if (filePath) {
      deleteFile(filePath);
    }

    // Handle specific error types
    if (error.message === 'Only PDF files are allowed') {
      return res.status(400).json({
        success: false,
        message: 'Only PDF files are allowed'
      });
    }

    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size is 10MB'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error during PDF text extraction',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
});


// ============================================================================
// AI TEXT TO STRUCTURED JSON ENDPOINT
// ============================================================================

/**
 * @route   POST /api/ai/parse-text-to-resume
 * @desc    Convert extracted text to structured resume JSON using AI
 * @access  Public
 */
router.post('/parse-text-to-resume', async (req, res) => {
  try {
    const { text, userId, template } = req.body;

    // Validate required fields
    if (!text || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Both text and userId are required'
      });
    }

    // Validate userId format (MongoDB ObjectId)
    if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid userId format. Must be a valid MongoDB ObjectId.'
      });
    }

    // Validate text
    if (typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'text must be a non-empty string'
      });
    }

    // Parse resume with OpenAI
    console.log('Parsing resume text with AI...');
    const aiResult = await parseResumeWithAI(text);

    if (!aiResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to parse resume with AI',
        error: aiResult.error
      });
    }

    const parsedData = aiResult.data;
    console.log('AI parsing successful');

    // Validate parsed data
    if (!parsedData.name && !parsedData.email) {
      return res.status(500).json({
        success: false,
        message: 'AI could not extract name or email from resume text'
      });
    }

    // Add userId and template to the parsed data and ensure summary is not empty
    const resumeData = {
      ...parsedData,
      userId: userId,
      template: template || 'template1',
      summary: parsedData.summary || `Experienced ${parsedData.experience?.[0]?.title || 'professional'} with expertise in ${parsedData.skills?.map(s => s.name).join(', ') || 'various technologies'}.`
    };

    // Create resume record
    let responseSent = false;
    const mockReq = { body: resumeData };
    
    const mockRes = {
      status: (code) => ({
        json: (data) => {
          if (responseSent) return;
          responseSent = true;
          
          res.status(code).json({
            ...data,
            aiParsing: {
              success: true,
              textLength: text.length,
              parsingModel: OPENAI_MODEL
            }
          });
        }
      })
    };

    try {
      await createResume(mockReq, mockRes);
    } catch (createError) {
      if (!responseSent) {
        console.error('Error creating resume record:', createError);
        return res.status(500).json({
          success: false,
          message: 'Failed to create resume record in database',
          error: process.env.NODE_ENV === 'development' ? createError.message : 'Database error'
        });
      }
    }

  } catch (error) {
    console.error('AI text parsing error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during text parsing',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
});

// ============================================================================
// COMPLETE WORKFLOW ENDPOINT
// ============================================================================

/**
 * @route   POST /api/ai/process-pdf-complete
 * @desc    Complete workflow: PDF upload -> text extraction -> AI parsing -> save to DB
 * @access  Public
 */
router.post('/process-pdf-complete', upload.single('pdf'), async (req, res) => {
  let filePath = null;

  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No PDF file uploaded. Please upload a PDF file.'
      });
    }

    filePath = req.file.path;

    // Get userId and template from request body (OPTIONAL now)
    const { userId, template } = req.body;
    
    // Validate userId format ONLY if provided
    if (userId && !/^[0-9a-fA-F]{24}$/.test(userId)) {
      deleteFile(filePath);
      return res.status(400).json({
        success: false,
        message: 'Invalid userId format. Must be a valid MongoDB ObjectId.'
      });
    }

    console.log(`Processing PDF: ${req.file.originalname}${userId ? ` for user: ${userId}` : ' (no userId)'}`);

    // Step 1: Extract text from PDF and get page count
    const dataBuffer = fs.readFileSync(filePath);
    let extractedText = '';
    let pageCount = 1;

    try {
      const pdfData = await pdfParse(dataBuffer);
      extractedText = pdfData.text || '';
      pageCount = pdfData.numpages || 1;
      console.log(`PDF has ${pageCount} page(s)`);
    } catch (error) {
      console.log('PDF parsing failed:', error.message);
      extractedText = '';
      pageCount = 1;
    }

    // If no text extracted, try AWS Textract
    if (!extractedText || extractedText.trim().length < 10) {
      console.log('Trying AWS Textract extraction...');
      if (awsClient.isAvailable()) {
        try {
          const textractResult = await processDocument(filePath, false);
          extractedText = textractResult.text || '';
          // Update page count from Textract if available
          if (textractResult.pageCount && textractResult.pageCount > 0) {
            pageCount = textractResult.pageCount;
            console.log(`Textract detected ${pageCount} page(s)`);
          }
        } catch (textractError) {
          console.error('AWS Textract extraction failed:', textractError.message);
        }
      }
    }

    // Clean up uploaded file
    deleteFile(filePath);

    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Could not extract any text from the PDF. Please ensure the PDF contains readable text.',
        data: {
          originalFileName: req.file.originalname,
          fileSize: req.file.size
        }
      });
    }

    // Step 2: Parse resume with AI
    console.log('Parsing resume with AI...');
    const aiResult = await parseResumeWithAI(extractedText);

    if (!aiResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to parse resume with AI',
        error: aiResult.error
      });
    }

    const parsedData = aiResult.data;

    // Validate parsed data - at least name or email should be present
    if (!parsedData.name && !parsedData.email) {
      return res.status(500).json({
        success: false,
        message: 'AI could not extract name or email from resume text'
      });
    }

    // Ensure all required fields for createResume are present with defaults
    const resumeData = {
      name: parsedData.name || 'Unknown',
      email: parsedData.email || 'unknown@example.com',
      phone: parsedData.phone || '+1-555-000-0000',
      summary: parsedData.summary || 'Professional resume parsed from PDF document.',
      education: parsedData.education || [],
      experience: parsedData.experience || [],
      skills: parsedData.skills || [],
      projects: parsedData.projects || [],
      userId: userId || null,
      template: template || 'dynamic-multi-page',
      pageCount: pageCount
    };

    console.log('Prepared resume data:', {
      name: resumeData.name,
      email: resumeData.email,
      hasPhone: !!resumeData.phone,
      hasSummary: !!resumeData.summary,
      educationCount: resumeData.education.length,
      experienceCount: resumeData.experience.length,
      skillsCount: resumeData.skills.length,
      projectsCount: resumeData.projects.length
    });

    // Step 3: Create resume record
    console.log('Creating resume record...');
    let responseSent = false;
    const mockReq = { body: resumeData };
    
    const mockRes = {
      status: (code) => ({
        json: (data) => {
          if (responseSent) return;
          responseSent = true;
          
          res.status(code).json({
            ...data,
            aiParsing: {
              success: true,
              extractedTextLength: extractedText.length,
              parsingModel: OPENAI_MODEL,
              originalFileName: req.file.originalname,
              fileSize: req.file.size
            }
          });
        }
      })
    };

    try {
      await createResume(mockReq, mockRes);
      // If createResume succeeded but didn't send a response (shouldn't happen), handle it
      if (!responseSent) {
        console.warn('createResume completed but no response was sent');
        return res.status(500).json({
          success: false,
          message: 'Resume creation completed but no response was generated'
        });
      }
    } catch (createError) {
      if (!responseSent) {
        console.error('Error creating resume record:', createError);
        console.error('Error stack:', createError.stack);
        console.error('Resume data that failed:', JSON.stringify(resumeData, null, 2));
        return res.status(500).json({
          success: false,
          message: 'Failed to create resume record in database',
          error: process.env.NODE_ENV === 'development' ? createError.message : 'Database error',
          ...(process.env.NODE_ENV === 'development' && { 
            stack: createError.stack,
            resumeData: resumeData 
          })
        });
      }
    }

  } catch (error) {
    console.error('Complete PDF processing error:', error);
    console.error('Error stack:', error.stack);
    
    // Clean up file if it exists
    if (filePath) {
      deleteFile(filePath);
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error during PDF processing',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
});

// ============================================================================
// AWS TEXTRACT - ANALYZE FILE ENDPOINT
// ============================================================================

/**
 * @route   POST /api/ai/analyze-file
 * @desc    Analyze PDF or image file using AWS Textract
 *          Extracts text, forms (key-value pairs), and tables
 *          Supports scanned documents, multi-layout, forms, and tables
 * @access  Public
 */
router.post('/analyze-file', upload.single('file'), async (req, res) => {
  let filePath = null;

  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded. Please upload a PDF or image file.'
      });
    }

    filePath = req.file.path;
    const fileName = req.file.originalname;
    
    console.log(`📄 Analyzing file with AWS Textract: ${fileName}`);

    // Check if AWS Textract is configured
    if (!awsClient.isAvailable()) {
      deleteFile(filePath);
      return res.status(503).json({
        success: false,
        message: 'AWS Textract is not configured. Please set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_REGION environment variables.',
        awsStatus: awsClient.getStatus()
      });
    }

    // Process document with AWS Textract
    // preferAnalysis=true means it will try analyzeDocument first (for forms/tables)
    const preferAnalysis = req.query.analysis !== 'false'; // Default to true unless explicitly disabled
    const result = await processDocument(filePath, preferAnalysis);

    // Clean up uploaded file
    deleteFile(filePath);

    // Prepare response
    const response = {
      success: true,
      message: `File analyzed successfully using AWS Textract (${result.method})`,
      data: {
        fileInfo: result.fileInfo,
        text: result.text,
        keyValuePairs: result.keyValuePairs || [],
        tables: result.tables || [],
        pageCount: result.pageCount,
        method: result.method,
        summary: {
          textLength: result.text.length,
          keyValuePairsCount: result.keyValuePairs?.length || 0,
          tablesCount: result.tables?.length || 0,
          pages: result.pageCount
        }
      }
    };

    res.json(response);

  } catch (error) {
    console.error('❌ AWS Textract file analysis error:', error);
    
    // Clean up file if it exists
    if (filePath) {
      deleteFile(filePath);
    }

    // Handle specific AWS errors
    if (error.code === 'SubscriptionRequiredException') {
      return res.status(402).json({
        success: false,
        message: 'AWS Textract service subscription required. Please enable Textract in your AWS account.',
        error: error.message,
        solution: {
          step1: 'Go to AWS Console → Textract service',
          step2: 'Click "Get started" or "Enable Textract"',
          step3: 'Complete the subscription/enablement process',
          step4: 'Wait a few minutes for activation, then try again'
        },
        awsStatus: awsClient.getStatus(),
        helpUrl: 'https://console.aws.amazon.com/textract/home?region=us-east-1'
      });
    }

    if (error.code === 'InvalidParameterException') {
      return res.status(400).json({
        success: false,
        message: 'Invalid file format or parameters. AWS Textract supports PDF, PNG, JPEG, and TIFF files.',
        error: error.message
      });
    }

    if (error.code === 'InvalidS3ObjectException') {
      return res.status(400).json({
        success: false,
        message: 'Invalid file. The file may be corrupted or in an unsupported format.',
        error: error.message
      });
    }

    if (error.code === 'ProvisionedThroughputExceededException') {
      return res.status(429).json({
        success: false,
        message: 'AWS Textract rate limit exceeded. Please try again later.',
        error: error.message
      });
    }

    if (error.code === 'AccessDeniedException' || error.code === 'InvalidSignatureException') {
      return res.status(401).json({
        success: false,
        message: 'AWS credentials are invalid or access denied. Please check your AWS credentials.',
        error: error.message,
        awsStatus: awsClient.getStatus()
      });
    }

    if (error.message.includes('not configured')) {
      return res.status(503).json({
        success: false,
        message: 'AWS Textract is not configured.',
        awsStatus: awsClient.getStatus()
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error during file analysis',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
      awsStatus: awsClient.getStatus()
    });
  }
});

// ============================================================================
// TEXT TO RESUME CREATION ENDPOINT
// ============================================================================

/**
 * @route   POST /api/ai/create-from-text
 * @desc    Create a resume directly from text input using AI
 * @access  Public
 */
router.post('/create-from-text', async (req, res) => {
  try {
    const { text, userId, template } = req.body;

    // Validate required fields
    if (!text || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Both text and userId are required'
      });
    }

    // Validate userId format (MongoDB ObjectId)
    if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid userId format. Must be a valid MongoDB ObjectId.'
      });
    }

    // Validate text
    if (typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'text must be a non-empty string'
      });
    }

    // Parse resume with OpenAI
    console.log('Creating resume from text with AI...');
    const aiResult = await parseResumeWithAI(text);

    if (!aiResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to parse resume with AI',
        error: aiResult.error
      });
    }

    const parsedData = aiResult.data;
    console.log('AI parsing successful');

    // Validate parsed data
    if (!parsedData.name && !parsedData.email) {
      return res.status(500).json({
        success: false,
        message: 'AI could not extract name or email from resume text'
      });
    }

    // Add userId and template to the parsed data and ensure summary is not empty
    const resumeData = {
      ...parsedData,
      userId: userId,
      template: template || 'template1',
      summary: parsedData.summary || `Experienced ${parsedData.experience?.[0]?.title || 'professional'} with expertise in ${parsedData.skills?.map(s => s.name).join(', ') || 'various technologies'}.`
    };

    // Create resume record
    let responseSent = false;
    const mockReq = { body: resumeData };
    
    const mockRes = {
      status: (code) => ({
        json: (data) => {
          if (responseSent) return;
          responseSent = true;
          
          res.status(code).json({
            ...data,
            aiParsing: {
              success: true,
              textLength: text.length,
              parsingModel: OPENAI_MODEL
            }
          });
        }
      })
    };

    try {
      await createResume(mockReq, mockRes);
    } catch (createError) {
      if (!responseSent) {
        console.error('Error creating resume record:', createError);
        return res.status(500).json({
          success: false,
          message: 'Failed to create resume record in database',
          error: process.env.NODE_ENV === 'development' ? createError.message : 'Database error'
        });
      }
    }

  } catch (error) {
    console.error('Create from text error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during text to resume creation',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
});

// ============================================================================
// GENERATE RESUME FROM NATURAL LANGUAGE PROMPT
// ============================================================================

/**
 * @route   POST /api/ai/generate-resume
 * @desc    Generate a complete resume from natural language description or job targeting payload
 * @access  Public
 */
router.post('/generate-resume', (req, res, next) => {
  if (req.body && (req.body.jobUrl || req.body.jobDescription)) {
    return generateJobAlignedResume(req, res, next);
  }
  return generateResumeFromPrompt(req, res, next);
});

/**
 * @route   POST /api/ai/generate-job-resume
 * @desc    Explicit endpoint for generating resumes tailored to a job posting
 * @access  Public
 */
router.post('/generate-job-resume', generateJobAlignedResume);

/**
 * @route   POST /api/ai/interview-prep
 * @desc    Generate interview questions, answers, rationales from job + resume context
 * @access  Public
 */
router.post('/interview-prep', generateInterviewAssistant);

/**
 * @route   GET /api/ai/resume-options
 * @desc    Get resume dropdown options for tailoring
 * @access  Public
 */
router.get('/resume-options', getResumeOptions);

// ============================================================================
// UPDATE RESUME FROM NATURAL LANGUAGE PROMPT
// ============================================================================

/**
 * @route   PUT /api/ai/update-resume/:id
 * @desc    Update an existing resume based on natural language prompt
 * @access  Public
 */
router.put('/update-resume/:id', updateResumeFromPrompt);

// ============================================================================
// ANALYZE RESUME AND GENERATE DETAILED REPORT
// ============================================================================

/**
 * @route   GET /api/ai/analyze-resume/:id
 * @desc    Analyze a resume and generate a detailed report including:
 *          - What's in the resume
 *          - What's missing
 *          - What's needed
 *          - Skill set analysis
 *          - Overall assessment and recommendations
 * @access  Public
 */
router.get('/analyze-resume/:id', analyzeResumeReport);

// ============================================================================
// HEALTH CHECK ENDPOINT
// ============================================================================

/**
 * @route   GET /api/ai/health
 * @desc    Check AI service health
 * @access  Public
 */
router.get('/health', async (req, res) => {
  try {
    const isOpenAIConfigured = !!process.env.OPENAI_API_KEY;
    
    // Get AWS Textract status
    const awsStatus = awsClient.getStatus();
    
    res.json({
      success: true,
      message: 'AI service health check',
      data: {
        openaiConfigured: isOpenAIConfigured,
        awsTextract: awsStatus,
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString(),
        availableEndpoints: [
          'POST /api/ai/extract-pdf-text',
          'POST /api/ai/analyze-file',
          'POST /api/ai/parse-text-to-resume',
          'POST /api/ai/create-from-text',
          'POST /api/ai/process-pdf-complete',
          'POST /api/ai/generate-resume',
          'POST /api/ai/generate-job-resume',
          'POST /api/ai/interview-prep',
          'GET /api/ai/resume-options',
          'PUT /api/ai/update-resume/:id',
          'GET /api/ai/analyze-resume/:id',
          'GET /api/ai/health'
        ]
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'AI service health check failed',
      error: error.message
    });
  }
});

module.exports = router;
