# 📄 PDF to Resume - Frontend Implementation Guide

## 🎯 Overview

Upload a PDF resume → Backend extracts text → AI parses it → Resume saved to database

**One API call does everything!** ⚡

---

## 🚀 Quick Implementation (Recommended)

### **Single API Endpoint - Complete Workflow**

```
POST http://localhost:5000/api/ai/process-pdf-complete
```

**What it does:**
1. ✅ Uploads PDF file
2. ✅ Extracts text (supports text-based AND image-based PDFs)
3. ✅ Parses text with AI (OpenAI GPT-4)
4. ✅ Saves resume to database
5. ✅ Returns complete resume data

---

## 📋 Implementation

### **Option 1: React Component (Complete)**

```jsx
import React, { useState } from 'react';

function PdfResumeUploader() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    // Validate file type
    if (selectedFile && selectedFile.type !== 'application/pdf') {
      setError('Please select a PDF file');
      setFile(null);
      return;
    }
    
    // Validate file size (10MB max)
    if (selectedFile && selectedFile.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      setFile(null);
      return;
    }
    
    setFile(selectedFile);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a PDF file');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('pdf', file);
      formData.append('userId', 'optional_user_id_here'); // Optional for now

      // Upload to backend
      const response = await fetch(
        'http://localhost:5000/api/ai/process-pdf-complete',
        {
          method: 'POST',
          body: formData,
          // Do NOT set Content-Type header - browser sets it automatically with boundary
        }
      );

      const data = await response.json();

      if (data.success) {
        setResult(data);
        alert(`✅ Resume created for ${data.data.resume.name}`);
        console.log('Resume data:', data.data.resume);
      } else {
        setError(data.message);
        alert(`❌ Failed: ${data.message}`);
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Cannot connect to backend. Is server running?');
      alert('❌ Upload failed. Check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pdf-uploader">
      <h2>📄 Upload Resume PDF</h2>
      
      <input
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleFileChange}
        disabled={loading}
      />
      
      {file && (
        <p>Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)</p>
      )}
      
      <button 
        onClick={handleUpload} 
        disabled={!file || loading}
      >
        {loading ? '⏳ Processing...' : '🚀 Upload & Process'}
      </button>
      
      {error && (
        <div className="error" style={{color: 'red'}}>
          ❌ {error}
        </div>
      )}
      
      {result && (
        <div className="success" style={{color: 'green'}}>
          <h3>✅ Resume Created Successfully!</h3>
          <p><strong>Name:</strong> {result.data.resume.name}</p>
          <p><strong>Email:</strong> {result.data.resume.email}</p>
          <p><strong>Resume ID:</strong> {result.data.resume._id}</p>
          
          <details>
            <summary>View Full Resume Data</summary>
            <pre>{JSON.stringify(result.data.resume, null, 2)}</pre>
          </details>
        </div>
      )}
    </div>
  );
}

export default PdfResumeUploader;
```

---

### **Option 2: Pure JavaScript (Fetch API)**

```javascript
async function uploadPdfResume(pdfFile, userId = null) {
  try {
    // Validate file
    if (!pdfFile || pdfFile.type !== 'application/pdf') {
      throw new Error('Please provide a valid PDF file');
    }

    if (pdfFile.size > 10 * 1024 * 1024) {
      throw new Error('File size must be less than 10MB');
    }

    // Create FormData
    const formData = new FormData();
    formData.append('pdf', pdfFile);
    if (userId) {
      formData.append('userId', userId);
    }

    // Upload
    const response = await fetch(
      'http://localhost:5000/api/ai/process-pdf-complete',
      {
        method: 'POST',
        body: formData
      }
    );

    const data = await response.json();

    if (data.success) {
      console.log('✅ Resume created:', data.data.resume);
      return { success: true, resume: data.data.resume };
    } else {
      console.error('❌ Upload failed:', data.message);
      return { success: false, error: data.message };
    }
  } catch (error) {
    console.error('Upload error:', error);
    return { success: false, error: error.message };
  }
}

// Usage with file input
document.getElementById('fileInput').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (file) {
    const result = await uploadPdfResume(file);
    if (result.success) {
      alert(`Resume created for ${result.resume.name}`);
    } else {
      alert(`Failed: ${result.error}`);
    }
  }
});
```

---

### **Option 3: Axios Version**

```javascript
import axios from 'axios';

async function uploadPdfResume(pdfFile, userId = null) {
  try {
    const formData = new FormData();
    formData.append('pdf', pdfFile);
    if (userId) {
      formData.append('userId', userId);
    }

    const response = await axios.post(
      'http://localhost:5000/api/ai/process-pdf-complete',
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
        }
      }
    );

    if (response.data.success) {
      return { success: true, resume: response.data.data.resume };
    }
    return { success: false, error: response.data.message };
  } catch (error) {
    if (error.response) {
      return { success: false, error: error.response.data.message };
    }
    return { success: false, error: 'Cannot connect to backend' };
  }
}
```

