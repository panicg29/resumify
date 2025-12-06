# 📄 File to Resume - Frontend Implementation Guide

## 🎯 Overview

Upload a PDF or image file → Backend extracts text with OCR → AI parses it → Resume saved to database

**One API call does everything automatically!** ⚡

---

## 🚀 API Endpoint

```
POST http://localhost:5000/api/ocr/file
```

**What it does automatically:**
1. ✅ Receives file upload (PDF, JPEG, PNG, GIF, BMP, TIFF)
2. ✅ Extracts text using OCR (OCR.Space API)
3. ✅ Parses text with AI (OpenAI GPT-4)
4. ✅ Creates and saves structured resume to database
5. ✅ Returns the created resume object

---

## 📋 API Documentation

### Endpoint
```
POST /api/ocr/file
```

### Request Format
- **Content-Type**: `multipart/form-data`
- **Method**: `POST`

### Request Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | File | Yes | Resume file (PDF or image) |
| `userId` | String | No | User ID to associate with resume |
| `template` | String | No | Template name (default: "template1") |
| `language` | String | No | OCR language code (default: "eng") |
| `OCREngine` | Number | No | OCR engine 1 or 2 (default: 2) |

### Supported File Types
- **Documents**: PDF
- **Images**: JPEG, JPG, PNG, GIF, BMP, TIFF

### File Requirements
- **Max Size**: 10MB
- **Format**: Must contain readable resume text

### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Resume created successfully from file",
  "data": {
    "resume": {
      "_id": "692b65eb915f596fc6f02ec2",
      "name": "Francisco Andrade",
      "email": "hello@reallygreatsite.com",
      "phone": "+123-456-7890",
      "summary": "Experienced Marketing Manager...",
      "education": [...],
      "experience": [...],
      "skills": [...],
      "projects": [...],
      "template": "template1",
      "createdAt": "2025-11-29T21:30:19.226Z",
      "updatedAt": "2025-11-29T21:30:19.226Z"
    }
  }
}
```

### Error Response (400/500)

```json
{
  "success": false,
  "message": "Failed to create resume from file",
  "error": "Error description here"
}
```

---

## 💻 Implementation Examples

### React Component (Complete)

```jsx
import React, { useState } from 'react';

