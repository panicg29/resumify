# Postman Test Setup - Update Resume from Prompt

## Endpoint Details

**Method:** `PUT`  
**Full URL:** `http://localhost:5000/api/ai/update-resume/:id`  
**Replace `:id` with actual resume ID from your database**

---

## Setup Instructions

### Step 1: Get a Resume ID

First, you need to get a resume ID to update. Use one of these endpoints:

**GET** `http://localhost:5000/api/resumes`

This will return all resumes. Copy the `_id` field from any resume.

### Step 2: Create Postman Request

1. **Method:** Select `PUT`
2. **URL:** `http://localhost:5000/api/ai/update-resume/YOUR_RESUME_ID_HERE`
   - Replace `YOUR_RESUME_ID_HERE` with the actual ID from Step 1
3. **Headers:**
   - Key: `Content-Type`
   - Value: `application/json`
4. **Body:** Select `raw` and `JSON`, then use one of the test cases below

---

## Test Cases

### Test Case 1: Update Summary

**Request Body:**
```json
{
  "prompt": "Update my summary to highlight my 5 years of full-stack development experience and expertise in React and Node.js"
}
```

**Expected Result:** Summary field should be updated while keeping all other fields unchanged.

---

### Test Case 2: Add New Experience

**Request Body:**
```json
{
  "prompt": "Add a new experience: I worked as a Senior Developer at TechCorp from 2023-01-01 to present, where I led a team of 5 developers and built scalable microservices using Node.js and Docker"
}
```

**Expected Result:** A new experience entry should be added to the experience array.

---

### Test Case 3: Update Skills

**Request Body:**
```json
{
  "prompt": "Add Python and AWS to my skills list, and mark them as Advanced level"
}
```

**Expected Result:** Skills array should be updated with Python and AWS added.

---

### Test Case 4: Update Multiple Fields

**Request Body:**
```json
{
  "prompt": "Update my phone number to +1-555-999-8888 and change my summary to focus on my expertise in cloud computing and DevOps"
}
```

**Expected Result:** Both phone and summary fields should be updated.

---

### Test Case 5: Remove/Update Experience

**Request Body:**
```json
{
  "prompt": "Remove my oldest work experience and update my current job description to mention that I'm now working on AI/ML projects"
}
```

**Expected Result:** Experience array should be updated - oldest entry removed, current job description updated.

---

### Test Case 6: Add Education

**Request Body:**
```json
{
  "prompt": "Add a Master's degree in Computer Science from Stanford University completed in 2020 with GPA 3.8"
}
```

**Expected Result:** Education array should have the new entry added.

---

### Test Case 7: Update Name and Email

**Request Body:**
```json
{
  "prompt": "Change my name to John Smith and email to john.smith@example.com"
}
```

**Expected Result:** Name and email fields should be updated.

---

### Test Case 8: Add Project

**Request Body:**
```json
{
  "prompt": "Add a new project: E-commerce Platform - Built a full-stack e-commerce solution using React, Node.js, and MongoDB. Features include payment integration, admin dashboard, and real-time inventory management. Technologies: React, Node.js, MongoDB, Stripe API"
}
```

**Expected Result:** Projects array should have the new project added.

---

### Test Case 9: Complex Multi-Field Update

**Request Body:**
```json
{
  "prompt": "I've been promoted to Principal Engineer at my current company. Update my current job title and add leadership responsibilities. Also update my summary to reflect this promotion and add skills: Team Leadership and System Architecture"
}
```

**Expected Result:** Experience (current job title), summary, and skills should all be updated.

---

## Error Test Cases

### Test Case 10: Invalid Resume ID

**URL:** `http://localhost:5000/api/ai/update-resume/invalid123`

**Request Body:**
```json
{
  "prompt": "Update my summary"
}
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Invalid resume ID format. Must be a valid MongoDB ObjectId."
}
```

---

### Test Case 11: Missing Prompt

**Request Body:**
```json
{}
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Prompt is required and must be a non-empty string"
}
```

---

### Test Case 12: Resume Not Found

**URL:** `http://localhost:5000/api/ai/update-resume/507f1f77bcf86cd799439011`
(Use a valid format but non-existent ID)

**Request Body:**
```json
{
  "prompt": "Update my summary"
}
```

**Expected Response (404):**
```json
{
  "success": false,
  "message": "Resume not found"
}
```

---

## Success Response Format

**Status Code:** `200 OK`

**Response Body:**
```json
{
  "success": true,
  "message": "Resume updated successfully from prompt",
  "data": {
    "resume": {
      "_id": "65f1d6c2a56f3e0012abc456",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+1-555-123-4567",
      "summary": "Updated summary...",
      "education": [...],
      "experience": [...],
      "skills": [...],
      "projects": [...],
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:35:00.000Z"
    },
    "aiUpdate": {
      "success": true,
      "promptLength": 125,
      "model": "gpt-4o-mini",
      "fieldsUpdated": ["summary", "skills"]
    }
  }
}
```

---

## Quick Start Collection

### 1. First, Get a Resume ID

**GET** `http://localhost:5000/api/resumes`

Copy the `_id` from the response.

### 2. Test Simple Update

**PUT** `http://localhost:5000/api/ai/update-resume/PASTE_ID_HERE`

**Body:**
```json
{
  "prompt": "Update my summary to say I'm an expert full-stack developer"
}
```

### 3. Verify Update

**GET** `http://localhost:5000/api/resumes/PASTE_ID_HERE`

Check that the summary was updated.

---

## Tips

1. **Start Simple:** Begin with updating a single field (like summary) before trying complex updates
2. **Be Specific:** More specific prompts yield better results (e.g., "Add Python to skills" vs "update skills")
3. **Check Logs:** Watch server console for AI processing logs
4. **Verify Changes:** Always GET the resume after updating to verify changes
5. **Test Boundaries:** Try edge cases like very long prompts or ambiguous requests

---

## Common Prompt Examples

- **Update field:** "Change my email to newemail@example.com"
- **Add to array:** "Add React and TypeScript to my skills"
- **Remove from array:** "Remove my internship experience from 2018"
- **Update specific item:** "Update my current job description to mention I'm working on AI projects"
- **Multiple changes:** "Change my phone number to +1-555-000-1111 and add a Master's degree in Computer Science from MIT, 2020"
- **Enhance existing:** "Make my summary more professional and add 2 bullet points about my leadership experience"

---

## Troubleshooting

**Issue:** "No changes detected from the prompt"  
**Solution:** Be more specific about what you want to change. Use clear action words like "add", "update", "change", "remove".

**Issue:** AI makes unexpected changes  
**Solution:** Rephrase your prompt to be more explicit about what should NOT change.

**Issue:** Array items get replaced instead of added  
**Solution:** Use explicit language like "add X to my skills" rather than "update my skills with X".

---

## Notes

- The endpoint uses OpenAI GPT-4o-mini model
- Only fields mentioned in the prompt will be updated
- Arrays are replaced entirely, so if you want to add to an array, the AI needs to include all existing items plus the new one
- Processing time is typically 2-5 seconds depending on prompt complexity
- All updates are validated against the resume schema before saving

