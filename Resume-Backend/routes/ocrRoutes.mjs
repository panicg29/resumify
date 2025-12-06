/**
 * OCR Routes
 * Express routes for OCR functionality using OCR.Space API
 * 
 * Endpoints:
 * - POST /api/ocr/file - Extract text from uploaded file
 * - POST /api/ocr/url - Extract text from remote file URL
 */

import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { 
  extractTextFromFile, 
  extractTextFromUrl, 
  validateFileType 
} from '../utils/ocrService.mjs';

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
  try {
    validateFileType(file);
    cb(null, true);
  } catch (error) {
    cb(error, false);
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
 * @desc    Extract text from uploaded file (image or PDF)
 * @access  Public
 * @body    multipart/form-data with:
 *          - file: The file to process (required)
 *          - language: OCR language code (optional, default: 'eng')
 *          - OCREngine: OCR engine 1 or 2 (optional, default: 2)
 *          - detectOrientation: Auto-detect orientation (optional, default: false)
 *          - scale: Scale image (optional, default: false)
 *          - isCreateSearchablePdf: Create searchable PDF (optional, default: false)
 *          - isSearchablePdfHideTextLayer: Hide text layer in PDF (optional, default: false)
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

    // Cleanup uploaded file after successful processing
    cleanup(uploadedFilePath);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Text extracted successfully',
      data: {
        extractedText: result.extractedText,
        fileInfo: result.fileInfo,
        rawResponse: result.rawResponse
      }
    });

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
 * @body    JSON with:
 *          {
 *            "url": "https://example.com/document.pdf", // required
 *            "language": "eng", // optional
 *            "OCREngine": 2, // optional
 *            "detectOrientation": false, // optional
 *            "scale": false, // optional
 *            "isCreateSearchablePdf": false, // optional
 *            "isSearchablePdfHideTextLayer": false // optional
 *          }
 */
router.post('/url', async (req, res) => {
  try {
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

export default router;

