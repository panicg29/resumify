# Resume Generation from Natural Language Prompt

## Overview

This feature allows users to generate complete, structured resumes from natural language descriptions. Users describe themselves in plain English, and the AI organizes the information into a professional resume format matching our database schema.

## Endpoint

**POST** `http://localhost:5000/api/ai/generate-resume`

**Base URL:** `http://localhost:5000` (default) or `http://<host>:<port>` as configured
**Full Endpoint:** `http://localhost:5000/api/ai/generate-resume`

### Request

**Content-Type:** `application/json`

**Body:**
```json
{
  "prompt": "Natural language description about the user"
}
```

**Fields:**
- `prompt` (required, string): Natural language description containing:
  - Personal information (name, email, phone - if available)
  - Educational background
  - Work experience
  - Skills and technologies
  - Projects and achievements
  - Career goals or objectives

### Example Request

```json
{
  "prompt": "I'm John Doe, a software engineer with 5 years of experience. I have a Bachelor's in Computer Science from MIT (2018). I worked as a Frontend Developer at Google from 2019 to 2021, where I built React applications. Currently, I'm a Full Stack Developer at Microsoft since 2021. I'm skilled in JavaScript, React, Node.js, MongoDB, and Python. I've built several projects including an e-commerce platform using MERN stack and a real-time chat application. My email is john.doe@example.com and phone is +1-555-123-4567."
}
```

### Response

**Success (201 Created):**
```json
{
  "success": true,
  "message": "Resume generated successfully from prompt",
  "data": {
    "resume": {
      "_id": "65f1d6c2a56f3e0012abc456",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+1-555-123-4567",
      "summary": "Experienced software engineer with 5+ years...",
      "education": [
        {
          "degree": "Bachelor's in Computer Science",
          "institution": "MIT",
          "year": 2018
        }
      ],
      "experience": [
        {
          "title": "Full Stack Developer",
          "company": "Microsoft",
          "startDate": "2021-01-01",
          "endDate": null,
          "current": true,
          "description": "Building full-stack applications..."
        },
        {
          "title": "Frontend Developer",
          "company": "Google",
          "startDate": "2019-01-01",
          "endDate": "2021-01-01",
          "current": false,
          "description": "Developed React applications..."
        }
      ],
      "skills": [
        {
          "name": "JavaScript",
          "level": "Expert"
        },
        {
          "name": "React",
          "level": "Expert"
        },
        {
          "name": "Node.js",
          "level": "Advanced"
        }
      ],
      "projects": [
        {
          "name": "E-commerce Platform",
          "description": "Built a full-stack e-commerce application...",
          "technologies": ["React", "Node.js", "MongoDB", "Express"]
        }
      ],
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    "aiGeneration": {
      "success": true,
      "promptLength": 450,
      "model": "gpt-4o-mini"
    }
  }
}
```

**Error (400 Bad Request):**
```json
{
  "success": false,
  "message": "Prompt is required and must be a non-empty string"
}
```

**Error (500 Internal Server Error):**
```json
{
  "success": false,
  "message": "Failed to generate resume with AI",
  "error": "OpenAI API quota exceeded. Please check your billing."
}
```

## How It Works

1. **User Input**: User provides a natural language description about themselves
2. **AI Processing**: The prompt is sent to OpenAI GPT-4o-mini with detailed instructions to:
   - Extract all relevant information
   - Organize it into structured resume format
   - Fill in reasonable defaults where information is missing
   - Create professional summaries and descriptions
3. **Data Validation**: The AI response is validated and formatted to match our resume schema
4. **Database Save**: The structured resume is saved to MongoDB
5. **Response**: The complete resume object is returned to the client

## AI Behavior

The AI will:
- Extract personal information (name, email, phone) from the prompt
- If information is missing, create professional placeholders (user can update later)
- Organize education and experience chronologically (most recent first)
- Assign appropriate skill levels based on context
- Generate professional summaries from the provided information
- Create comprehensive project descriptions if projects are mentioned
- Ensure all required fields (name, email, phone, summary) are present

## Tips for Better Results

**Provide detailed information:**
- ✅ "I have 5 years of experience as a software engineer. I worked at Google from 2019-2021 as a Frontend Developer, then Microsoft from 2021-present as a Full Stack Developer..."
- ❌ "I'm a developer with some experience"

**Include specific details:**
- ✅ "I built a real-time chat app using React, Node.js, and WebSockets. It handles 1000+ concurrent users."
- ❌ "I built some apps"

**Mention technologies explicitly:**
- ✅ "I'm proficient in JavaScript, React, Node.js, MongoDB, and Python"
- ❌ "I know programming"

**Include dates when possible:**
- ✅ "I graduated from MIT in 2018 with a Computer Science degree"
- ❌ "I went to college"

## CORS & Headers

- **Origin:** Must match allowed CORS origins (`http://localhost:5173`, `http://127.0.0.1:5173`)
- **Methods:** POST
- **Headers:** Content-Type: application/json
- **Credentials:** Not required
- **Full URL:** `http://localhost:5000/api/ai/generate-resume`

## Error Handling

The endpoint handles:
- Missing or invalid prompts
- OpenAI API errors (quota, rate limits, timeouts)
- Validation errors from database
- Missing required fields in AI response

All errors return JSON with `success: false` and descriptive error messages.

## Frontend Integration Example

```javascript
const generateResumeFromPrompt = async (prompt) => {
  try {
    const response = await fetch('http://localhost:5000/api/ai/generate-resume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt
      })
    });

    const data = await response.json();

    if (data.success) {
      console.log('Resume generated:', data.data.resume);
      return data.data.resume;
    } else {
      console.error('Error:', data.message);
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Network error:', error);
    throw error;
  }
};

// Usage
const prompt = "I'm a full stack developer with 3 years experience...";
const resume = await generateResumeFromPrompt(prompt);
```

## Notes

- Resumes are created without user association (no userId field).
- The AI uses GPT-4o-mini model for cost efficiency while maintaining quality.
- Generated resumes follow the same schema validation as manually created resumes.
- Users can edit generated resumes using the standard PUT `http://localhost:5000/api/resumes/:id` endpoint.
- The endpoint includes comprehensive error handling for OpenAI API issues.

