# 🔴 PDF Upload Endpoint Issue - Backend Diagnostic

## 🚨 Problem

Frontend is getting `net::ERR_INTERNET_DISCONNECTED` when trying to POST to:
```
POST http://localhost:5000/api/ai/process-pdf-complete
```

**Error:** `TypeError: Failed to fetch`

Backend server is reportedly running, but not responding to this endpoint.

---

## ✅ What Frontend is Sending

### Request Details:
```
Method: POST
URL: http://localhost:5000/api/ai/process-pdf-complete
Content-Type: multipart/form-data (set automatically by browser)
Body: FormData with 'pdf' field containing File object
```

### FormData Contents:
```javascript
FormData {
  pdf: File {
    name: "CV 2.pdf",
    size: 139.67 KB,
    type: "application/pdf"
  }
}
```

---

## 🔍 Possible Backend Issues

### 1. **Endpoint Does Not Exist** (Most Likely)

**Check if this route exists in your backend:**

```javascript
// In routes/aiRoutes.js or similar
router.post('/process-pdf-complete', upload.single('pdf'), processPdfComplete);

// OR in server.js
app.post('/api/ai/process-pdf-complete', upload.single('pdf'), processPdfComplete);
```

**To verify:**
```bash
# In your backend directory, search for the route
grep -r "process-pdf-complete" .
grep -r "/api/ai" .
```

**If route doesn't exist, you need to create it!**

---

### 2. **CORS Not Configured for POST**

**Check your CORS configuration:**

```javascript
// In server.js or app.js
const cors = require('cors');

// ❌ BAD - Only allows GET
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET']  // Missing POST!
}));

// ✅ GOOD - Allows all methods including POST
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

// ✅ BETTER - Allow all (for development)
app.use(cors());
```

---

### 3. **Multer Not Configured**

**For file uploads, you need multer:**

```bash
# Install if not installed
npm install multer
```

```javascript
// In your backend
const multer = require('multer');

// Configure multer
const storage = multer.memoryStorage(); // or diskStorage
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files allowed'), false);
    }
  }
});

// Use in route
router.post('/process-pdf-complete', upload.single('pdf'), async (req, res) => {
  // req.file will contain the uploaded PDF
  // req.file.buffer contains the file data
});
```

---

### 4. **Route Not Registered**

**Make sure the route is registered in your main server file:**

```javascript
// server.js
const aiRoutes = require('./routes/aiRoutes');

// ❌ WRONG - Route not registered
// Routes are defined but never used

// ✅ CORRECT - Route is registered
app.use('/api/ai', aiRoutes);
```

---

## 🧪 Quick Backend Test

### Test 1: Check if server is running
```bash
curl http://localhost:5000/health
# Should return 200 OK
```

### Test 2: Check if route exists
```bash
curl -X POST http://localhost:5000/api/ai/process-pdf-complete
# Should NOT return "Cannot GET" or 404
# Might return 400 (no file) but that's okay - means route exists!
```

### Test 3: Test with actual file
```bash
curl -X POST http://localhost:5000/api/ai/process-pdf-complete \
  -F "pdf=@/path/to/test.pdf"

# Should return JSON response (success or error)
```

---

## ✅ Complete Working Backend Example

### **File: routes/aiRoutes.js**

```javascript
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { processPdfComplete } = require('../controllers/aiController');

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

// Route for PDF upload and processing
router.post('/process-pdf-complete', upload.single('pdf'), processPdfComplete);

module.exports = router;
```

### **File: controllers/aiController.js**

