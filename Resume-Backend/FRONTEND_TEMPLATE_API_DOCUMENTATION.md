# Frontend Template API Documentation

Complete API reference for the Resume Template feature. This documentation covers all endpoints that support template selection and how to integrate template functionality in your frontend.

**Base URL:** `http://localhost:5000`

---

## Overview

The template feature allows you to:
- Save a template identifier when creating a resume
- Retrieve resumes with their associated templates
- Update the template for existing resumes
- Display resumes using the correct template in your frontend

**Template Format:** Templates are stored as strings (e.g., `"template1"`, `"template2"`, `"modern"`, `"classic"`, etc.). You can use any naming convention that fits your frontend template system.

**Default Template:** If no template is specified, the system defaults to `"template1"`.

---

## Table of Contents

1. [Create Resume with Template](#1-create-resume-with-template)
2. [Update Resume Template](#2-update-resume-template)
3. [Get All Resumes (with templates)](#3-get-all-resumes-with-templates)
4. [Get Resume by ID (with template)](#4-get-resume-by-id-with-template)
5. [Get Resumes by User ID (with templates)](#5-get-resumes-by-user-id-with-templates)
6. [Generate Resume from Prompt with Template](#6-generate-resume-from-prompt-with-template)
7. [Update Resume from Prompt with Template](#7-update-resume-from-prompt-with-template)
8. [AI Routes with Template Support](#8-ai-routes-with-template-support)
9. [Frontend Integration Examples](#9-frontend-integration-examples)
10. [Error Handling](#10-error-handling)

---

## 1. Create Resume with Template

### Endpoint
```
POST /api/resumes
```

### Request Body
```json
{
  "userId": "507f1f77bcf86cd799439011",  // Optional
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-123-4567",
  "summary": "Experienced software developer...",
  "education": [...],
  "experience": [...],
  "skills": [...],
  "projects": [...],
  "template": "template2"  // NEW: Template identifier
}
```

### Template Field
- **Type:** `string`
- **Required:** No (defaults to `"template1"`)
- **Description:** Template identifier/code to use when displaying this resume
- **Examples:** `"template1"`, `"template2"`, `"modern"`, `"classic"`, `"creative"`

### Request Example (JavaScript/Fetch)
```javascript
const createResume = async (resumeData, templateCode) => {
  const response = await fetch('http://localhost:5000/api/resumes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...resumeData,
      template: templateCode || 'template1'  // Include template
    })
  });

  const data = await response.json();
  return data;
};

// Usage
const newResume = await createResume({
  name: "John Doe",
  email: "john@example.com",
  phone: "+1-555-123-4567",
  summary: "Experienced developer...",
  education: [...],
  experience: [...],
  skills: [...],
  projects: [...]
}, "template2");  // Specify template
```

### Request Example (Axios)
```javascript
import axios from 'axios';

const createResume = async (resumeData, templateCode) => {
  const response = await axios.post('http://localhost:5000/api/resumes', {
    ...resumeData,
    template: templateCode || 'template1'
  });
  return response.data;
};
```

### Success Response (201)
```json
{
  "success": true,
  "message": "Resume created successfully",
  "data": {
    "resume": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1-555-123-4567",
      "summary": "Experienced software developer...",
      "education": [...],
      "experience": [...],
      "skills": [...],
      "projects": [...],
      "template": "template2",  // Template is included in response
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

---

## 2. Update Resume Template

### Endpoint
```
PUT /api/resumes/:id
```

### Request Body
```json
{
  "template": "template3"  // Update template only
}
```

Or update template along with other fields:
```json
{
  "name": "John Doe Updated",
  "summary": "Updated summary...",
  "template": "template3"  // Change template
}
```

### Request Example
```javascript
const updateResumeTemplate = async (resumeId, newTemplate) => {
  const response = await fetch(`http://localhost:5000/api/resumes/${resumeId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      template: newTemplate
    })
  });

  const data = await response.json();
  return data;
};

// Usage: Change template from template1 to template2
await updateResumeTemplate('507f1f77bcf86cd799439011', 'template2');
```

### Success Response (200)
```json
{
  "success": true,
  "message": "Resume updated successfully",
  "data": {
    "resume": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "template": "template3",  // Updated template
      ...
    }
  }
}
```

---

## 3. Get All Resumes (with templates)

### Endpoint
```
GET /api/resumes
```

### Request Example
```javascript
const getAllResumes = async () => {
  const response = await fetch('http://localhost:5000/api/resumes');
  const data = await response.json();
  return data;
};
```

### Success Response (200)
```json
{
  "success": true,
  "count": 3,
  "data": {
    "resumes": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com",
        "template": "template1",  // Template included
        ...
      },
      {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Jane Smith",
        "email": "jane@example.com",
        "template": "template2",  // Different template
        ...
      },
      {
        "_id": "507f1f77bcf86cd799439013",
        "name": "Bob Johnson",
        "email": "bob@example.com",
        "template": "template3",  // Another template
        ...
      }
    ]
  }
}
```

### Frontend Usage
```javascript
// Fetch all resumes and render with correct templates
const resumes = await getAllResumes();
resumes.data.resumes.forEach(resume => {
  // Use resume.template to determine which template component to render
  renderResume(resume, resume.template);
});
```

---

## 4. Get Resume by ID (with template)

### Endpoint
```
GET /api/resumes/:id
```

### Request Example
```javascript
const getResumeById = async (resumeId) => {
  const response = await fetch(`http://localhost:5000/api/resumes/${resumeId}`);
  const data = await response.json();
  return data;
};
```

### Success Response (200)
```json
{
  "success": true,
  "data": {
    "resume": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "template": "template2",  // Template included
      ...
    }
  }
}
```

---

## 5. Get Resumes by User ID (with templates)

### Endpoint
```
GET /api/resumes/user/:userId
```

### Request Example
```javascript
const getResumesByUserId = async (userId) => {
  const response = await fetch(`http://localhost:5000/api/resumes/user/${userId}`);
  const data = await response.json();
  return data;
};
```

### Success Response (200)
```json
{
  "success": true,
  "count": 2,
  "data": {
    "resumes": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "template": "template1",
        ...
      },
      {
        "_id": "507f1f77bcf86cd799439012",
        "name": "John Doe",
        "template": "template2",
        ...
      }
    ]
  }
}
```

---

## 6. Generate Resume from Prompt with Template

### Endpoint
```
POST /api/ai/generate-resume
```

### Request Body
```json
{
  "prompt": "Create a resume for a software developer with 5 years experience...",
  "template": "template2"  // NEW: Specify template
}
```

### Request Example
```javascript
const generateResumeFromPrompt = async (prompt, templateCode) => {
  const response = await fetch('http://localhost:5000/api/ai/generate-resume', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: prompt,
      template: templateCode || 'template1'
    })
  });

  const data = await response.json();
  return data;
};

// Usage
const resume = await generateResumeFromPrompt(
  "Create a resume for a senior software engineer...",
  "template3"  // Specify template
);
```

### Success Response (201)
```json
{
  "success": true,
  "message": "Resume generated successfully from prompt",
  "data": {
    "resume": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Generated Name",
      "template": "template3",  // Template included
      ...
    },
    "aiGeneration": {
      "success": true,
      "promptLength": 150,
      "model": "gpt-4o-mini"
    }
  }
}
```

---

## 7. Update Resume from Prompt with Template

### Endpoint
```
PUT /api/ai/update-resume/:id
```

### Request Body
```json
{
  "prompt": "Add 2 years of experience at Google...",
  "template": "template2"  // NEW: Optionally update template
}
```

### Request Example
```javascript
const updateResumeFromPrompt = async (resumeId, prompt, newTemplate) => {
  const response = await fetch(`http://localhost:5000/api/ai/update-resume/${resumeId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: prompt,
      template: newTemplate  // Optional: update template
    })
  });

  const data = await response.json();
  return data;
};

// Usage: Update resume content and change template
await updateResumeFromPrompt(
  '507f1f77bcf86cd799439011',
  'Add more skills and experience',
  'template2'  // Change template
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
      "template": "template2",  // Updated template
      ...
    },
    "aiUpdate": {
      "success": true,
      "promptLength": 50,
      "model": "gpt-4o-mini",
      "fieldsUpdated": ["experience", "skills", "template"]
    }
  }
}
```

---

## 8. AI Routes with Template Support

### 8.1 Parse Text to Resume
**Endpoint:** `POST /api/ai/parse-text-to-resume`

**Request Body:**
```json
{
  "text": "Resume text content...",
  "userId": "507f1f77bcf86cd799439011",
  "template": "template2"  // NEW: Optional
}
```

### 8.2 Process PDF Complete
**Endpoint:** `POST /api/ai/process-pdf-complete`

**Request Body (FormData):**
```
pdf: [PDF file]
userId: "507f1f77bcf86cd799439011"  // Optional
template: "template2"  // NEW: Optional
```

**Example:**
```javascript
const formData = new FormData();
formData.append('pdf', pdfFile);
formData.append('userId', userId);
formData.append('template', 'template2');  // Include template

const response = await fetch('http://localhost:5000/api/ai/process-pdf-complete', {
  method: 'POST',
  body: formData
});
```

### 8.3 Create from Text
**Endpoint:** `POST /api/ai/create-from-text`

**Request Body:**
```json
{
  "text": "Resume text content...",
  "userId": "507f1f77bcf86cd799439011",
  "template": "template2"  // NEW: Optional
}
```

---

## 9. Frontend Integration Examples

### 9.1 React Component Example

```javascript
import React, { useState, useEffect } from 'react';

function ResumeList() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/resumes');
      const data = await response.json();
      
      if (data.success) {
        setResumes(data.data.resumes);
      }
    } catch (error) {
      console.error('Error fetching resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderResume = (resume) => {
    // Use resume.template to determine which template component to render
    switch (resume.template) {
      case 'template1':
        return <Template1Component resume={resume} />;
      case 'template2':
        return <Template2Component resume={resume} />;
      case 'template3':
        return <Template3Component resume={resume} />;
      default:
        return <Template1Component resume={resume} />;
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="resume-list">
      {resumes.map(resume => (
        <div key={resume._id} className="resume-item">
          {renderResume(resume)}
        </div>
      ))}
    </div>
  );
}

// Template components
function Template1Component({ resume }) {
  return (
    <div className="template1">
      <h1>{resume.name}</h1>
      <p>{resume.email}</p>
      {/* Template1 specific layout */}
    </div>
  );
}

function Template2Component({ resume }) {
  return (
    <div className="template2">
      <h1>{resume.name}</h1>
      <p>{resume.email}</p>
      {/* Template2 specific layout */}
    </div>
  );
}

function Template3Component({ resume }) {
  return (
    <div className="template3">
      <h1>{resume.name}</h1>
      <p>{resume.email}</p>
      {/* Template3 specific layout */}
    </div>
  );
}

export default ResumeList;
```

### 9.2 Create Resume with Template Selection

```javascript
import React, { useState } from 'react';

function CreateResumeForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
    // ... other fields
  });
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const [loading, setLoading] = useState(false);

  const templates = [
    { code: 'template1', name: 'Classic' },
    { code: 'template2', name: 'Modern' },
    { code: 'template3', name: 'Creative' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          template: selectedTemplate  // Include selected template
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Resume created successfully!');
        // Redirect or update UI
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error creating resume:', error);
      alert('Failed to create resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Template Selection */}
      <div className="template-selector">
        <label>Select Template:</label>
        <select 
          value={selectedTemplate} 
          onChange={(e) => setSelectedTemplate(e.target.value)}
        >
          {templates.map(template => (
            <option key={template.code} value={template.code}>
              {template.name}
            </option>
          ))}
        </select>
      </div>

      {/* Resume Form Fields */}
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      {/* ... other fields ... */}

      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Resume'}
      </button>
    </form>
  );
}

export default CreateResumeForm;
```

### 9.3 Dynamic Template Rendering Hook

```javascript
import { useState, useEffect } from 'react';

function useResumeWithTemplate(resumeId) {
  const [resume, setResume] = useState(null);
  const [template, setTemplate] = useState('template1');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/resumes/${resumeId}`);
        const data = await response.json();
        
        if (data.success) {
          setResume(data.data.resume);
          setTemplate(data.data.resume.template || 'template1');
        }
      } catch (error) {
        console.error('Error fetching resume:', error);
      } finally {
        setLoading(false);
      }
    };

    if (resumeId) {
      fetchResume();
    }
  }, [resumeId]);

  return { resume, template, loading };
}

