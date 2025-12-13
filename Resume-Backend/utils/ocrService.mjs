/**
 * OCR Service Utility
 * Uses OCR.Space API wrapper to extract text from images and PDFs
 * 
 * Features:
 * - File upload OCR (via multipart/form-data)
 * - URL-based OCR (via remote file URL)
 * - Language selection support
 * - Comprehensive error handling
 * - Sensitive data protection in logs
 */

import { ocrSpace } from 'ocr-space-api-wrapper';

/**
 * Get API key from environment
 * @returns {string} OCR.Space API key
 */
const getAPIKey = () => {
  const apiKey = process.env.OCR_SPACE_API_KEY;
  
  if (!apiKey) {
    throw new Error('OCR_SPACE_API_KEY is not set in environment variables');
  }
  
  return apiKey;
};

/**
 * Validate file type for OCR processing
 * @param {Object} file - Multer file object
 * @returns {boolean} True if valid, throws error if invalid
 */
export const validateFileType = (file) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/tiff',
    'image/tif',
    'application/pdf',
    'application/msword', // .doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // .docx
  ];
  
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.tif', '.pdf', '.doc', '.docx'];
  
  const fileExtension = file.originalname
    .toLowerCase()
    .substring(file.originalname.lastIndexOf('.'));
  
  const isValidMimeType = allowedMimeTypes.includes(file.mimetype);
  const isValidExtension = allowedExtensions.includes(fileExtension);
  
  if (!isValidMimeType && !isValidExtension) {
    throw new Error(
      `Invalid file type. Allowed types: ${allowedExtensions.join(', ')}`
    );
  }
  
  return true;
};

/**
 * Validate OCR options
 * @param {Object} options - OCR options object
 * @returns {Object} Validated and sanitized options
 */
export const validateOCROptions = (options = {}) => {
  const validatedOptions = {};
  
  // Language selection (default: English)
  const allowedLanguages = [
    'eng', 'ara', 'chi_sim', 'chi_tra', 'deu', 'fra', 
    'jpn', 'kor', 'por', 'rus', 'spa', 'hin', 'ben'
  ];
  
  if (options.language) {
    if (allowedLanguages.includes(options.language)) {
      validatedOptions.language = options.language;
    } else {
      console.warn(`Invalid language ${options.language}, defaulting to eng`);
      validatedOptions.language = 'eng';
    }
  } else {
    validatedOptions.language = 'eng';
  }
  
  // OCREngine (1 or 2, default: 2)
  if (options.OCREngine !== undefined) {
    validatedOptions.OCREngine = [1, 2].includes(parseInt(options.OCREngine)) 
      ? parseInt(options.OCREngine) 
      : 2;
  } else {
    validatedOptions.OCREngine = 2;
  }
  
  // DetectOrientation (boolean, default: false)
  if (options.detectOrientation !== undefined) {
    validatedOptions.detectOrientation = Boolean(options.detectOrientation);
  }
  
  // Scale (boolean, default: false)
  if (options.scale !== undefined) {
    validatedOptions.scale = Boolean(options.scale);
  }
  
  // IsCreateSearchablePdf (boolean, default: false)
  if (options.isCreateSearchablePdf !== undefined) {
    validatedOptions.isCreateSearchablePdf = Boolean(options.isCreateSearchablePdf);
  }
  
  // IsSearchablePdfHideTextLayer (boolean, default: false)
  if (options.isSearchablePdfHideTextLayer !== undefined) {
    validatedOptions.isSearchablePdfHideTextLayer = Boolean(options.isSearchablePdfHideTextLayer);
  }
  
  return validatedOptions;
};

/**
 * Sanitize response to prevent logging sensitive data
 * @param {Object} response - Raw OCR API response
 * @returns {Object} Sanitized response
 */
const sanitizeResponse = (response) => {
  if (!response) return null;
  
  const sanitized = { ...response };
  
  // Remove sensitive information if present
  if (sanitized.apikey) {
    delete sanitized.apikey;
  }
  
  return sanitized;
};

/**
 * Extract text from file upload using OCR.Space
 * @param {Object} file - Multer file object
 * @param {Object} options - OCR options (language, OCREngine, etc.)
 * @returns {Promise<Object>} OCR result with extracted text and raw response
 */