function FileResumeUploader() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (!selectedFile) {
      setFile(null);
      return;
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/bmp',
      'image/tiff'
    ];
    
    if (!allowedTypes.includes(selectedFile.type)) {
      setError('Please select a PDF or image file (JPEG, PNG, GIF, BMP, TIFF)');
      setFile(null);
      return;
    }
    
    // Validate file size (10MB max)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      setFile(null);
      return;
    }
    
    setFile(selectedFile);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError(null);
    setResume(null);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('file', file);
      
      // Optional: Add userId if available
      const userId = localStorage.getItem('userId'); // or from context/auth
      if (userId) {
        formData.append('userId', userId);
      }
      
      // Optional: Add template preference
      formData.append('template', 'template1');

      // Upload to backend
      const response = await fetch('http://localhost:5000/api/ocr/file', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResume(data.data.resume);
        console.log('✅ Resume created:', data.data.resume);
      } else {
        setError(data.error || data.message || 'Failed to create resume');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="file-uploader" style={{ padding: '20px' }}>
      <h2>📄 Upload Resume File</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.gif,.bmp,.tiff"
          onChange={handleFileChange}
          disabled={loading}
          style={{ marginBottom: '10px' }}
        />
        
        {file && (
          <p style={{ color: '#666' }}>
            Selected: <strong>{file.name}</strong> ({(file.size / 1024).toFixed(2)} KB)
          </p>
        )}
      </div>
      
      <button 
        onClick={handleUpload} 
        disabled={!file || loading}
        style={{
          padding: '10px 20px',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? '⏳ Processing...' : '🚀 Upload & Create Resume'}
      </button>
      
      {error && (
        <div style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#fee',
          color: '#c33',
          borderRadius: '4px'
        }}>
          ❌ {error}
        </div>
      )}
      
      {resume && (
        <div style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#efe',
          borderRadius: '4px'
        }}>
          <h3 style={{ color: '#060' }}>✅ Resume Created Successfully!</h3>
          
          <div style={{ marginTop: '15px' }}>
            <p><strong>Name:</strong> {resume.name}</p>
            <p><strong>Email:</strong> {resume.email}</p>
            <p><strong>Phone:</strong> {resume.phone}</p>
            <p><strong>Resume ID:</strong> {resume._id}</p>
            {resume.education && resume.education.length > 0 && (
              <p><strong>Education:</strong> {resume.education.length} entry(s)</p>
            )}
            {resume.experience && resume.experience.length > 0 && (
              <p><strong>Experience:</strong> {resume.experience.length} entry(s)</p>
            )}
            {resume.skills && resume.skills.length > 0 && (
              <p><strong>Skills:</strong> {resume.skills.length} skill(s)</p>
            )}
          </div>
          
          <button 
            onClick={() => window.location.href = `/resumes/${resume._id}`}
            style={{
              marginTop: '15px',
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            View Full Resume
          </button>
          
          <details style={{ marginTop: '15px' }}>
            <summary style={{ cursor: 'pointer', color: '#007bff' }}>
              View Full Resume Data
            </summary>
            <pre style={{
              marginTop: '10px',
              padding: '10px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              overflow: 'auto',
              maxHeight: '400px'
            }}>
              {JSON.stringify(resume, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}

export default FileResumeUploader;
```

---

### React Hook (Reusable)

```jsx
import { useState } from 'react';

function useFileResumeUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadFile = async (file, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      // Validate file
      const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/bmp',
        'image/tiff'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Please upload PDF or image file.');
      }

      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size must be less than 10MB');
      }

      // Create FormData
      const formData = new FormData();
      formData.append('file', file);
      
      if (options.userId) {
        formData.append('userId', options.userId);
      }
      
      if (options.template) {
        formData.append('template', options.template);
      }
      
      if (options.language) {
        formData.append('language', options.language);
      }

      // Upload
      const response = await fetch('http://localhost:5000/api/ocr/file', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        return {
          success: true,
          resume: data.data.resume
        };
      } else {
        throw new Error(data.error || data.message || 'Failed to create resume');
      }
    } catch (err) {
      const errorMessage = err.message || 'Network error. Please try again.';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  return { uploadFile, loading, error };
}

// Usage in component
function MyComponent() {
  const { uploadFile, loading, error } = useFileResumeUpload();

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const result = await uploadFile(file, {
        userId: 'user123',
        template: 'template1'
      });
      
      if (result.success) {
        console.log('Resume created:', result.resume);
        // Navigate to resume page or update state
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileSelect} disabled={loading} />
      {loading && <p>Processing...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
```

---

### Pure JavaScript (Fetch API)

```javascript
async function uploadFileResume(file, options = {}) {
  try {
    // Validate file
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/bmp',
      'image/tiff'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Please upload PDF or image file.');
    }

    if (file.size > 10 * 1024 * 1024) {
      throw new Error('File size must be less than 10MB');
    }

    // Create FormData
    const formData = new FormData();
    formData.append('file', file);
    
    if (options.userId) {
      formData.append('userId', options.userId);
    }
    
    if (options.template) {
      formData.append('template', options.template);
    }
    
    if (options.language) {
      formData.append('language', options.language);
    }

    // Upload
    const response = await fetch('http://localhost:5000/api/ocr/file', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      return {
        success: true,
        resume: data.data.resume
      };
    } else {
      throw new Error(data.error || data.message || 'Failed to create resume');
    }
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: error.message || 'Network error. Please try again.'
    };
  }
}

// Usage
document.getElementById('fileInput').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (file) {
    const result = await uploadFileResume(file, {
      userId: 'user123',
      template: 'template1'
    });
    
    if (result.success) {
      console.log('✅ Resume created:', result.resume);
      alert(`Resume created for ${result.resume.name}`);
      // Redirect or update UI
      window.location.href = `/resumes/${result.resume._id}`;
    } else {
      alert(`❌ Failed: ${result.error}`);
    }
  }
});
```

---

### Axios Version

```javascript
import axios from 'axios';

