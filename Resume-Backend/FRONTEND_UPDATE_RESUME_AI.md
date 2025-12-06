# Frontend Integration: Update Resume with AI Prompt

## API Endpoint

**Method:** `PUT`  
**URL:** `http://localhost:5000/api/ai/update-resume/:id`

Replace `:id` with the resume ID (MongoDB ObjectId).

---

## Request Format

### Headers
```javascript
{
  "Content-Type": "application/json"
}
```

### Request Body
```javascript
{
  "prompt": "Add 2 years of experience as Senior Developer at Google. Update summary to highlight leadership skills."
}
```

### URL Parameters
- `id` - Resume ID (MongoDB ObjectId, 24 characters)

---

## Response Format

### Success Response (200)
```javascript
{
  "success": true,
  "message": "Resume updated successfully from prompt",
  "data": {
    "resume": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1-555-0123",
      "summary": "Updated summary...",
      "education": [...],
      "experience": [...],
      "skills": [...],
      "projects": [...],
      "userId": "...",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "aiUpdate": {
      "success": true,
      "promptLength": 85,
      "model": "gpt-4o-mini",
      "fieldsUpdated": ["summary", "experience"]
    }
  }
}
```

### Error Responses

**400 - Invalid Resume ID**
```javascript
{
  "success": false,
  "message": "Invalid resume ID format. Must be a valid MongoDB ObjectId."
}
```

**400 - Missing Prompt**
```javascript
{
  "success": false,
  "message": "Prompt is required and must be a non-empty string"
}
```

**404 - Resume Not Found**
```javascript
{
  "success": false,
  "message": "Resume not found"
}
```

**500 - AI Processing Failed**
```javascript
{
  "success": false,
  "message": "Failed to process update with AI",
  "error": "Error details..."
}
```

---

## Frontend Implementation Examples

### React/JavaScript Example

```javascript
const updateResumeWithAI = async (resumeId, prompt) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/ai/update-resume/${resumeId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      }
    );

    const data = await response.json();

    if (data.success) {
      console.log('Resume updated:', data.data.resume);
      return data.data.resume;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error updating resume:', error);
    throw error;
  }
};

// Usage
const handleUpdate = async () => {
  const prompt = "Add a new skill 'React' and update summary to mention frontend expertise";
  const updatedResume = await updateResumeWithAI('507f1f77bcf86cd799439011', prompt);
  // Update your state with updatedResume
};
```

### React Hook Example

```javascript
import { useState } from 'react';

const useUpdateResumeAI = () => {
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
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt }),
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

// Usage in component
function ResumeEditor({ resumeId }) {
  const { updateResume, loading, error } = useUpdateResumeAI();
  const [prompt, setPrompt] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateResume(resumeId, prompt);
      // Handle success - update your resume state
      console.log('Resume updated:', updated);
    } catch (err) {
      // Handle error
      console.error('Update failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe what you want to update..."
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Updating...' : 'Update Resume'}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
```

### Axios Example

```javascript
import axios from 'axios';

const updateResumeWithAI = async (resumeId, prompt) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/ai/update-resume/${resumeId}`,
      { prompt }
    );

    return response.data.data.resume;
  } catch (error) {
    if (error.response) {
      // Server responded with error
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  }
};
```

---

## Prompt Examples

### Add Experience
```
"Add a new experience: Software Engineer at Microsoft from 2022-2024. Responsibilities included developing cloud applications and leading a team of 5 developers."
```

### Update Summary
```
"Update the summary to emphasize 10+ years of experience in full-stack development and expertise in React and Node.js."
```

### Add Skills
```
"Add Python, Docker, and Kubernetes to the skills list with Advanced level."
```

### Remove Item
```
"Remove the oldest education entry and update the summary to reflect current qualifications."
```

### Multiple Updates
```
"Add a new project called 'E-commerce Platform' built with React and Node.js. Also update the summary to mention expertise in e-commerce solutions."
```

---

## Best Practices

1. **Validate Resume ID**: Ensure the ID is a valid MongoDB ObjectId (24 hex characters)
2. **Validate Prompt**: Check that prompt is not empty and has reasonable length
3. **Loading States**: Show loading indicator while AI processes the request
4. **Error Handling**: Display user-friendly error messages
5. **Success Feedback**: Show confirmation when resume is updated
6. **Optimistic Updates**: Optionally update UI immediately, then sync with server response

---

## Complete React Component Example

```javascript
import React, { useState } from 'react';

function AIResumeUpdater({ resumeId, onUpdate }) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(
        `http://localhost:5000/api/ai/update-resume/${resumeId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setPrompt('');
        if (onUpdate) {
          onUpdate(data.data.resume);
        }
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(data.message || 'Failed to update resume');
      }
    } catch (err) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-resume-updater">
      <h3>Update Resume with AI</h3>
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: Add 2 years of experience as Senior Developer at Google..."
          rows={4}
          disabled={loading}
          required
        />
        
        <button 
          type="submit" 
          disabled={loading || !prompt.trim()}
        >
          {loading ? 'Updating...' : 'Update Resume'}
        </button>
      </form>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {success && (
        <div className="success-message">
          Resume updated successfully!
        </div>
      )}
    </div>
  );
}

export default AIResumeUpdater;
```

---

## API Base URL Configuration

For production, use environment variables:

```javascript
// config.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// In your fetch calls
const response = await fetch(`${API_BASE_URL}/api/ai/update-resume/${resumeId}`, {
  // ...
});
```

---

## Testing

### Test with cURL
```bash
curl -X PUT http://localhost:5000/api/ai/update-resume/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Add React to skills list"}'
```

### Test with Postman
1. Method: `PUT`
2. URL: `http://localhost:5000/api/ai/update-resume/:id`
3. Body → raw → JSON:
```json
{
  "prompt": "Update summary to highlight leadership experience"
}
```

---

## Notes

- **AI Model**: Uses GPT-4o-mini for cost-effective updates
- **Processing Time**: Typically 2-5 seconds
- **Rate Limits**: Depends on your OpenAI API plan
- **Partial Updates**: Only updates fields mentioned in the prompt
- **Array Updates**: When updating arrays, include the entire updated array

---

**Ready to integrate!** 🚀

