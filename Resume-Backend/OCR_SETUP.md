# OCR API Setup Guide

Complete setup guide for OCR functionality using OCR.Space API.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [API Endpoints](#api-endpoints)
6. [Usage Examples](#usage-examples)
7. [Error Handling](#error-handling)
8. [Testing](#testing)

## Overview

This OCR implementation provides two endpoints for text extraction:
- **File Upload**: Extract text from uploaded images or PDFs
- **URL Processing**: Extract text from remote files via URL

Both endpoints use the OCR.Space API and support:
- Multiple image formats (JPEG, PNG, GIF, BMP, TIFF)
- PDF documents
- Language selection
- OCR engine selection
- Advanced options (orientation detection, scaling, searchable PDF creation)

## Prerequisites

- Node.js v14+ (v18+ recommended)
- OCR.Space API key (free tier available at https://ocr.space/ocrapi/freekey)
- Express.js backend (already configured)

## Installation

The required package is already installed. If you need to reinstall:

```bash
npm install ocr-space-api-wrapper
```

## Configuration

### Step 1: Get OCR.Space API Key

1. Visit [OCR.Space API](https://ocr.space/ocrapi/freekey)
2. Register for a free account
3. Get your API key from the dashboard
4. Free tier includes 25,000 requests per day

### Step 2: Configure Environment Variables

Create or update your `.env` file in the project root:

```env
# OCR.Space API Configuration (Required)
OCR_SPACE_API_KEY=your_ocr_space_api_key_here

# Other existing environment variables
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
NODE_ENV=development
```

**Important**: Never commit your `.env` file to version control. It's already in `.gitignore`.

### Step 3: Create Upload Directory

The upload directory is created automatically, but you can manually create it:

```bash
mkdir -p uploads/ocr
```

## API Endpoints

### 1. POST /api/ocr/file

Extract text from an uploaded file (image or PDF).

**Request Format**: `multipart/form-data`

**Required Fields**:
- `file`: The file to process (image or PDF)

**Optional Fields**:
- `language`: Language code (default: `eng`)
  - Available: `eng`, `ara`, `chi_sim`, `chi_tra`, `deu`, `fra`, `jpn`, `kor`, `por`, `rus`, `spa`, `hin`, `ben`
- `OCREngine`: OCR engine (default: `2`)
  - Options: `1` or `2`
- `detectOrientation`: Auto-detect orientation (default: `false`)
- `scale`: Scale image for better recognition (default: `false`)
- `isCreateSearchablePdf`: Create searchable PDF (default: `false`)
- `isSearchablePdfHideTextLayer`: Hide text layer in PDF (default: `false`)

**File Size Limit**: 10MB

**Supported File Types**:
- Images: JPEG, JPG, PNG, GIF, BMP, TIFF
- Documents: PDF

**Response Format**:
```json
{
  "success": true,
  "message": "Text extracted successfully",
  "data": {
    "extractedText": "The extracted text content...",
    "fileInfo": {
      "originalName": "document.pdf",
      "mimetype": "application/pdf",
      "size": 123456
    },
    "rawResponse": {
      "ParsedResults": [...]
    }
  }
}
```

### 2. POST /api/ocr/url

Extract text from a remote file URL.

**Request Format**: `application/json`

**Required Fields**:
```json
{
  "url": "https://example.com/document.pdf"
}
```

**Optional Fields**:
- `language`: Language code (same as file endpoint)
- `OCREngine`: OCR engine (same as file endpoint)
- `detectOrientation`: Auto-detect orientation
- `scale`: Scale image
- `isCreateSearchablePdf`: Create searchable PDF
- `isSearchablePdfHideTextLayer`: Hide text layer

**Response Format**:
```json
{
  "success": true,
  "message": "Text extracted successfully from URL",
  "data": {
    "extractedText": "The extracted text content...",
    "url": "https://example.com/document.pdf",
    "rawResponse": {
      "ParsedResults": [...]
    }
  }
}
```

### 3. GET /api/ocr/health

Health check endpoint to verify OCR service configuration.

**Response Format**:
```json
{
  "success": true,
  "message": "OCR service health check",
  "data": {
    "status": "configured",
    "apiKeySet": true,
    "timestamp": "2024-01-01T12:00:00.000Z"
  }
}
```

## Usage Examples

### cURL Examples

#### Upload File with Default Settings

```bash
curl -X POST http://localhost:5000/api/ocr/file \
  -F "file=@/path/to/your/document.pdf"
```

#### Upload File with Language Selection

```bash
curl -X POST http://localhost:5000/api/ocr/file \
  -F "file=@/path/to/your/image.jpg" \
  -F "language=fra"
```

#### Upload File with All Options

```bash
curl -X POST http://localhost:5000/api/ocr/file \
  -F "file=@/path/to/your/document.pdf" \
  -F "language=eng" \
  -F "OCREngine=2" \
  -F "detectOrientation=true" \
  -F "scale=true"
```

#### Process URL

```bash
curl -X POST http://localhost:5000/api/ocr/url \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/document.pdf",
    "language": "eng"
  }'
```

#### Process URL with All Options

```bash
curl -X POST http://localhost:5000/api/ocr/url \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/document.pdf",
    "language": "eng",
    "OCREngine": 2,
    "detectOrientation": true,
    "scale": true,
    "isCreateSearchablePdf": false
  }'
```

#### Health Check

```bash
curl http://localhost:5000/api/ocr/health
```

### JavaScript/Node.js Examples

#### Upload File

```javascript
const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');

const form = new FormData();
form.append('file', fs.createReadStream('/path/to/document.pdf'));
form.append('language', 'eng');

axios.post('http://localhost:5000/api/ocr/file', form, {
  headers: form.getHeaders()
})
.then(response => {
  console.log('Extracted Text:', response.data.data.extractedText);
})
.catch(error => {
  console.error('Error:', error.response.data);
});
```

#### Process URL

```javascript
const axios = require('axios');

axios.post('http://localhost:5000/api/ocr/url', {
  url: 'https://example.com/document.pdf',
  language: 'eng',
  OCREngine: 2
})
.then(response => {
  console.log('Extracted Text:', response.data.data.extractedText);
})
.catch(error => {
  console.error('Error:', error.response.data);
});
```

### Python Examples

#### Upload File

```python
import requests

url = 'http://localhost:5000/api/ocr/file'
files = {'file': open('/path/to/document.pdf', 'rb')}
data = {'language': 'eng'}

response = requests.post(url, files=files, data=data)
result = response.json()

if result['success']:
    print('Extracted Text:', result['data']['extractedText'])
else:
    print('Error:', result['error'])
```

#### Process URL

```python
import requests

url = 'http://localhost:5000/api/ocr/url'
data = {
    'url': 'https://example.com/document.pdf',
    'language': 'eng',
    'OCREngine': 2
}

response = requests.post(url, json=data)
result = response.json()

if result['success']:
    print('Extracted Text:', result['data']['extractedText'])
else:
    print('Error:', result['error'])
```

## Error Handling

### Common Error Responses

#### Missing File

```json
{
  "success": false,
  "message": "No file uploaded",
  "error": "Please provide a file in the request. Use multipart/form-data with key \"file\"."
}
```

#### Invalid File Type

```json
{
  "success": false,
  "message": "Invalid file type",
  "error": "Invalid file type. Allowed types: .jpg, .jpeg, .png, .gif, .bmp, .tiff, .tif, .pdf"
}
```

#### File Too Large

```json
{
  "success": false,
  "message": "File too large",
  "error": "File size exceeds the 10MB limit"
}
```

#### Missing URL

```json
{
  "success": false,
  "message": "URL is required",
  "error": "Please provide a \"url\" field in the request body"
}
```

#### Invalid URL

```json
{
  "success": false,
  "message": "Invalid URL",
  "error": "Invalid URL format"
}
```

#### OCR Processing Failed

```json
{
  "success": false,
  "message": "OCR processing failed",
  "error": "OCR API Error: [specific error message]",
  "fileInfo": {
    "originalName": "document.pdf",
    "mimetype": "application/pdf",
    "size": 123456
  }
}
```

#### API Key Not Configured

If the API key is not set, the service will return an error when processing:

```json
{
  "success": false,
  "message": "OCR processing failed",
  "error": "OCR_SPACE_API_KEY is not set in environment variables"
}
```

## Testing

### Manual Testing

1. Start the server:
   ```bash
   npm start
   ```

2. Test health check:
   ```bash
   curl http://localhost:5000/api/ocr/health
   ```

3. Test file upload:
   ```bash
   curl -X POST http://localhost:5000/api/ocr/file \
     -F "file=@test-document.pdf"
   ```

4. Test URL processing:
   ```bash
   curl -X POST http://localhost:5000/api/ocr/url \
     -H "Content-Type: application/json" \
     -d '{"url": "https://example.com/test.pdf"}'
   ```

### Using Postman

See `OCR_POSTMAN_COLLECTION.json` for a complete Postman collection with all test cases.

## Troubleshooting

### Issue: "OCR_SPACE_API_KEY is not set"

**Solution**: Add your API key to the `.env` file:
```env
OCR_SPACE_API_KEY=your_api_key_here
```

### Issue: "File too large"

**Solution**: Reduce file size or increase the limit in `routes/ocrRoutes.js`:
```javascript
limits: {
  fileSize: 20 * 1024 * 1024 // Increase to 20MB
}
```

### Issue: "Invalid file type"

**Solution**: Ensure your file is one of the supported formats:
- Images: JPEG, PNG, GIF, BMP, TIFF
- Documents: PDF

### Issue: "OCR API Error"

**Solution**: Check your API key is valid and you haven't exceeded rate limits. Visit [OCR.Space Dashboard](https://ocr.space/ocrapi) to check your usage.

### Issue: Empty extracted text

**Solution**: 
- Try different OCR engine (1 or 2)
- Enable orientation detection: `detectOrientation=true`
- Enable scaling: `scale=true`
- Try different language settings

## Rate Limits

OCR.Space free tier includes:
- **25,000 requests per day**
- **Up to 10MB file size**
- **1 request per second**

For higher limits, consider upgrading to a paid plan at [OCR.Space](https://ocr.space/ocrapi).

## Security Notes

- API keys are never logged or exposed in responses
- Uploaded files are automatically cleaned up after processing
- File paths are sanitized to prevent directory traversal
- URL validation ensures only HTTP/HTTPS protocols are allowed

## File Cleanup

Uploaded files are automatically deleted after processing (success or error). Files are stored temporarily in `uploads/ocr/` during processing.

## Support

For issues with:
- **This implementation**: Check the error messages and troubleshooting section
- **OCR.Space API**: Visit [OCR.Space Documentation](https://ocr.space/ocrapi)
- **API Key issues**: Check [OCR.Space Dashboard](https://ocr.space/ocrapi)