async function uploadFileResume(file, options = {}) {
  try {
    // Validate file
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/bmp',
      'image/tiff'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Please upload PDF or image file.');
    }

    if (file.size > 10 * 1024 * 1024) {
      throw new Error('File size must be less than 10MB');
    }

    // Create FormData
    const formData = new FormData();
    formData.append('file', file);
    
    if (options.userId) {
      formData.append('userId', options.userId);
    }
    
    if (options.template) {
      formData.append('template', options.template);
    }

    // Upload with progress tracking
    const response = await axios.post(
      'http://localhost:5000/api/ocr/file',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Upload progress: ${percentCompleted}%`);
          // Update progress bar in UI if needed
        }
      }
    );

    if (response.data.success) {
      return {
        success: true,
        resume: response.data.data.resume
      };
    } else {
      throw new Error(response.data.error || response.data.message);
    }
  } catch (error) {
    if (error.response) {
      // Server responded with error
      return {
        success: false,
        error: error.response.data.error || error.response.data.message || 'Server error'
      };
    } else if (error.request) {
      // Request made but no response
      return {
        success: false,
        error: 'Network error. Please check your connection.'
      };
    } else {
      // Error in request setup
      return {
        success: false,
        error: error.message || 'An error occurred'
      };
    }
  }
}

// Usage
const result = await uploadFileResume(file, {
  userId: 'user123',
  template: 'template1'
});

if (result.success) {
  console.log('Resume:', result.resume);
} else {
  console.error('Error:', result.error);
}
```

---

## 🎨 Complete UI Component with Drag & Drop

```jsx
import React, { useState, useRef } from 'react';

function DragDropResumeUploader() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const validateFile = (selectedFile) => {
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/bmp',
      'image/tiff'
    ];
    
    if (!allowedTypes.includes(selectedFile.type)) {
      setError('Invalid file type. Please upload PDF or image file.');
      return false;
    }
    
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return false;
    }
    
    return true;
  };

  const handleFileSelect = (selectedFile) => {
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setResume(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const userId = localStorage.getItem('userId');
      if (userId) {
        formData.append('userId', userId);
      }

      const response = await fetch('http://localhost:5000/api/ocr/file', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResume(data.data.resume);
      } else {
        setError(data.error || data.message || 'Failed to create resume');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>📄 Upload Resume</h2>
      
      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${isDragging ? '#007bff' : '#ccc'}`,
          borderRadius: '8px',
          padding: '40px',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: isDragging ? '#f0f8ff' : '#f9f9f9',
          transition: 'all 0.3s ease'
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.gif,.bmp,.tiff"
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />
        
        {file ? (
          <div>
            <p>✅ <strong>{file.name}</strong></p>
            <p style={{ color: '#666' }}>
              {(file.size / 1024).toFixed(2)} KB
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
              style={{
                marginTop: '10px',
                padding: '5px 15px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Remove
            </button>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '48px', margin: '0' }}>📄</p>
            <p>
              <strong>Click to upload</strong> or drag and drop
            </p>
            <p style={{ color: '#666', fontSize: '14px' }}>
              PDF, JPEG, PNG, GIF, BMP, or TIFF (max 10MB)
            </p>
          </div>
        )}
      </div>

      {/* Upload Button */}
      {file && (
        <button
          onClick={handleUpload}
          disabled={loading}
          style={{
            width: '100%',
            marginTop: '20px',
            padding: '12px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '⏳ Processing...' : '🚀 Create Resume'}
        </button>
      )}

      {/* Error Message */}
      {error && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#fee',
          color: '#c33',
          borderRadius: '4px',
          border: '1px solid #fcc'
        }}>
          ❌ {error}
        </div>
      )}

      {/* Success Message */}
      {resume && (
        <div style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#efe',
          borderRadius: '4px',
          border: '1px solid #cfc'
        }}>
          <h3 style={{ color: '#060', marginTop: '0' }}>
            ✅ Resume Created Successfully!
          </h3>
          <p><strong>Name:</strong> {resume.name}</p>
          <p><strong>Email:</strong> {resume.email}</p>
          <p><strong>Resume ID:</strong> {resume._id}</p>
          
          <button
            onClick={() => window.location.href = `/resumes/${resume._id}`}
            style={{
              marginTop: '15px',
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            View Resume
          </button>
        </div>
      )}
    </div>
  );
}

export default DragDropResumeUploader;
```

---

## 🔧 Error Handling

### Common Error Scenarios

```javascript
try {
  const result = await uploadFileResume(file);
  
  if (result.success) {
    // Success
    console.log('Resume created:', result.resume);
  } else {
    // Handle different error types
    switch (result.error) {
      case 'Invalid file type':
        // Show file type error message
        break;
      case 'File size exceeds the 10MB limit':
        // Show file size error message
        break;
      case 'OCR_SPACE_API_KEY is not set':
        // Backend configuration error
        break;
      case 'OPENAI_API_KEY is not set':
        // Backend configuration error
        break;
      default:
        // Generic error
    }
  }
} catch (error) {
  // Network or other errors
  console.error('Upload failed:', error);
}
```

---

## 📝 Quick Reference

| Property | Value |
|----------|-------|
| **Endpoint** | `POST http://localhost:5000/api/ocr/file` |
| **Method** | POST |
| **Content-Type** | `multipart/form-data` |
| **File Field** | `file` |
| **Max File Size** | 10MB |
| **Supported Formats** | PDF, JPEG, PNG, GIF, BMP, TIFF |
| **Response Format** | JSON with `resume` object |
| **Processing Time** | 5-30 seconds |

---

## 🎯 Migration from Old Endpoint