---

## 📊 API Response Format

### **Success Response (201 Created)**

```json
{
  "success": true,
  "message": "Resume created successfully",
  "data": {
    "resume": {
      "_id": "68f465256326a1acc7c0b9b",
      "userId": null,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+1-234-567-8900",
      "summary": "Experienced Full-Stack Developer with 5+ years...",
      "education": [
        {
          "degree": "Bachelor of Science in Computer Science",
          "institution": "Stanford University",
          "year": 2019,
          "gpa": "3.8"
        }
      ],
      "experience": [
        {
          "title": "Senior Developer",
          "company": "Tech Corp",
          "startDate": "2020-01-01",
          "endDate": null,
          "current": true,
          "description": "Leading development of microservices..."
        }
      ],
      "skills": [
        {
          "name": "JavaScript",
          "level": "Expert"
        },
        {
          "name": "React",
          "level": "Advanced"
        }
      ],
      "projects": [
        {
          "name": "E-Commerce Platform",
          "description": "Built a scalable e-commerce platform...",
          "technologies": ["React", "Node.js", "MongoDB"],
          "url": "https://example.com",
          "github": "https://github.com/user/project"
        }
      ],
      "createdAt": "2025-10-25T12:00:00.000Z",
      "updatedAt": "2025-10-25T12:00:00.000Z"
    }
  },
  "aiParsing": {
    "success": true,
    "extractedTextLength": 1524,
    "parsingModel": "gpt-4o-mini",
    "originalFileName": "resume.pdf",
    "fileSize": 245632
  }
}
```

### **Error Responses**

**No File Uploaded (400)**
```json
{
  "success": false,
  "message": "No PDF file uploaded. Please upload a PDF file."
}
```

**Invalid File Type (400)**
```json
{
  "success": false,
  "message": "Only PDF files are allowed"
}
```

**File Too Large (400)**
```json
{
  "success": false,
  "message": "File size too large. Maximum size is 10MB"
}
```

**Text Extraction Failed (400)**
```json
{
  "success": false,
  "message": "Could not extract any text from the PDF. The PDF might be corrupted or contain only images without readable text.",
  "data": {
    "originalFileName": "resume.pdf",
    "fileSize": 245632
  }
}
```

**AI Parsing Failed (500)**
```json
{
  "success": false,
  "message": "Failed to parse resume with AI",
  "error": "OpenAI API error details..."
}
```

---

## 🎨 Complete UI Example with Progress

```jsx
import React, { useState } from 'react';

function ResumeUploadForm() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resume, setResume] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      alert('Please select a PDF file');
      return;
    }

    setUploading(true);
    setError(null);
    setProgress(0);

    const formData = new FormData();
    formData.append('pdf', file);
    
    try {
      // Simulate progress (actual progress requires xhr or axios)
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 300);

      const response = await fetch(
        'http://localhost:5000/api/ai/process-pdf-complete',
        {
          method: 'POST',
          body: formData
        }
      );

      clearInterval(progressInterval);
      setProgress(100);

      const data = await response.json();

      if (data.success) {
        setResume(data.data.resume);
        alert(`✅ Resume created for ${data.data.resume.name}!`);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Upload failed. Is backend running?');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-form">
      <form onSubmit={handleSubmit}>
        <h2>📄 Upload Your Resume PDF</h2>
        
        <div className="file-input-wrapper">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            disabled={uploading}
          />
        </div>

        {file && (
          <div className="file-info">
            <p>📄 {file.name}</p>
            <p>📊 Size: {(file.size / 1024).toFixed(2)} KB</p>
          </div>
        )}

        <button type="submit" disabled={!file || uploading}>
          {uploading ? '⏳ Processing...' : '🚀 Upload & Process'}
        </button>

        {uploading && (
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{width: `${progress}%`}}
            >
              {progress}%
            </div>
          </div>
        )}

        {error && (
          <div className="error">❌ {error}</div>
        )}

        {resume && (
          <div className="success">
            <h3>✅ Success!</h3>
            <div className="resume-preview">
              <p><strong>Name:</strong> {resume.name}</p>
              <p><strong>Email:</strong> {resume.email}</p>
              <p><strong>Phone:</strong> {resume.phone}</p>
              <p><strong>Summary:</strong> {resume.summary}</p>
              <p><strong>Skills:</strong> {resume.skills.map(s => s.name).join(', ')}</p>
            </div>
            <button onClick={() => window.location.href = `/resumes/${resume._id}`}>
              View Full Resume
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default ResumeUploadForm;
```

---

## 🔧 Alternative: Step-by-Step Approach

If you want more control, use these endpoints separately:

### **Step 1: Extract Text from PDF**