export const extractTextFromFile = async (file, options = {}) => {
  try {
    // Validate file type
    validateFileType(file);
    
    // Validate and sanitize options
    const ocrOptions = validateOCROptions(options);
    
    // Get API key
    const apiKey = getAPIKey();
    
    // Prepare file path for OCR
    const filePath = file.path;
    
    // Perform OCR using the function-based API
    const rawResponse = await ocrSpace(filePath, {
      apiKey: apiKey,
      language: ocrOptions.language,
      OCREngine: ocrOptions.OCREngine.toString(),
      detectOrientation: ocrOptions.detectOrientation,
      scale: ocrOptions.scale,
      isCreateSearchablePdf: ocrOptions.isCreateSearchablePdf,
      isSearchablePdfHideTextLayer: ocrOptions.isSearchablePdfHideTextLayer
    });
    
    // Extract text from response
    let extractedText = '';
    
    if (rawResponse && rawResponse.ParsedResults && rawResponse.ParsedResults.length > 0) {
      extractedText = rawResponse.ParsedResults
        .map(result => result.ParsedText || '')
        .join('\n\n')
        .trim();
    }
    
    // Check for errors in OCR response
    if (rawResponse && rawResponse.IsErroredOnProcessing) {
      const errorMsg = rawResponse.ErrorMessage || 'Unknown OCR error';
      const errorDetails = rawResponse.ErrorDetails || '';
      throw new Error(`OCR API Error: ${errorMsg}${errorDetails ? ' - ' + errorDetails : ''}`);
    }
    
    // Check for parse errors
    if (rawResponse && rawResponse.ParsedResults && rawResponse.ParsedResults.length > 0) {
      const parseError = rawResponse.ParsedResults[0].ErrorMessage;
      if (parseError) {
        throw new Error(`OCR Parse Error: ${parseError}`);
      }
    }
    
    // Sanitize response for logging
    const sanitizedResponse = sanitizeResponse(rawResponse);
    
    return {
      success: true,
      extractedText,
      rawResponse: sanitizedResponse,
      fileInfo: {
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size
      }
    };
    
  } catch (error) {
    // Log error without sensitive data
    console.error('OCR File Processing Error:', {
      message: error.message,
      fileName: file?.originalname,
      fileSize: file?.size,
      fileType: file?.mimetype
    });
    
    throw {
      success: false,
      error: error.message || 'Failed to extract text from file',
      fileInfo: file ? {
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size
      } : null
    };
  }
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid URL
 */
export const validateUrl = (url) => {
  if (!url || typeof url !== 'string') {
    throw new Error('URL must be a non-empty string');
  }
  
  try {
    const urlObj = new URL(url);
    const allowedProtocols = ['http:', 'https:'];
    
    if (!allowedProtocols.includes(urlObj.protocol)) {
      throw new Error('URL must use HTTP or HTTPS protocol');
    }
    
    return true;
  } catch (error) {
    if (error.message.includes('URL must use')) {
      throw error;
    }
    throw new Error('Invalid URL format');
  }
};

/**
 * Extract text from URL using OCR.Space
 * @param {string} url - Remote file URL
 * @param {Object} options - OCR options (language, OCREngine, etc.)
 * @returns {Promise<Object>} OCR result with extracted text and raw response
 */
export const extractTextFromUrl = async (url, options = {}) => {
  try {
    // Validate URL
    validateUrl(url);
    
    // Validate and sanitize options
    const ocrOptions = validateOCROptions(options);
    
    // Get API key
    const apiKey = getAPIKey();
    
    // Perform OCR from URL using the function-based API
    const rawResponse = await ocrSpace(url, {
      apiKey: apiKey,
      language: ocrOptions.language,
      OCREngine: ocrOptions.OCREngine.toString(),
      detectOrientation: ocrOptions.detectOrientation,
      scale: ocrOptions.scale,
      isCreateSearchablePdf: ocrOptions.isCreateSearchablePdf,
      isSearchablePdfHideTextLayer: ocrOptions.isSearchablePdfHideTextLayer
    });
    
    // Extract text from response
    let extractedText = '';
    
    if (rawResponse && rawResponse.ParsedResults && rawResponse.ParsedResults.length > 0) {
      extractedText = rawResponse.ParsedResults
        .map(result => result.ParsedText || '')
        .join('\n\n')
        .trim();
    }
    
    // Check for errors in OCR response
    if (rawResponse && rawResponse.IsErroredOnProcessing) {
      const errorMsg = rawResponse.ErrorMessage || 'Unknown OCR error';
      const errorDetails = rawResponse.ErrorDetails || '';
      throw new Error(`OCR API Error: ${errorMsg}${errorDetails ? ' - ' + errorDetails : ''}`);
    }
    
    // Check for parse errors
    if (rawResponse && rawResponse.ParsedResults && rawResponse.ParsedResults.length > 0) {
      const parseError = rawResponse.ParsedResults[0].ErrorMessage;
      if (parseError) {
        throw new Error(`OCR Parse Error: ${parseError}`);
      }
    }
    
    // Sanitize response for logging
    const sanitizedResponse = sanitizeResponse(rawResponse);
    
    return {
      success: true,
      extractedText,
      rawResponse: sanitizedResponse,
      url: url
    };
    
  } catch (error) {
    // Log error without sensitive data
    console.error('OCR URL Processing Error:', {
      message: error.message,
      url: url ? (url.substring(0, 50) + '...') : 'No URL provided'
    });
    
    throw {
      success: false,
      error: error.message || 'Failed to extract text from URL',
      url: url || null
    };
  }
};

