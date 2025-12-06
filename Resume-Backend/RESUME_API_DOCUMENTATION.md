# Resume API Documentation

## Base URL
```
http://localhost:5000/api/resumes
```

---

## Endpoints

### 1. Create Resume
**POST** `/api/resumes`

Creates a new resume in the database.

#### Request Headers
```
Content-Type: application/json
```

#### Request Body (JSON)
```json
{
  "userId": "optional_user_id_here",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1-234-567-8900",
  "summary": "Experienced Full-Stack Developer with 5+ years of experience in building scalable web applications. Proficient in JavaScript, React, Node.js, and cloud technologies.",
  "education": [
    {
      "degree": "Bachelor of Science in Computer Science",
      "institution": "University of California, Berkeley",
      "year": 2018,
      "gpa": "3.8"
    },
    {
      "degree": "Master of Science in Software Engineering",
      "institution": "Stanford University",
      "year": 2020,
      "gpa": "3.9"
    }
  ],
  "experience": [
    {
      "title": "Senior Full-Stack Developer",
      "company": "Tech Corp Inc.",
      "startDate": "2021-06-01",
      "endDate": "2024-12-01",
      "current": false,
      "description": "Led development of microservices architecture, improved application performance by 40%, mentored junior developers, and implemented CI/CD pipelines."
    },
    {
      "title": "Software Engineer",
      "company": "StartUp XYZ",
      "startDate": "2020-01-15",
      "endDate": null,
      "current": true,
      "description": "Developing and maintaining web applications using React and Node.js, collaborating with cross-functional teams to deliver high-quality software."
    }
  ],
  "skills": [
    {
      "name": "JavaScript",
      "level": "Expert"
    },
    {
      "name": "React.js",
      "level": "Expert"
    },
    {
      "name": "Node.js",
      "level": "Advanced"
    },
    {
      "name": "MongoDB",
      "level": "Advanced"
    },
    {
      "name": "AWS",
      "level": "Intermediate"
    },
    {
      "name": "Docker",
      "level": "Intermediate"
    }
  ],
  "projects": [
    {
      "name": "E-Commerce Platform",
      "description": "Built a full-featured e-commerce platform with payment integration, inventory management, and admin dashboard.",
      "technologies": ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
      "url": "https://ecommerce-demo.com",
      "github": "https://github.com/johndoe/ecommerce-platform"
    },
    {
      "name": "Real-Time Chat Application",
      "description": "Developed a real-time chat application with WebSocket support, file sharing, and group messaging features.",
      "technologies": ["Socket.io", "Express", "React", "Redis"],
      "url": "https://chat-app-demo.com",
      "github": "https://github.com/johndoe/chat-app"
    }
  ]
}
```

#### Response (Success - 201)
```json
{
  "success": true,
  "message": "Resume created successfully",
  "data": {
    "resume": {
      "_id": "6123456789abcdef12345678",
      "userId": null,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+1-234-567-8900",
      "summary": "Experienced Full-Stack Developer...",
      "education": [...],
      "experience": [...],
      "skills": [...],
      "projects": [...],
      "createdAt": "2024-10-25T12:00:00.000Z",
      "updatedAt": "2024-10-25T12:00:00.000Z"
    }
  }
}
```

#### Response (Error - 400)
```json
{
  "success": false,
  "message": "Please provide name, email, phone, and summary"
}
```

---

### 2. Get All Resumes
**GET** `/api/resumes`

Retrieves all resumes from the database.

#### Response (Success - 200)
```json
{
  "success": true,
  "count": 2,
  "data": {
    "resumes": [
      {
        "_id": "6123456789abcdef12345678",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "+1-234-567-8900",
        "summary": "Experienced Full-Stack Developer...",
        "education": [...],
        "experience": [...],
        "skills": [...],
        "projects": [...],
        "createdAt": "2024-10-25T12:00:00.000Z",
        "updatedAt": "2024-10-25T12:00:00.000Z"
      }
    ]
  }
}
```

---

### 3. Get Resume by ID
**GET** `/api/resumes/:id`

Retrieves a specific resume by its ID.

#### URL Parameters
- `id` (required) - MongoDB ObjectId of the resume

#### Example Request
```
GET http://localhost:5000/api/resumes/6123456789abcdef12345678
```