If you're migrating from the old PDF endpoint, here's what changed:

### Old Endpoint (Deprecated)
```
POST /api/ai/process-pdf-complete
Body: { pdf: file }
```

### New Endpoint (Current)
```
POST /api/ocr/file
Body: { file: file }
```

### Changes Required

1. **Change endpoint URL**:
   ```javascript
   // Old
   'http://localhost:5000/api/ai/process-pdf-complete'
   
   // New
   'http://localhost:5000/api/ocr/file'
   ```

2. **Change field name**:
   ```javascript
   // Old
   formData.append('pdf', file);
   
   // New
   formData.append('file', file);
   ```

3. **Update file type validation**:
   ```javascript
   // Old - PDF only
   accept=".pdf"
   
   // New - PDF and images
   accept=".pdf,.jpg,.jpeg,.png,.gif,.bmp,.tiff"
   ```

4. **Response structure**:
   - Old response included: `extractedText`, `fileInfo`, `rawResponse`
   - New response includes: `resume` only (cleaner)

---

## ✅ Complete Working Example (HTML)

```html
<!DOCTYPE html>
<html>
<head>
  <title>File Resume Uploader</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
    .upload-area {
      border: 2px dashed #ccc;
      border-radius: 8px;
      padding: 40px;
      text-align: center;
      cursor: pointer;
      background: #f9f9f9;
    }
    .upload-area:hover { border-color: #007bff; background: #f0f8ff; }
    .upload-area.dragging { border-color: #007bff; background: #e7f3ff; }
    button {
      width: 100%;
      padding: 12px;
      margin-top: 20px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }
    button:disabled { background: #ccc; cursor: not-allowed; }
    .error { margin-top: 20px; padding: 15px; background: #fee; color: #c33; border-radius: 4px; }
    .success { margin-top: 20px; padding: 20px; background: #efe; border-radius: 4px; }
    #fileInput { display: none; }
  </style>
</head>
<body>
  <h1>📄 Upload Resume File</h1>
  
  <div class="upload-area" id="uploadArea">
    <p>📄</p>
    <p><strong>Click to upload</strong> or drag and drop</p>
    <p style="color: #666; font-size: 14px;">PDF, JPEG, PNG, GIF, BMP, or TIFF (max 10MB)</p>
    <input type="file" id="fileInput" accept=".pdf,.jpg,.jpeg,.png,.gif,.bmp,.tiff">
  </div>
  
  <div id="fileInfo"></div>
  <button id="uploadBtn" disabled>Upload File</button>
  <div id="result"></div>

  <script>
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInfo = document.getElementById('fileInfo');
    const result = document.getElementById('result');
    
    let selectedFile = null;

    uploadArea.addEventListener('click', () => fileInput.click());

    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('dragging');
    });

    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('dragging');
    });

    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('dragging');
      const file = e.dataTransfer.files[0];
      if (file) handleFileSelect(file);
    });

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) handleFileSelect(file);
    });

    function handleFileSelect(file) {
      const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/bmp',
        'image/tiff'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        result.innerHTML = '<div class="error">❌ Invalid file type. Please upload PDF or image file.</div>';
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        result.innerHTML = '<div class="error">❌ File size must be less than 10MB</div>';
        return;
      }
      
      selectedFile = file;
      fileInfo.innerHTML = `<p>✅ Selected: <strong>${file.name}</strong> (${(file.size / 1024).toFixed(2)} KB)</p>`;
      uploadBtn.disabled = false;
      result.innerHTML = '';
    }

    uploadBtn.addEventListener('click', async () => {
      if (!selectedFile) return;

      uploadBtn.disabled = true;
      result.innerHTML = '<p>⏳ Processing...</p>';

      try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await fetch('http://localhost:5000/api/ocr/file', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (data.success) {
          const resume = data.data.resume;
          result.innerHTML = `
            <div class="success">
              <h3>✅ Resume Created Successfully!</h3>
              <p><strong>Name:</strong> ${resume.name}</p>
              <p><strong>Email:</strong> ${resume.email}</p>
              <p><strong>Resume ID:</strong> ${resume._id}</p>
              <button onclick="window.location.href='/resumes/${resume._id}'">
                View Resume
              </button>
            </div>
          `;
        } else {
          result.innerHTML = `<div class="error">❌ ${data.error || data.message}</div>`;
        }
      } catch (error) {
        result.innerHTML = '<div class="error">❌ Network error. Please try again.</div>';
      } finally {
        uploadBtn.disabled = false;
      }
    });
  </script>
</body>
</html>
```

---

**🎉 That's it! Your frontend is ready to upload files and create resumes automatically!**