```javascript
// POST /api/ai/extract-pdf-text
const formData = new FormData();
formData.append('pdf', pdfFile);

const response = await fetch('http://localhost:5000/api/ai/extract-pdf-text', {
  method: 'POST',
  body: formData
});

const data = await response.json();
const extractedText = data.data.extractedText;
```

**Response:**
```json
{
  "success": true,
  "message": "Text extracted successfully from PDF",
  "data": {
    "extractedText": "John Doe\nSenior Developer\nemail@example.com...",
    "extractedTextLength": 1524,
    "originalFileName": "resume.pdf",
    "fileSize": 245632,
    "extractionMethod": "pdf-parse"
  }
}
```

### **Step 2: Parse Text with AI and Save**

```javascript
// POST /api/ai/parse-text-to-resume
const response = await fetch('http://localhost:5000/api/ai/parse-text-to-resume', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: extractedText,
    userId: 'optional_user_id'
  })
});

const data = await response.json();
const resume = data.data.resume;
```

---

## ⚠️ Important Notes

### **1. File Requirements**
- **Format:** PDF only
- **Max Size:** 10MB
- **Supported:** Text-based PDFs and image-based PDFs (with OCR)

### **2. userId Field**
- Currently **optional** (can be `null` or omitted)
- Will be required later when authentication is added
- For now, you can skip it or use a placeholder

### **3. Error Handling**
Always handle these cases:
- No file selected
- Invalid file type
- File too large
- Backend not running
- AI parsing failure
- Network errors

### **4. Loading States**
The process can take 5-30 seconds depending on:
- PDF size
- Text complexity
- Whether OCR is needed
- AI processing time

Show a loading indicator!

---

## 🧪 Testing Checklist

- [ ] Upload text-based PDF → Success
- [ ] Upload image-based PDF → Success (with OCR)
- [ ] Upload non-PDF file → Error message
- [ ] Upload file > 10MB → Error message
- [ ] Upload with no file → Error message
- [ ] Backend offline → User-friendly error
- [ ] Success → Shows resume data
- [ ] Loading indicator works
- [ ] Can view created resume

---

## 🚨 Common Issues

### **Issue: "Cannot connect to backend"**
**Solution:** Make sure backend is running:
```bash
cd backend
npm start
# Should show: Server is running on port 5000
```

### **Issue: "Only PDF files are allowed"**
**Solution:** Check file extension and MIME type:
```javascript
if (file.type !== 'application/pdf') {
  alert('Please select a PDF file');
  return;
}
```

### **Issue: Upload succeeds but no text extracted**
**Solution:** PDF might be image-based. Backend uses OCR automatically but some PDFs might be too complex.

### **Issue: AI parsing takes too long**
**Solution:** This is normal for large resumes. Can take 10-30 seconds. Show loading state.

---

## 📝 Quick Reference

| What | Value |
|------|-------|
| **Endpoint** | `POST http://localhost:5000/api/ai/process-pdf-complete` |
| **Method** | POST |
| **Content-Type** | multipart/form-data |
| **File Field** | `pdf` |
| **Optional Field** | `userId` (optional for now) |
| **Max File Size** | 10MB |
| **Accepted Types** | PDF only |
| **Processing Time** | 5-30 seconds |

---

## ✅ Complete Working Example

```html
<!DOCTYPE html>
<html>
<head>
  <title>PDF Resume Uploader</title>
</head>
<body>
  <h1>Upload Resume PDF</h1>
  
  <input type="file" id="pdfInput" accept=".pdf">
  <button onclick="uploadResume()">Upload</button>
  
  <div id="result"></div>

  <script>
    async function uploadResume() {
      const fileInput = document.getElementById('pdfInput');
      const file = fileInput.files[0];
      
      if (!file) {
        alert('Please select a PDF file');
        return;
      }

      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = '⏳ Processing...';

      const formData = new FormData();
      formData.append('pdf', file);

      try {
        const response = await fetch(
          'http://localhost:5000/api/ai/process-pdf-complete',
          {
            method: 'POST',
            body: formData
          }
        );

        const data = await response.json();

        if (data.success) {
          resultDiv.innerHTML = `
            <h3>✅ Success!</h3>
            <p><strong>Name:</strong> ${data.data.resume.name}</p>
            <p><strong>Email:</strong> ${data.data.resume.email}</p>
            <pre>${JSON.stringify(data.data.resume, null, 2)}</pre>
          `;
        } else {
          resultDiv.innerHTML = `<p style="color:red">❌ ${data.message}</p>`;
        }
      } catch (error) {
        resultDiv.innerHTML = '<p style="color:red">❌ Upload failed</p>';
      }
    }
  </script>
</body>
</html>
```

---

**🎉 That's it! Your frontend is ready to upload PDFs and create resumes automatically!**

**Need help?** Backend shows detailed logs during processing.

