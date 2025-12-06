# API Documentation: Analyze Resume with AI

Complete API reference for the Resume Analysis endpoint.

**Base URL:** `http://localhost:5000`

---

## Endpoint

### Analyze Resume
```
GET /api/ai/analyze-resume/:id
```

Analyzes a resume and generates a detailed report with scores, strengths, weaknesses, and actionable recommendations.

---

## URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Resume ID (MongoDB ObjectId, 24 characters) |

**Example:** `507f1f77bcf86cd799439011`

---

## Request

### Method
`GET`

### Headers
```javascript
{
  "Content-Type": "application/json"
}
```

### Request Body
None (GET request)

### Request Example

#### JavaScript/Fetch
```javascript
const response = await fetch('http://localhost:5000/api/ai/analyze-resume/507f1f77bcf86cd799439011', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
```

#### Axios
```javascript
const response = await axios.get('http://localhost:5000/api/ai/analyze-resume/507f1f77bcf86cd799439011');
const data = response.data;
```

#### cURL
```bash
curl http://localhost:5000/api/ai/analyze-resume/507f1f77bcf86cd799439011
```

---

## Success Response (200)

### Response Structure
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
      "overallAssessment": "Brief assessment...",
      "keyStrengths": [...],
      "keyWeaknesses": [...],
      "highlights": [...],
      "coreSectionScores": {...},
      "criticalImprovements": [...],
      "missingOrWeakAreas": [...],
      "finalInsight": "..."
    }
  }
}
```

### Complete Response Example
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

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Request success status |
| `message` | string | Success message |
| `data.resumeId` | string | The analyzed resume ID |
| `data.generatedAt` | string | ISO timestamp of report generation |
| `data.model` | string | AI model used (gpt-4o-mini) |
| `data.report.overallScore` | number | Overall resume score (0-100) |
| `data.report.overallAssessment` | string | Brief 2-3 sentence assessment |
| `data.report.keyStrengths` | array | List of key strengths (3-5 items) |
| `data.report.keyWeaknesses` | array | List of key weaknesses (3-5 items) |
| `data.report.highlights` | array | Notable achievements/highlights (2-3 items) |
| `data.report.coreSectionScores` | object | Scores and insights for each section |
| `data.report.criticalImprovements` | array | High-priority actionable improvements (5 items) |
| `data.report.missingOrWeakAreas` | array | Missing or weak areas with importance levels |
| `data.report.finalInsight` | string | 2-3 sentence summary with next steps |

---

## Error Responses

### 400 - Invalid Resume ID
```json
{
  "success": false,
  "message": "Invalid resume ID format. Must be a valid MongoDB ObjectId."
}
```

**Cause:** The provided resume ID is not a valid MongoDB ObjectId format (must be 24 hexadecimal characters).

**Solution:** Verify the resume ID format before making the request.

---

### 404 - Resume Not Found
```json
{
  "success": false,
  "message": "Resume not found"
}
```

**Cause:** The resume with the provided ID does not exist in the database.

**Solution:** 
- Verify the resume ID is correct
- Check if the resume exists by fetching all resumes first
- Ensure the resume hasn't been deleted

---

### 500 - AI Processing Failed
```json
{
  "success": false,
  "message": "Failed to analyze resume with AI",
  "error": "Error details..."
}
```

**Cause:** 
- OpenAI API error
- Network issues
- Invalid resume data

**Solution:**
- Check OpenAI API key configuration
- Verify network connectivity
- Ensure resume data is valid
- Retry the request

---

## Frontend Integration Examples

### React Hook
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
          headers: {
            'Content-Type': 'application/json'
          }
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

// Usage in component
function ResumeAnalyzer({ resumeId }) {
  const { analyzeResume, loading, error, report } = useAnalyzeResume();

  const handleAnalyze = async () => {
    try {
      await analyzeResume(resumeId);
    } catch (err) {
      console.error('Analysis failed:', err);
    }
  };

  return (
    <div>
      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze Resume'}
      </button>
      
      {error && <p className="error">{error}</p>}
      
      {report && (
        <div>
          <h3>Overall Score: {report.overallScore}/100</h3>
          <p>{report.overallAssessment}</p>
          {/* Display more report data */}
        </div>
      )}
    </div>
  );
}
```

### Axios Example
```javascript
import axios from 'axios';

const analyzeResume = async (resumeId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/ai/analyze-resume/${resumeId}`
    );

    if (response.data.success) {
      return response.data.data.report;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    if (error.response) {
      // Server responded with error
      throw new Error(error.response.data.message);
    } else {
      // Network error
      throw error;
    }
  }
};

// Usage
const report = await analyzeResume('507f1f77bcf86cd799439011');
console.log('Overall Score:', report.overallScore);
console.log('Strengths:', report.keyStrengths);
```

### Error Handling
```javascript
const analyzeResumeWithErrorHandling = async (resumeId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/ai/analyze-resume/${resumeId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      // Handle different error status codes
      switch (response.status) {
        case 400:
          throw new Error('Invalid resume ID format');
        case 404:
          throw new Error('Resume not found');
        case 500:
          throw new Error('Server error during analysis');
        default:
          throw new Error(data.message || 'Unknown error');
      }
    }

    if (!data.success) {
      throw new Error(data.message);
    }

    return data.data.report;
  } catch (error) {
    console.error('Analysis error:', error);
    // Handle error (show user-friendly message, etc.)
    throw error;
  }
};
```

---

## Response Time

- **Typical:** 3-5 seconds
- **Maximum:** ~10 seconds (for complex resumes)

**Note:** Analysis time depends on resume complexity and OpenAI API response time.

---

## Rate Limits

- Depends on your OpenAI API plan
- Free tier: Limited requests per minute
- Paid tier: Higher rate limits

**Recommendation:** Implement request throttling in your frontend to avoid hitting rate limits.

---

## Best Practices

1. **Loading States:** Always show a loading indicator during analysis (3-5 seconds)
2. **Error Handling:** Handle all error cases gracefully with user-friendly messages
3. **Caching:** Consider caching analysis results to avoid redundant API calls
4. **Validation:** Validate resume ID format before making the request
5. **Retry Logic:** Implement retry logic for network errors (with exponential backoff)

---

## Getting Resume ID

### Option 1: Get All Resumes
```javascript
// GET /api/resumes
const response = await fetch('http://localhost:5000/api/resumes');
const data = await response.json();
const resumeId = data.data[0]._id; // Use first resume's ID
```

### Option 2: Create New Resume First
```javascript
// POST /api/resumes
const response = await fetch('http://localhost:5000/api/resumes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "John Doe",
    email: "john@example.com",
    // ... other resume fields
  })
});
const data = await response.json();
const resumeId = data.data._id;
```

---

## Environment Configuration

For production, use environment variables:

```javascript
// config.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// In your API calls
const response = await fetch(`${API_BASE_URL}/api/ai/analyze-resume/${resumeId}`);
```

---

## Testing

### Postman
1. Method: `GET`
2. URL: `http://localhost:5000/api/ai/analyze-resume/:id`
3. Replace `:id` with actual resume ID
4. Click Send

### cURL
```bash
curl http://localhost:5000/api/ai/analyze-resume/507f1f77bcf86cd799439011
```

---

**Last Updated:** 2024-01-01  
**API Version:** 1.0.0

