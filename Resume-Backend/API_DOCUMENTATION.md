# API Documentation - Resume Backend

Complete API reference for frontend integration.

**Base URL:** `http://localhost:5000`

---

## Table of Contents

1. [Analyze Resume](#1-analyze-resume)
2. [Update Resume with AI](#2-update-resume-with-ai)
3. [Generate Resume from Prompt](#3-generate-resume-from-prompt)
4. [Analyze File (AWS Textract)](#4-analyze-file-aws-textract)
5. [Extract PDF Text](#5-extract-pdf-text)
6. [Health Check](#6-health-check)

---

## 1. Analyze Resume

Analyze a resume and generate a detailed report with scores, strengths, weaknesses, and recommendations.

### Endpoint
```
GET /api/ai/analyze-resume/:id
```

### URL Parameters
- `id` (required) - Resume ID (MongoDB ObjectId, 24 characters)

### Request Example
```javascript
// JavaScript/Fetch
const response = await fetch('http://localhost:5000/api/ai/analyze-resume/507f1f77bcf86cd799439011', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
```

```javascript
// Axios
const response = await axios.get('http://localhost:5000/api/ai/analyze-resume/507f1f77bcf86cd799439011');
```

### Success Response (200)
```json
{
  "success": true,
  "message": "Resume analysis report generated successfully",
  "data": {
    "resumeId": "507f1f77bcf86cd799439011",
    "generatedAt": "2024-01-01T00:00:00.000Z",
    "model": "gpt-4o-mini",
    "report": {
      "overallScore": 80,
      "overallAssessment": "Strong foundation for a software developer role. Needs more quantifiable achievements and better skills detailing.",
      "keyStrengths": [
        "Strong educational background (high GPA, relevant degree)",
        "Internship experience focused on API design",
        "Solid technical stack across multiple programming languages and frameworks"
      ],
      "keyWeaknesses": [
        "Only one internship (limited experience)",
        "Few measurable achievements in experience section",
        "Missing soft skills and certifications"
      ],
      "highlights": [
        "Improved API response time by 20%",
        "Built a full-stack application as a personal project"
      ],
      "coreSectionScores": {
        "experience": {
          "score": 75,
          "keyInsight": "Relevant but minimal; needs metrics"
        },
        "education": {
          "score": 85,
          "keyInsight": "Excellent academic background"
        },
        "skills": {
          "score": 75,
          "keyInsight": "Broad but missing cloud & soft skills"
        },
        "projects": {
          "score": 70,
          "keyInsight": "Practical, but lacks detail on tech stack"
        },
        "atsOptimization": {
          "score": 70,
          "keyInsight": "Needs more keywords and standard headings"
        }
      },
      "criticalImprovements": [
        "Add quantifiable results (e.g., performance metrics, user impact)",
        "Include cloud technologies (AWS/Azure) and DevOps tools",
        "Add a certifications section for credibility",
        "Explicitly mention soft skills (communication, teamwork, problem-solving)",
        "Reorganize skills by category (Frontend / Backend / Tools)"
      ],
      "missingOrWeakAreas": [
        {
          "area": "Certifications",
          "importance": "high",
          "note": "No professional certifications mentioned"
        },
        {
          "area": "Cloud computing (AWS/Azure)",
          "importance": "high",
          "note": "Important for modern software development roles"
        },
        {
          "area": "Soft skills section",
          "importance": "medium",
          "note": "Missing explicit mention of communication, teamwork, etc."
        },
        {
          "area": "Additional achievements/metrics",
          "importance": "high",
          "note": "Limited use of quantifiable metrics in projects and experience"
        },
        {
          "area": "ATS keyword alignment",
          "importance": "medium",
          "note": "Could benefit from more industry-specific keywords"
        }
      ],
      "finalInsight": "A well-rounded and technically strong resume with good potential for junior or mid-level roles. To reach a professional, recruiter-ready level: add measurable impact, modern cloud skills, and clearer structure."
    }
  }
}
```

### Error Responses

**400 - Invalid Resume ID**
```json
{
  "success": false,
  "message": "Invalid resume ID format. Must be a valid MongoDB ObjectId."
}
```

**404 - Resume Not Found**
```json
{
  "success": false,
  "message": "Resume not found"
}
```

**500 - AI Processing Failed**
```json
{
  "success": false,
  "message": "Failed to analyze resume with AI",
  "error": "Error details..."
}
```

---

## 2. Update Resume with AI

Update an existing resume based on a natural language prompt.

### Endpoint
```
PUT /api/ai/update-resume/:id
```

### URL Parameters
- `id` (required) - Resume ID (MongoDB ObjectId)

### Request Body
```json
{
  "prompt": "Add React to skills list and update summary to highlight frontend expertise"
}
```

### Request Example
```javascript
// JavaScript/Fetch
const response = await fetch('http://localhost:5000/api/ai/update-resume/507f1f77bcf86cd799439011', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: "Add React to skills list and update summary to highlight frontend expertise"
  })
});

const data = await response.json();
```

```javascript
// Axios
const response = await axios.put(
  'http://localhost:5000/api/ai/update-resume/507f1f77bcf86cd799439011',
  {
    prompt: "Add React to skills list and update summary to highlight frontend expertise"
  }
);
```

### Success Response (200)
```json
{
  "success": true,
  "message": "Resume updated successfully from prompt",
  "data": {
    "resume": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1-555-0123",
      "summary": "Updated summary with frontend expertise...",
      "education": [...],
      "experience": [...],
      "skills": [
        {
          "name": "React",
          "level": "Advanced"
        },
        ...
      ],
      "projects": [...],
      "userId": "...",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "aiUpdate": {
      "success": true,
      "promptLength": 85,
      "model": "gpt-4o-mini",
      "fieldsUpdated": ["summary", "skills"]
    }
  }
}
```

### Error Responses

**400 - Invalid Resume ID**
```json
{
  "success": false,
  "message": "Invalid resume ID format. Must be a valid MongoDB ObjectId."
}
```

**400 - Missing Prompt**
```json
{
  "success": false,
  "message": "Prompt is required and must be a non-empty string"
}
```

**404 - Resume Not Found**
```json
{
  "success": false,
  "message": "Resume not found"
}
```

**500 - AI Processing Failed**
```json
{
  "success": false,
  "message": "Failed to process update with AI",
  "error": "Error details..."
}
```

---

## 3. Generate Resume from Prompt

Generate a complete resume from a natural language description.

### Endpoint
```
POST /api/ai/generate-resume
```

### Request Body
```json
{
  "prompt": "I'm a software developer with 5 years of experience in React and Node.js. I worked at Google for 3 years and Microsoft for 2 years. I have a Computer Science degree from MIT.",
  "userId": "507f1f77bcf86cd799439011"
}
```

### Request Example
```javascript
// JavaScript/Fetch
const response = await fetch('http://localhost:5000/api/ai/generate-resume', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: "I'm a software developer with 5 years of experience...",
    userId: "507f1f77bcf86cd799439011"
  })
});

const data = await response.json();
```

```javascript
// Axios
const response = await axios.post('http://localhost:5000/api/ai/generate-resume', {
  prompt: "I'm a software developer with 5 years of experience...",
  userId: "507f1f77bcf86cd799439011"
});
```

### Success Response (200)
```json
{
  "success": true,
  "message": "Resume generated successfully",
  "data": {
    "resume": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1-555-000-0000",
      "summary": "Experienced software developer...",
      "education": [...],
      "experience": [...],
      "skills": [...],
      "projects": [...],
      "userId": "..."
    },
    "aiGeneration": {
      "success": true,
      "promptLength": 150,
      "model": "gpt-4o-mini"
    }
  }
}
```

### Error Responses

**400 - Missing Prompt**
```json
{
  "success": false,
  "message": "Prompt is required and must be a non-empty string"
}
```

**500 - AI Processing Failed**
```json
{
  "success": false,
  "message": "Failed to generate resume with AI",
  "error": "Error details..."
}
```

---

## 4. Analyze File (AWS Textract)

Analyze PDF or image files using AWS Textract to extract text, forms, and tables.

### Endpoint
```
POST /api/ai/analyze-file
```

### Request Body
- **Content-Type:** `multipart/form-data`
- **Field:** `file` (File type: PDF, PNG, JPEG, TIFF)

### Query Parameters (Optional)
- `analysis` - Set to `false` for simple text extraction only (default: `true` for forms/tables)

### Request Example
```javascript
// JavaScript/Fetch with FormData
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('http://localhost:5000/api/ai/analyze-file', {
  method: 'POST',
  body: formData
});

const data = await response.json();
```

```javascript
// Axios
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await axios.post('http://localhost:5000/api/ai/analyze-file', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
```

### Success Response (200)
```json
{
  "success": true,
  "message": "File analyzed successfully using AWS Textract (analyzeDocument)",
  "data": {
    "fileInfo": {
      "fileName": "resume.pdf",
      "fileSize": 123456,
      "fileType": "pdf",
      "mimeType": "application/pdf"
    },
    "text": "Extracted text content from the document...",
    "keyValuePairs": [
      {
        "key": "Name",
        "value": "John Doe"
      },
      {
        "key": "Email",
        "value": "john@example.com"
      }
    ],
    "tables": [
      {
        "id": "table-id",
        "page": 1,
        "rows": [
          {
            "rowIndex": 1,
            "cells": ["Header1", "Header2", "Header3"]
          },
          {
            "rowIndex": 2,
            "cells": ["Data1", "Data2", "Data3"]
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

### Error Responses

**400 - No File Uploaded**
```json
{
  "success": false,
  "message": "No file uploaded. Please upload a PDF or image file."
}
```

**400 - Invalid File Format**
```json
{
  "success": false,
  "message": "Invalid file format or parameters. AWS Textract supports PDF, PNG, JPEG, and TIFF files."
}
```

**401 - Invalid AWS Credentials**
```json
{
  "success": false,
  "message": "AWS credentials are invalid or access denied. Please check your AWS credentials."
}
```

**402 - Subscription Required**
```json
{
  "success": false,
  "message": "AWS Textract service subscription required. Please enable Textract in your AWS account.",
  "solution": {
    "step1": "Go to AWS Console → Textract service",
    "step2": "Click \"Get started\" or \"Enable Textract\"",
    "step3": "Complete the subscription/enablement process",
    "step4": "Wait a few minutes for activation, then try again"
  },
  "helpUrl": "https://console.aws.amazon.com/textract/home?region=us-east-1"
}
```

**503 - AWS Not Configured**
```json
{
  "success": false,
  "message": "AWS Textract is not configured. Please set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_REGION environment variables."
}
```

---

## 5. Extract PDF Text

Extract text from PDF files (simple text extraction).

### Endpoint
```
POST /api/ai/extract-pdf-text
```

### Request Body
- **Content-Type:** `multipart/form-data`
- **Field:** `file` (File type: PDF)

### Request Example
```javascript
// JavaScript/Fetch
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('http://localhost:5000/api/ai/extract-pdf-text', {
  method: 'POST',
  body: formData
});

const data = await response.json();
```

### Success Response (200)
```json
{
  "success": true,
  "message": "Text extracted successfully from PDF",
  "data": {
    "extractedText": "Full text content from PDF...",
    "extractedTextLength": 1234,
    "originalFileName": "resume.pdf",
    "fileSize": 123456,
    "extractionMethod": "pdf-parse"
  }
}
```

### Error Responses

**400 - No File Uploaded**
```json
{
  "success": false,
  "message": "No PDF file uploaded. Please upload a PDF file."
}
```

**400 - No Text Extracted**
```json
{
  "success": false,
  "message": "Could not extract any text from the PDF. The PDF might be corrupted or contain only images without readable text."
}
```

---

## 6. Health Check

Check AI service health and configuration status.

### Endpoint
```
GET /api/ai/health
```

### Request Example
```javascript
// JavaScript/Fetch
const response = await fetch('http://localhost:5000/api/ai/health', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
```

### Success Response (200)
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
      "region": "us-east-1",
      "regionSet": false,
      "note": "Using default region (us-east-1). Set AWS_REGION to use a different region."
    },
    "environment": "development",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "availableEndpoints": [
      "POST /api/ai/extract-pdf-text",
      "POST /api/ai/analyze-file",
      "POST /api/ai/parse-text-to-resume",
      "POST /api/ai/create-from-text",
      "POST /api/ai/process-pdf-complete",
      "POST /api/ai/generate-resume",
      "PUT /api/ai/update-resume/:id",
      "GET /api/ai/analyze-resume/:id",
      "GET /api/ai/health"
    ]
  }
}
```

---

## Error Handling Best Practices

### Common HTTP Status Codes

- **200** - Success
- **400** - Bad Request (invalid parameters, missing data)
- **401** - Unauthorized (invalid credentials)
- **402** - Payment Required (AWS subscription needed)
- **404** - Not Found (resource doesn't exist)
- **429** - Too Many Requests (rate limit exceeded)
- **500** - Internal Server Error
- **503** - Service Unavailable (service not configured)

### Error Response Format
```json
{
  "success": false,
  "message": "Human-readable error message",
  "error": "Technical error details (only in development mode)"
}
```

### Example Error Handling
```javascript
try {
  const response = await fetch('http://localhost:5000/api/ai/analyze-resume/123', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  if (!response.ok) {
    // Handle error based on status code
    switch (response.status) {
      case 400:
        console.error('Bad Request:', data.message);
        break;
      case 404:
        console.error('Not Found:', data.message);
        break;
      case 500:
        console.error('Server Error:', data.message);
        break;
      default:
        console.error('Error:', data.message);
    }
    return;
  }

  // Handle success
  console.log('Success:', data.data);
} catch (error) {
  console.error('Network Error:', error);
}
```

---

## Quick Reference

### Base URL
```
http://localhost:5000
```

### Common Headers
```javascript
{
  'Content-Type': 'application/json'  // For JSON requests
  // No headers needed for multipart/form-data (browser sets automatically)
}
```

### Resume ID Format
- MongoDB ObjectId
- 24 hexadecimal characters
- Example: `507f1f77bcf86cd799439011`

### File Upload Limits
- Maximum file size: 10MB (default)
- Supported formats:
  - PDF: `.pdf`
  - Images: `.png`, `.jpg`, `.jpeg`, `.tiff`

### Response Time
- **Analyze Resume:** 3-5 seconds
- **Update Resume:** 3-5 seconds
- **Generate Resume:** 3-5 seconds
- **Analyze File:** 5-10 seconds (depends on file size)
- **Extract PDF Text:** 1-3 seconds

---

## React Hook Examples

### useAnalyzeResume Hook
```javascript
import { useState } from 'react';

const useAnalyzeResume = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [report, setReport] = useState(null);

  const analyzeResume = async (resumeId) => {
    setLoading(true);
    setError(null);
    setReport(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/ai/analyze-resume/${resumeId}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setReport(data.data.report);
      return data.data.report;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { analyzeResume, loading, error, report };
};
```

### useUpdateResume Hook
```javascript
import { useState } from 'react';

const useUpdateResume = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateResume = async (resumeId, prompt) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/ai/update-resume/${resumeId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt })
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      return data.data.resume;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateResume, loading, error };
};
```

---

## Environment Configuration

For production, use environment variables:

```javascript
// config.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// In your API calls
const response = await fetch(`${API_BASE_URL}/api/ai/analyze-resume/${id}`);
```

---

**Last Updated:** 2024-01-01  
**API Version:** 1.0.0