#### Response (Success - 200)
```json
{
  "success": true,
  "data": {
    "resume": {
      "_id": "6123456789abcdef12345678",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+1-234-567-8900",
      "summary": "Experienced Full-Stack Developer...",
      "education": [...],
      "experience": [...],
      "skills": [...],
      "projects": [...],
      "createdAt": "2024-10-25T12:00:00.000Z",
      "updatedAt": "2024-10-25T12:00:00.000Z"
    }
  }
}
```

#### Response (Error - 404)
```json
{
  "success": false,
  "message": "Resume not found"
}
```

---

### 4. Get Resumes by User ID
**GET** `/api/resumes/user/:userId`

Retrieves all resumes for a specific user.

#### URL Parameters
- `userId` (required) - MongoDB ObjectId of the user

#### Example Request
```
GET http://localhost:5000/api/resumes/user/507f1f77bcf86cd799439011
```

#### Response (Success - 200)
```json
{
  "success": true,
  "count": 3,
  "data": {
    "resumes": [
      {
        "_id": "6123456789abcdef12345678",
        "userId": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "+1-234-567-8900",
        "summary": "Experienced Full-Stack Developer...",
        "education": [...],
        "experience": [...],
        "skills": [...],
        "projects": [...],
        "createdAt": "2024-10-25T12:00:00.000Z",
        "updatedAt": "2024-10-25T12:00:00.000Z"
      }
    ]
  }
}
```

---

### 5. Update Resume
**PUT** `/api/resumes/:id`

Updates an existing resume. You can update any field(s) individually or all at once.

#### URL Parameters
- `id` (required) - MongoDB ObjectId of the resume

#### Request Headers
```
Content-Type: application/json
```

#### Request Body (Partial Update Example)
```json
{
  "phone": "+1-555-123-4567",
  "summary": "Updated summary with 6+ years of experience...",
  "skills": [
    {
      "name": "TypeScript",
      "level": "Expert"
    },
    {
      "name": "GraphQL",
      "level": "Advanced"
    }
  ]
}
```

#### Request Body (Full Update Example)
```json
{
  "name": "John Doe",
  "email": "john.doe@newemail.com",
  "phone": "+1-555-123-4567",
  "summary": "Senior Full-Stack Developer with 6+ years of experience...",
  "education": [
    {
      "degree": "Bachelor of Science in Computer Science",
      "institution": "University of California, Berkeley",
      "year": 2018,
      "gpa": "3.8"
    }
  ],
  "experience": [
    {
      "title": "Lead Software Engineer",
      "company": "Tech Corp Inc.",
      "startDate": "2024-01-01",
      "endDate": null,
      "current": true,
      "description": "Leading a team of 5 developers in building scalable applications..."
    }
  ],
  "skills": [
    {
      "name": "TypeScript",
      "level": "Expert"
    }
  ],
  "projects": [
    {
      "name": "New Project",
      "description": "Latest project description",
      "technologies": ["React", "TypeScript"],
      "url": "https://newproject.com",
      "github": "https://github.com/johndoe/newproject"
    }
  ]
}
```

#### Response (Success - 200)
```json
{
  "success": true,
  "message": "Resume updated successfully",
  "data": {
    "resume": {
      "_id": "6123456789abcdef12345678",
      "name": "John Doe",
      "email": "john.doe@newemail.com",
      "phone": "+1-555-123-4567",
      "summary": "Senior Full-Stack Developer...",
      "education": [...],
      "experience": [...],
      "skills": [...],
      "projects": [...],
      "createdAt": "2024-10-25T12:00:00.000Z",
      "updatedAt": "2024-10-25T13:30:00.000Z"
    }
  }
}
```

#### Response (Error - 404)
```json
{
  "success": false,
  "message": "Resume not found"
}
```

---

### 6. Delete Resume
**DELETE** `/api/resumes/:id`

Deletes a resume from the database.

#### URL Parameters
- `id` (required) - MongoDB ObjectId of the resume

#### Example Request
```
DELETE http://localhost:5000/api/resumes/6123456789abcdef12345678
```

#### Response (Success - 200)
```json
{
  "success": true,
  "message": "Resume deleted successfully"
}
```

#### Response (Error - 404)
```json
{
  "success": false,
  "message": "Resume not found"
}
```

---

## Schema Details

### Required Fields
- `name` (String) - Full name of the candidate
- `email` (String) - Email address
- `phone` (String) - Phone number
- `summary` (String) - Professional summary/objective

### Optional Fields
- `userId` (ObjectId) - Reference to User (optional for now)
- `education` (Array) - Educational background
- `experience` (Array) - Work experience
- `skills` (Array) - Technical and soft skills
- `projects` (Array) - Portfolio projects

