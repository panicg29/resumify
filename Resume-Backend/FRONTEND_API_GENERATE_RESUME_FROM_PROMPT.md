# Frontend API Documentation: Generate Resume from Prompt

## Overview

This feature allows users to create complete, structured resumes by describing themselves in natural language. The AI analyzes the user's description and automatically organizes it into a professional resume format that matches your database schema.

**Key Benefits:**
- Users don't need to manually fill out forms
- AI handles structure and formatting
- Natural language input makes resume creation faster
- All required fields are automatically generated if not provided

---

## Endpoint

**Method:** `POST`  
**Full URL:** `http://localhost:5000/api/ai/generate-resume`  
**Content-Type:** `application/json`

---

## Request

### Request Body

```json
{
  "prompt": "string (required)"
}
```

### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `prompt` | string | Yes | Natural language description containing personal info, education, experience, skills, projects, etc. |

### Example Request

```javascript
const response = await fetch('http://localhost:5000/api/ai/generate-resume', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: "I'm John Doe, a software engineer with 5 years of experience. I have a Bachelor's in Computer Science from MIT (2018). I worked as a Frontend Developer at Google from 2019 to 2021, where I built React applications. Currently, I'm a Full Stack Developer at Microsoft since 2021. I'm skilled in JavaScript, React, Node.js, MongoDB, and Python. I've built several projects including an e-commerce platform using MERN stack and a real-time chat application. My email is john.doe@example.com and phone is +1-555-123-4567."
  })
});
```

---

## Response