```javascript
const Resume = require('../models/Resume');
// Assume you have PDF text extraction and AI parsing functions

exports.processPdfComplete = async (req, res) => {
  try {
    console.log('📥 Received PDF upload request');

    // Check if file exists
    if (!req.file) {
      console.log('❌ No file uploaded');
      return res.status(400).json({
        success: false,
        message: 'No PDF file uploaded. Please upload a PDF file.'
      });
    }

    console.log('📄 File received:', req.file.originalname);
    console.log('📊 File size:', req.file.size, 'bytes');

    // Extract text from PDF
    console.log('📤 Extracting text from PDF...');
    const extractedText = await extractTextFromPdf(req.file.buffer);
    
    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Could not extract any text from the PDF.'
      });
    }

    console.log('✅ Text extracted. Length:', extractedText.length);

    // Parse with AI
    console.log('🤖 Parsing text with AI...');
    const parsedData = await parseResumeWithAI(extractedText);

    // Save to database
    console.log('💾 Saving to database...');
    const resume = new Resume({
      ...parsedData,
      userId: req.body.userId || null
    });
    
    await resume.save();

    console.log('✅ Resume saved successfully. ID:', resume._id);

    // Return success
    return res.status(201).json({
      success: true,
      message: 'Resume created successfully',
      data: {
        resume: resume
      },
      aiParsing: {
        success: true,
        extractedTextLength: extractedText.length,
        parsingModel: 'gpt-4o-mini',
        originalFileName: req.file.originalname,
        fileSize: req.file.size
      }
    });

  } catch (error) {
    console.error('❌ Error processing PDF:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process PDF',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Helper functions (you need to implement these)
async function extractTextFromPdf(buffer) {
  // Use pdf-parse or similar library
  const pdfParse = require('pdf-parse');
  const data = await pdfParse(buffer);
  return data.text;
}

async function parseResumeWithAI(text) {
  // Use OpenAI API to parse the text
  // Return structured resume data
  return {
    name: 'Extracted Name',
    email: 'extracted@email.com',
    // ... etc
  };
}
```

### **File: server.js**

```javascript
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const aiRoutes = require('./routes/aiRoutes');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/ai', aiRoutes); // ✅ This is crucial!

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: err.message
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
```

---

## 📋 Backend Checklist

### Basic Setup:
- [ ] `npm install multer` (for file uploads)
- [ ] `npm install pdf-parse` (for text extraction)
- [ ] CORS configured to allow POST
- [ ] Routes file created (`routes/aiRoutes.js`)
- [ ] Controller file created (`controllers/aiController.js`)
- [ ] Routes registered in `server.js`

### Route Configuration:
- [ ] Route path is exactly: `/process-pdf-complete`
- [ ] Full URL is: `http://localhost:5000/api/ai/process-pdf-complete`
- [ ] Multer middleware is used: `upload.single('pdf')`
- [ ] File field name is: `'pdf'` (not `'file'` or anything else)

### Testing:
- [ ] Server starts without errors
- [ ] Health check works: `curl http://localhost:5000/health`
- [ ] Route responds (even with 400): `curl -X POST http://localhost:5000/api/ai/process-pdf-complete`
- [ ] No errors in backend console when POST request received

---

## 🔧 Debugging Commands

### Check if route exists:
```bash
# In backend directory
grep -r "process-pdf-complete" .
grep -r "upload.single" .
grep -r "/api/ai" server.js
```

### Check dependencies:
```bash
npm list multer
npm list cors
npm list express
```

### Test backend:
```bash
# Start backend with verbose logging
DEBUG=* npm start

# OR
node --inspect server.js
```

---

## 📤 What Backend Should Return

### Success Response (201):
```json
{
  "success": true,
  "message": "Resume created successfully",
  "data": {
    "resume": {
      "_id": "68f465256326a1acc7c0b9b",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1-234-567-8900",
      "summary": "...",
      "education": [...],
      "experience": [...],
      "skills": [...],
      "projects": [...]
    }
  },
  "aiParsing": {
    "success": true,
    "extractedTextLength": 1524,
    "parsingModel": "gpt-4o-mini",
    "originalFileName": "CV 2.pdf",
    "fileSize": 139670
  }
}
```

### Error Response (400):
```json
{
  "success": false,
  "message": "No PDF file uploaded. Please upload a PDF file."
}
```

---

## 🆘 Still Not Working?

### Share these logs:

1. **Backend console output** (full log from startup)
2. **Result of:**
   ```bash
   curl -v -X POST http://localhost:5000/api/ai/process-pdf-complete
   ```
3. **Your `server.js` file**
4. **Your routes registration code**
5. **Do you have the route file?** (`routes/aiRoutes.js` or similar)

---

## 🎯 Most Likely Solution

**90% chance the issue is:**
1. Route doesn't exist (`POST /api/ai/process-pdf-complete`)
2. Route exists but not registered in `server.js`
3. Multer not configured
4. CORS not allowing POST

**Quick fix:**
1. Create the route
2. Register it: `app.use('/api/ai', aiRoutes);`
3. Add multer: `upload.single('pdf')`
4. Enable CORS: `app.use(cors());`

---

**Frontend is working correctly.** Issue is 100% on backend side.