### Education Object Structure
```json
{
  "degree": "String (required)",
  "institution": "String (required)",
  "year": "Number (required)",
  "gpa": "String (optional)"
}
```

### Experience Object Structure
```json
{
  "title": "String (required)",
  "company": "String (required)",
  "startDate": "Date (required) - ISO 8601 format",
  "endDate": "Date (optional) - ISO 8601 format or null if current",
  "current": "Boolean (default: false)",
  "description": "String (required)"
}
```

### Skills Object Structure
```json
{
  "name": "String (required)",
  "level": "String (optional) - One of: Beginner, Intermediate, Advanced, Expert"
}
```

### Projects Object Structure
```json
{
  "name": "String (required)",
  "description": "String (required)",
  "technologies": ["Array of Strings"],
  "url": "String (optional)",
  "github": "String (optional)"
}
```

---

## Minimal Example for Quick Testing

If you want to quickly test the API with minimal data:

```json
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "phone": "+1-987-654-3210",
  "summary": "Software developer with passion for creating elegant solutions to complex problems."
}
```

This will create a resume with only the required fields. You can add education, experience, skills, and projects later using the UPDATE endpoint.

---

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Name is required",
    "Email is required"
  ]
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Server error"
}
```

---

## JavaScript/TypeScript Frontend Examples

### Example: Create Resume with Fetch API
```javascript
const createResume = async (resumeData) => {
  try {
    const response = await fetch('http://localhost:5000/api/resumes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resumeData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Resume created:', result.data.resume);
      return result.data.resume;
    } else {
      console.error('Error:', result.message);
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Failed to create resume:', error);
    throw error;
  }
};

// Usage
const newResume = {
  name: "John Doe",
  email: "john@example.com",
  phone: "+1-234-567-8900",
  summary: "Experienced developer...",
  skills: [
    { name: "JavaScript", level: "Expert" }
  ]
};

createResume(newResume);
```

### Example: Get All Resumes with Axios
```javascript
import axios from 'axios';

const getAllResumes = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/resumes');
    console.log('Resumes:', response.data.data.resumes);
    return response.data.data.resumes;
  } catch (error) {
    console.error('Error fetching resumes:', error);
    throw error;
  }
};
```

### Example: Update Resume
```javascript
const updateResume = async (resumeId, updates) => {
  try {
    const response = await fetch(`http://localhost:5000/api/resumes/${resumeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates)
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Resume updated:', result.data.resume);
      return result.data.resume;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Failed to update resume:', error);
    throw error;
  }
};

// Usage - Update only phone and summary
updateResume('6123456789abcdef12345678', {
  phone: '+1-555-999-8888',
  summary: 'Updated professional summary...'
});
```

### Example: Delete Resume
```javascript
const deleteResume = async (resumeId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/resumes/${resumeId}`, {
      method: 'DELETE'
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Resume deleted successfully');
      return true;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error('Failed to delete resume:', error);
    throw error;
  }
};
```

---

## React Hook Example

```javascript
import { useState, useEffect } from 'react';

const useResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const API_URL = 'http://localhost:5000/api/resumes';
  
  const fetchResumes = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (data.success) {
        setResumes(data.data.resumes);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const createResume = async (resumeData) => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resumeData)
      });
      const data = await response.json();
      if (data.success) {
        setResumes([...resumes, data.data.resume]);
        return data.data.resume;
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const updateResume = async (id, updates) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      const data = await response.json();
      if (data.success) {
        setResumes(resumes.map(r => r._id === id ? data.data.resume : r));
        return data.data.resume;
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const deleteResume = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        setResumes(resumes.filter(r => r._id !== id));
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchResumes();
  }, []);
  
  return {
    resumes,
    loading,
    error,
    createResume,
    updateResume,
    deleteResume,
    refetch: fetchResumes
  };
};

export default useResumes;
```

---

## Notes

- **userId is now optional** - You can create and save resumes without a userId
- All dates should be in ISO 8601 format: `YYYY-MM-DD` or `YYYY-MM-DDTHH:mm:ss.sssZ`
- Array fields (education, experience, skills, projects) are optional but should be sent as empty arrays `[]` if not used
- The API automatically filters out incomplete array items (e.g., education entries missing required fields)
- All string fields are automatically trimmed
- Email addresses are automatically converted to lowercase
- The API includes timestamps (`createdAt` and `updatedAt`) for each resume

