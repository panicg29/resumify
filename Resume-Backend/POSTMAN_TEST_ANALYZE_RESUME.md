# Postman Test: Analyze Resume

## Quick Steps

### 1. Request Setup
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/ai/analyze-resume/:id`
- Replace `:id` with actual resume ID (MongoDB ObjectId)

### 2. Example URL
```
http://localhost:5000/api/ai/analyze-resume/507f1f77bcf86cd799439011
```

### 3. Headers
- No special headers needed (default `Content-Type: application/json`)

### 4. Body
- **None** (GET request)

### 5. Send Request
- Click **Send**
- Wait 3-5 seconds for AI analysis

---

## Expected Response

### Success (200)
```json
{
  "success": true,
  "message": "Resume analysis report generated successfully",
  "data": {
    "resumeId": "...",
    "report": {
      "summary": {
        "overallScore": 85,
        "strengths": [...],
        "weaknesses": [...]
      },
      "whatsInResume": {...},
      "whatsNotInResume": {...},
      "whatsNeeded": {...},
      "skillSetAnalysis": {...}
    }
  }
}
```

### Error (404)
```json
{
  "success": false,
  "message": "Resume not found"
}
```

---

## How to Get Resume ID

1. **Get all resumes:**
   - `GET http://localhost:5000/api/resumes`
   - Copy an `_id` from response

2. **Or create a new resume first:**
   - `POST http://localhost:5000/api/resumes`
   - Copy the `_id` from response

---

## Quick Test Checklist

- [ ] Server is running (`npm start`)
- [ ] Resume ID is valid (24 character hex string)
- [ ] Method is `GET`
- [ ] URL format is correct
- [ ] Wait for response (3-5 seconds)

---

**That's it!** 🚀