### Success Response (201 Created)

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
        }
      ],
      "skills": [
        {
          "name": "JavaScript",
          "level": "Expert"
        }
      ],
      "projects": [
        {
          "name": "E-commerce Platform",
          "description": "Built a full-stack e-commerce application...",
          "technologies": ["React", "Node.js", "MongoDB"]
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

### Error Responses

#### 400 Bad Request - Missing Prompt

```json
{
  "success": false,
  "message": "Prompt is required and must be a non-empty string"
}
```

#### 500 Internal Server Error - AI Processing Failed

```json
{
  "success": false,
  "message": "Failed to generate resume with AI",
  "error": "OpenAI API quota exceeded. Please check your billing."
}
```

#### 500 Internal Server Error - Incomplete Data

```json
{
  "success": false,
  "message": "AI could not generate complete resume data. Please provide more details in your prompt."
}
```

---

## Frontend Integration Guide

### React/Next.js Example

```javascript
import { useState } from 'react';

const GenerateResumeForm = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resume, setResume] = useState(null);

  const generateResume = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/ai/generate-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate resume');
      }

      if (data.success) {
        setResume(data.data.resume);
        // Optionally redirect to resume view/edit page
        // navigate(`/resumes/${data.data.resume._id}`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={generateResume}>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe yourself, your experience, education, skills..."
        rows={10}
        required
      />
      <button type="submit" disabled={loading || !prompt.trim()}>
        {loading ? 'Generating...' : 'Generate Resume'}
      </button>
      {error && <div className="error">{error}</div>}
      {resume && (
        <div className="success">
          Resume created! ID: {resume._id}
        </div>
      )}
    </form>
  );
};
```

### Vue.js Example

```vue
<template>
  <form @submit.prevent="generateResume">
    <textarea
      v-model="prompt"
      placeholder="Describe yourself, your experience, education, skills..."
      rows="10"
      required
    />
    <button type="submit" :disabled="loading || !prompt.trim()">
      {{ loading ? 'Generating...' : 'Generate Resume' }}
    </button>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="resume" class="success">
      Resume created! ID: {{ resume._id }}
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      prompt: '',
      loading: false,
      error: null,
      resume: null
    };
  },
  methods: {
    async generateResume() {
      this.loading = true;
      this.error = null;

      try {
        const response = await fetch('http://localhost:5000/api/ai/generate-resume', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: this.prompt }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to generate resume');
        }

        if (data.success) {
          this.resume = data.data.resume;
          // Optionally redirect
          // this.$router.push(`/resumes/${data.data.resume._id}`);
        }
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
```

### Vanilla JavaScript Example

```javascript
async function generateResumeFromPrompt(prompt) {
  try {
    const response = await fetch('http://localhost:5000/api/ai/generate-resume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to generate resume');
    }

    if (data.success) {
      return data.data.resume;
    }
  } catch (error) {
    console.error('Error generating resume:', error);
    throw error;
  }
}

// Usage
const prompt = document.getElementById('prompt-input').value;
generateResumeFromPrompt(prompt)
  .then(resume => {
    console.log('Resume created:', resume);
    // Handle success
  })
  .catch(error => {
    console.error('Error:', error);
    // Handle error
  });
```

---

## User Experience Best Practices

### 1. Prompt Input UI

**Recommended:**
- Large textarea (10-15 rows) for comfortable typing
- Character counter (suggest 200-3000 characters)
- Placeholder text with example:
  ```
  Example: "I'm a software engineer with 5 years experience. 
  I graduated from MIT in 2018 with a CS degree. 
  I worked at Google from 2019-2021..."
  ```
- Real-time validation (min 50 characters recommended)

### 2. Loading States

**Show:**
- Loading spinner/indicator
- Disable submit button during processing
- Display message: "AI is analyzing your information and creating your resume..."
- Estimated time: 3-5 seconds

### 3. Success Handling

**After successful generation:**
- Show success message
- Display the generated resume (or redirect to resume page)
- Option to:
  - Edit the resume
  - Generate another resume
  - Download as PDF (if you have that feature)

### 4. Error Handling

**Handle these scenarios:**

```javascript
// User-friendly error messages
const errorMessages = {
  'Prompt is required': 'Please describe yourself to generate a resume',
  'Failed to generate resume with AI': 'AI service is temporarily unavailable. Please try again.',
  'AI could not generate complete resume data': 'Please provide more details about your experience, education, or skills.'
};

// Show retry option for network errors
if (error.message.includes('fetch')) {
  showRetryButton();
}
```

### 5. Prompt Suggestions

**Help users write better prompts:**

```javascript
const promptSuggestions = [
  "Start with your name, email, and phone number",
  "Mention your education (degree, institution, year)",
  "Describe your work experience (company, role, dates, responsibilities)",
  "List your technical skills and proficiency levels",
  "Include projects you've worked on with technologies used",
  "Add any certifications or achievements"
];
```

---

## Understanding the AI Behavior

### What the AI Does

1. **Extracts Information:** Analyzes the prompt to find:
   - Personal details (name, email, phone)
   - Education history
   - Work experience with dates
   - Skills and technologies
   - Projects and achievements

2. **Organizes Data:** Structures information into:
   - Chronological order for experience/education
   - Proper formatting for dates
   - Skill levels (Beginner, Intermediate, Advanced, Expert)
   - Complete project descriptions

3. **Fills Gaps:** If information is missing:
   - Creates professional placeholders (e.g., "user@email.com")
   - Generates professional summary based on experience
   - Makes reasonable assumptions where needed

### What Users Should Include

**Essential Information:**
- Name (or it will use placeholder)
- Education (degree, institution, year)
- Work experience (company, role, dates, description)
- Skills (technologies, programming languages)
- Projects (name, description, technologies)

**Optional but Recommended:**
- Email and phone number
- Career objectives or summary preferences
- Certifications
- Achievements or awards

### Example Prompts

**Good Prompt (Comprehensive):**
```
I'm Sarah Johnson, a senior full-stack developer with 7 years of experience.
Email: sarah.j@example.com, Phone: +1-555-789-0123

Education:
- Bachelor's in Computer Science, UC Berkeley, 2016
- Master's in Software Engineering, Stanford, 2018

Experience:
- Senior Developer at Amazon (2020-present): Leading microservices development
- Developer at Google (2018-2020): Built React applications, worked with Node.js
- Junior Developer at StartupX (2016-2018): Full-stack development

Skills: JavaScript, TypeScript, React, Node.js, Python, AWS, Docker, Kubernetes
All skills are at Advanced to Expert level.

Projects:
- E-commerce Platform: Built with React, Node.js, MongoDB. Handles 10k+ users
- Real-time Chat App: Used WebSockets, React, Express
```

**Acceptable Prompt (Basic):**
```
I'm a software engineer with 3 years of experience in web development.
I graduated from MIT in 2020 with a CS degree.
I worked at Microsoft as a Frontend Developer from 2020-2023.
I know React, Node.js, and MongoDB well.
I built a few e-commerce projects.
```

**Poor Prompt (Too Vague):**
```
I'm a developer with some experience.
I know programming.
I went to college.
```

---

## API Response Structure

### Resume Object Schema

```typescript
interface Resume {
  _id: string;
  name: string;
  email: string;
  phone: string;
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

interface Education {
  degree: string;
  institution: string;
  year: number;
  gpa?: string;
}

interface Experience {
  title: string;
  company: string;
  startDate: string; // YYYY-MM-DD
  endDate: string | null;
  current: boolean;
  description: string;
}

interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
}
```

---

## Integration Flow

```
1. User Input
   └─> Textarea with prompt

2. Validation (Frontend)
   └─> Check prompt length (min 50 chars recommended)
   └─> Show loading state

3. API Request
   └─> POST /api/ai/generate-resume
   └─> Body: { prompt: string }

4. Processing (Backend)
   └─> AI analyzes prompt (3-5 seconds)
   └─> Generates structured resume
   └─> Saves to database

5. Response Handling
   ├─> Success: Show resume, redirect to edit/view
   └─> Error: Show error message, allow retry

6. User Actions
   ├─> Edit the generated resume
   ├─> Generate another resume
   └─> Save and continue
```

---

## CORS Configuration

The endpoint supports CORS with these origins:
- `http://localhost:5173` (Vite default)
- `http://127.0.0.1:5173`

If your frontend runs on a different port/host, you'll need to update the backend CORS configuration.

---

## Performance Considerations

1. **Processing Time:** Typically 3-5 seconds
   - Show progress indicator
   - Disable form during processing
   - Consider timeout handling (backend has ~10s timeout)

2. **Prompt Length:**
   - Recommended: 200-3000 characters
   - Maximum: ~3000 characters (truncated automatically)
   - Minimum: ~50 characters for meaningful results

3. **Rate Limiting:**
   - Be aware of OpenAI API rate limits
   - Implement client-side throttling if needed
   - Show appropriate error messages for rate limit errors

---

## Error Handling Strategy

```javascript
const handleGenerateResume = async (prompt) => {
  try {
    setLoading(true);
    setError(null);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle specific error types
      switch (response.status) {
        case 400:
          setError('Please provide a valid description');
          break;
        case 500:
          if (data.error?.includes('quota')) {
            setError('Service temporarily unavailable. Please try again later.');
          } else if (data.message?.includes('complete resume data')) {
            setError('Please provide more details about your experience and skills.');
          } else {
            setError('Failed to generate resume. Please try again.');
          }
          break;
        default:
          setError(data.message || 'An error occurred');
      }
      return;
    }

    if (data.success) {
      // Success handling
      onSuccess(data.data.resume);
    }
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      setError('Network error. Please check your connection.');
    } else {
      setError('An unexpected error occurred');
    }
  } finally {
    setLoading(false);
  }
};
```

---

## UI/UX Recommendations

### Form Design

```
┌─────────────────────────────────────────┐
│  Generate Resume from Description        │
├─────────────────────────────────────────┤
│                                          │
│  Describe yourself, your experience,     │
│  education, and skills:                 │
│                                          │
│  ┌─────────────────────────────────┐   │
│  │ I'm John Doe, a software...      │   │
│  │ [Textarea - 10-15 rows]          │   │
│  │                                   │   │
│  └─────────────────────────────────┘   │
│                                          │
│  💡 Tips:                               │
│  • Include your name, email, phone     │
│  • Mention education and years         │
│  • Describe work experience            │
│  • List your skills and technologies   │
│                                          │
│  [Characters: 245 / 3000]               │
│                                          │
│  [Generate Resume] [Clear]              │
│                                          │
└─────────────────────────────────────────┘
```

### Loading State

```
┌─────────────────────────────────────────┐
│  ⏳ Generating your resume...           │
│                                          │
│  [Progress bar / Spinner]               │
│                                          │
│  AI is analyzing your information       │
│  and structuring your resume...        │
│                                          │
│  This usually takes 3-5 seconds         │
└─────────────────────────────────────────┘
```

### Success State

```
┌─────────────────────────────────────────┐
│  ✅ Resume Generated Successfully!       │
│                                          │
│  Your resume has been created and       │
│  saved.                                 │
│                                          │
│  [View Resume] [Edit] [Generate Another]│
└─────────────────────────────────────────┘
```

---

## Testing Checklist

- [ ] Test with comprehensive prompt (all fields)
- [ ] Test with minimal prompt (basic info)
- [ ] Test with very long prompt (3000+ chars)
- [ ] Test with empty prompt (should show error)
- [ ] Test network error handling
- [ ] Test loading states
- [ ] Test success redirect/navigation
- [ ] Test error message display
- [ ] Test retry functionality
- [ ] Test mobile responsiveness

---

## Next Steps After Generation

1. **Immediate Actions:**
   - Redirect to resume view/edit page
   - Show success notification
   - Auto-save to user's resume list

2. **Suggested Features:**
   - "Edit" button → Navigate to edit page
   - "Generate Another" → Clear form, allow new generation
   - "Download PDF" → If PDF export is available
   - "Share" → If sharing feature exists

3. **Data Updates:**
   - Update resume list in dashboard
   - Add to recent activities
   - Update analytics/metrics

---

## Additional Notes

- **No userId Required:** Resumes are created without user association
- **AI Model:** Uses GPT-4o-mini for cost efficiency
- **Validation:** All generated resumes follow schema validation
- **Editing:** Generated resumes can be edited using PUT `/api/resumes/:id`
- **Updates:** After generation, users can use the update-from-prompt feature

---

## Support & Troubleshooting

**Common Issues:**

1. **"Prompt is required"** → Ensure prompt field is not empty
2. **"Failed to generate resume with AI"** → Check OpenAI API key configuration
3. **"AI could not generate complete resume data"** → User should provide more details
4. **Network timeout** → Check internet connection, retry request
5. **CORS errors** → Verify frontend origin is in backend CORS whitelist

**Debug Tips:**
- Check browser console for network errors
- Verify API endpoint URL is correct
- Check request headers include `Content-Type: application/json`
- Validate JSON body format

---

This documentation provides everything your frontend team needs to integrate the resume generation feature seamlessly!

