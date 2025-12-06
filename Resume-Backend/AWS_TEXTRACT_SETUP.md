# AWS Textract Integration Guide

Complete guide for setting up and using AWS Textract in your Node.js/Express.js backend.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [AWS Setup](#aws-setup)
4. [Local Project Setup](#local-project-setup)
5. [Environment Variables](#environment-variables)
6. [API Endpoints](#api-endpoints)
7. [Usage Examples](#usage-examples)
8. [Error Handling](#error-handling)
9. [Pricing](#pricing)
10. [Troubleshooting](#troubleshooting)

## Overview

AWS Textract is a machine learning service that automatically extracts text, forms (key-value pairs), and tables from scanned documents, PDFs, and images. This integration provides:

- **Text Extraction**: Extract text from any document type
- **Form Data Extraction**: Extract key-value pairs from forms
- **Table Extraction**: Extract structured table data
- **Multi-page Support**: Automatically handles multi-page PDFs
- **Multiple Formats**: Supports PDF, PNG, JPEG, TIFF

## Prerequisites

- Node.js v14+ (v18+ recommended)
- AWS Account (Free tier available)
- AWS IAM user with Textract permissions
- Express.js backend project

## AWS Setup

### Step 1: Create AWS Account

1. Go to [AWS Console](https://console.aws.amazon.com/)
2. Sign up or sign in to your account
3. Complete account verification if required

### Step 2: Create IAM User

1. Navigate to **IAM** → **Users** → **Create User**
2. Enter a username (e.g., `textract-user`)
3. Select **"Provide user access to the AWS Management Console"** (optional) or **"Access key - Programmatic access"**
4. Click **Next**

### Step 3: Attach Textract Policy

1. In **Set permissions**, select **"Attach policies directly"**
2. Search for and select **"AmazonTextractFullAccess"** (or create a custom policy with minimal permissions)
3. Click **Next** → **Create User**

### Step 4: Get Access Keys

1. Click on the created user
2. Go to **Security credentials** tab
3. Click **"Create access key"**
4. Select **"Application running outside AWS"**
5. Click **Next** → **Create access key**
6. **IMPORTANT**: Copy and save:
   - **Access Key ID**
   - **Secret Access Key** (only shown once!)

### Step 5: Choose AWS Region

AWS Textract is available in multiple regions. Choose one:
- `us-east-1` (N. Virginia) - Recommended
- `us-west-2` (Oregon)
- `eu-west-1` (Ireland)
- `ap-southeast-1` (Singapore)
- See [AWS Regions](https://docs.aws.amazon.com/general/latest/gr/textract.html) for full list

## Local Project Setup

### Step 1: Install Dependencies

Dependencies are already installed:
- `aws-sdk` - AWS SDK for JavaScript
- `express` - Web framework
- `multer` - File upload handling
- `dotenv` - Environment variable management
- `axios` - HTTP client (for testing)

### Step 2: Project Structure

```
Resume-Backend/
├── controllers/
│   └── textractController.js    # Textract processing logic
├── utils/
│   └── awsClient.js              # AWS SDK initialization
├── routes/
│   └── aiRoutes.js               # Express routes
├── test-textract.js              # Test script
├── .env                          # Environment variables
└── package.json
```

## Environment Variables

Create or update your `.env` file in the project root:

```env
# AWS Textract Configuration (Required)
AWS_ACCESS_KEY_ID=your_access_key_id_here
AWS_SECRET_ACCESS_KEY=your_secret_access_key_here

# AWS Region (Optional - defaults to us-east-1 if not set)
AWS_REGION=us-east-1

# Other environment variables
PORT=5000
NODE_ENV=development
```

**Important Notes:**
- `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` are **REQUIRED**
- `AWS_REGION` is **OPTIONAL** - defaults to `us-east-1` if not set
- AWS Textract is a regional service (not global), but the code handles the default region automatically
- You can set `AWS_REGION` to any region where Textract is available (e.g., `us-west-2`, `eu-west-1`, `ap-southeast-1`)

**Security Note**: Never commit `.env` file to version control. Add it to `.gitignore`.

## API Endpoints

### POST `/api/ai/analyze-file`

Analyzes a PDF or image file using AWS Textract.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: Form data with `file` field containing PDF or image

**Query Parameters:**
- `analysis` (optional): Set to `false` to use simple text extraction only (default: `true` for forms/tables)

**Response:**
```json
{
  "success": true,
  "message": "File analyzed successfully using AWS Textract (analyzeDocument)",
  "data": {
    "fileInfo": {
      "fileName": "document.pdf",
      "fileSize": 123456,
      "fileType": "pdf",
      "mimeType": "application/pdf"
    },
    "text": "Extracted text content...",
    "keyValuePairs": [
      {
        "key": "Name",
        "value": "John Doe"
      }
    ],
    "tables": [
      {
        "id": "table-id",
        "page": 1,
        "rows": [
          {
            "rowIndex": 1,
            "cells": ["Header1", "Header2"]
          }
        ]
      }
    ],
    "pageCount": 1,
    "method": "analyzeDocument",
    "summary": {
      "textLength": 1234,
      "keyValuePairsCount": 5,
      "tablesCount": 2,
      "pages": 1
    }
  }
}
```

**Error Responses:**
- `400`: Invalid file format or parameters
- `401`: Invalid AWS credentials
- `429`: Rate limit exceeded
- `500`: Internal server error
- `503`: AWS Textract not configured

### GET `/api/ai/health`

Check AWS Textract configuration status.

**Response:**
```json
{
  "success": true,
  "message": "AI service health check",
  "data": {
    "openaiConfigured": true,
    "awsTextract": {
      "isConfigured": true,
      "isAvailable": true,
      "hasAccessKey": true,
      "hasSecretKey": true,
      "region": "us-east-1"
    },
    "environment": "development",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

## Usage Examples

### Example 1: Using cURL

```bash
curl -X POST http://localhost:5000/api/ai/analyze-file \
  -F "file=@/path/to/document.pdf"
```

### Example 2: Using Postman

1. Method: `POST`
2. URL: `http://localhost:5000/api/ai/analyze-file`
3. Body → form-data:
   - Key: `file` (type: File)
   - Value: Select your PDF or image file

### Example 3: Using Node.js Test Script

```bash
# Update TEST_FILE_PATH in test-textract.js
node test-textract.js
```

### Example 4: Using JavaScript/TypeScript

```javascript
const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');

const form = new FormData();
form.append('file', fs.createReadStream('document.pdf'));

const response = await axios.post('http://localhost:5000/api/ai/analyze-file', form, {
  headers: form.getHeaders()
});

console.log(response.data);
```

## Error Handling

The integration includes comprehensive error handling for common AWS Textract errors:

| Error Code | Description | HTTP Status |
|------------|-------------|-------------|
| `InvalidParameterException` | Invalid file format | 400 |
| `InvalidS3ObjectException` | Corrupted or unsupported file | 400 |
| `ProvisionedThroughputExceededException` | Rate limit exceeded | 429 |
| `AccessDeniedException` | Invalid credentials | 401 |
| `InvalidSignatureException` | Invalid credentials | 401 |

## Pricing

AWS Textract pricing (as of 2024):

### Free Tier
- **1,000 pages/month** free for first 3 months
- After free tier: **$1.50 per 1,000 pages**

### Pricing Details
- **Text Detection**: $1.50 per 1,000 pages
- **Form/Table Analysis**: $15.00 per 1,000 pages
- Each page counts as one unit

**Note**: The integration automatically uses `analyzeDocument` (forms/tables) when possible, which costs more but provides richer data. Use `?analysis=false` query parameter to force simple text extraction.

## Troubleshooting

### Issue: "AWS Textract is not configured"

**Solution:**
1. Check that `.env` file exists and contains:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION`
2. Restart your server after updating `.env`
3. Verify credentials are correct

### Issue: "AccessDeniedException"

**Solution:**
1. Verify IAM user has `AmazonTextractFullAccess` policy
2. Check that access keys are correct
3. Ensure keys haven't been rotated/deleted

### Issue: "InvalidParameterException"

**Solution:**
1. Ensure file is PDF, PNG, JPEG, or TIFF
2. Check file is not corrupted
3. Verify file size is within limits (max 500MB for synchronous API)

### Issue: "ProvisionedThroughputExceededException"

**Solution:**
1. You've exceeded rate limits
2. Wait a few minutes and retry
3. Consider implementing retry logic with exponential backoff

### Issue: Slow Processing

**Solution:**
1. Large files take longer to process
2. Multi-page PDFs are processed page by page
3. Consider using async Textract API for very large documents

## Code Structure

### `utils/awsClient.js`
- Initializes AWS SDK
- Configures Textract client
- Provides status checking

### `controllers/textractController.js`
- `processDocument()`: Main processing function
- `detectDocumentText()`: Simple text extraction
- `analyzeDocument()`: Forms and tables extraction
- `extractKeyValuePairs()`: Parse form data
- `extractTables()`: Parse table data

### `routes/aiRoutes.js`
- `POST /api/ai/analyze-file`: Main endpoint
- `GET /api/ai/health`: Health check

## Best Practices

1. **Error Handling**: Always handle AWS errors gracefully
2. **File Cleanup**: Uploaded files are automatically cleaned up
3. **Rate Limiting**: Implement rate limiting for production
4. **File Size**: Monitor file sizes (max 500MB for sync API)
5. **Cost Optimization**: Use `?analysis=false` for simple text extraction when forms/tables aren't needed
6. **Security**: Never expose AWS credentials in client-side code
7. **Logging**: Monitor Textract usage for cost tracking

## Support

- [AWS Textract Documentation](https://docs.aws.amazon.com/textract/)
- [AWS Textract Pricing](https://aws.amazon.com/textract/pricing/)
- [AWS SDK for JavaScript Documentation](https://docs.aws.amazon.com/sdk-for-javascript/)

## Summary

1. ✅ Create AWS account and IAM user
2. ✅ Get access keys
3. ✅ Set environment variables
4. ✅ Start server: `npm start`
5. ✅ Test endpoint: `POST /api/ai/analyze-file`
6. ✅ Check health: `GET /api/ai/health`

Your AWS Textract integration is ready to use! 🚀