// Usage
function ResumeView({ resumeId }) {
  const { resume, template, loading } = useResumeWithTemplate(resumeId);

  if (loading) return <div>Loading...</div>;
  if (!resume) return <div>Resume not found</div>;

  // Render based on template
  const TemplateComponent = getTemplateComponent(template);
  return <TemplateComponent resume={resume} />;
}

function getTemplateComponent(templateCode) {
  const templates = {
    'template1': Template1,
    'template2': Template2,
    'template3': Template3,
  };
  return templates[templateCode] || Template1;
}
```

### 9.4 Update Template for Existing Resume

```javascript
const updateResumeTemplate = async (resumeId, newTemplate) => {
  try {
    const response = await fetch(`http://localhost:5000/api/resumes/${resumeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        template: newTemplate
      })
    });

    const data = await response.json();
    
    if (data.success) {
      // Refresh the resume display with new template
      return data.data.resume;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error updating template:', error);
    throw error;
  }
};

// Usage in component
function ResumeTemplateSelector({ resumeId, currentTemplate, onTemplateChange }) {
  const [selectedTemplate, setSelectedTemplate] = useState(currentTemplate);
  const [updating, setUpdating] = useState(false);

  const handleTemplateChange = async (newTemplate) => {
    setUpdating(true);
    try {
      await updateResumeTemplate(resumeId, newTemplate);
      setSelectedTemplate(newTemplate);
      onTemplateChange(newTemplate);
    } catch (error) {
      alert('Failed to update template');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <select
      value={selectedTemplate}
      onChange={(e) => handleTemplateChange(e.target.value)}
      disabled={updating}
    >
      <option value="template1">Classic</option>
      <option value="template2">Modern</option>
      <option value="template3">Creative</option>
    </select>
  );
}
```

---

## 10. Error Handling

### Common Errors

#### 400 - Bad Request
```json
{
  "success": false,
  "message": "Please provide name, email, phone, and summary"
}
```

#### 404 - Resume Not Found
```json
{
  "success": false,
  "message": "Resume not found"
}
```

#### 500 - Server Error
```json
{
  "success": false,
  "message": "Server error"
}
```

### Error Handling Example

```javascript
const createResumeWithErrorHandling = async (resumeData, templateCode) => {
  try {
    const response = await fetch('http://localhost:5000/api/resumes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...resumeData,
        template: templateCode || 'template1'
      })
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle different error status codes
      switch (response.status) {
        case 400:
          throw new Error('Invalid data: ' + data.message);
        case 500:
          throw new Error('Server error: ' + data.message);
        default:
          throw new Error(data.message || 'Unknown error');
      }
    }

    if (!data.success) {
      throw new Error(data.message);
    }

    return data.data.resume;
  } catch (error) {
    console.error('Error creating resume:', error);
    // Show user-friendly error message
    alert('Failed to create resume: ' + error.message);
    throw error;
  }
};
```

---

## Best Practices

1. **Always Include Template**: When creating a resume, always include the `template` field to ensure proper display
2. **Default Template**: If no template is specified, the system defaults to `"template1"`. Make sure your frontend handles this default
3. **Template Validation**: Validate template codes on the frontend before sending to the API
4. **Template Consistency**: Use consistent template naming across your frontend (e.g., `"template1"`, `"template2"`, etc.)
5. **Template Updates**: Allow users to change templates for existing resumes using the update endpoint
6. **Error Handling**: Always handle cases where a template might be missing or invalid
7. **Template Preview**: Consider showing a preview of the selected template before creating the resume

---

## Migration Notes

### For Existing Resumes

If you have existing resumes in your database without the `template` field:
- They will automatically have `template: "template1"` as the default
- You can update them using the PUT endpoint to assign different templates
- No migration script is needed - the default value handles this automatically

### Updating Existing Frontend Code

1. **Update Create Forms**: Add template selection to all resume creation forms
2. **Update Display Logic**: Modify resume display components to use `resume.template`
3. **Update Fetch Calls**: Ensure all API calls that create resumes include the `template` field
4. **Add Template Selector**: Create a template selector component for users to choose templates

---

## Summary

The template feature is now fully integrated into all resume endpoints:

✅ **Create Resume** - `POST /api/resumes` - Accepts `template` field  
✅ **Update Resume** - `PUT /api/resumes/:id` - Accepts `template` field  
✅ **Get All Resumes** - `GET /api/resumes` - Returns `template` field  
✅ **Get Resume by ID** - `GET /api/resumes/:id` - Returns `template` field  
✅ **Get Resumes by User** - `GET /api/resumes/user/:userId` - Returns `template` field  
✅ **Generate from Prompt** - `POST /api/ai/generate-resume` - Accepts `template` field  
✅ **Update from Prompt** - `PUT /api/ai/update-resume/:id` - Accepts `template` field  
✅ **AI Routes** - All AI routes that create resumes accept `template` field  

All endpoints now support the template feature, and all GET endpoints return the template information so your frontend can display resumes with the correct template.

---

**Last Updated:** 2024-01-01  
**API Version:** 1.1.0  
**Feature:** Template Support

