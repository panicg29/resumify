# Job Post -> AI Resume API (Frontend Notes)

### Overview
Generate a recruiter-grade resume for any job by selecting an existing stored resume (dropdown) and providing either a job URL or pasted description. The backend:
- Lists all resumes with labels formatted as `"{name} - {current title}"` for the dropdown.
- Scrapes/normalizes job text (or uses manual text).
- Feeds the selected resume + job requirements into the AI.
- Saves a brand-new tailored resume record (original resume stays untouched).
Template selection is persisted on the newly created resume.

---

### 1. Load Dropdown Options
- `GET http://localhost:5000/api/ai/resume-options`

**Response**
```json
{
  "success": true,
  "data": {
    "options": [
      {
        "id": "675a01d61234567890abcd12",
        "label": "Arif Hasan - Lead Backend Engineer",
        "template": "template2",
        "updatedAt": "2025-11-15T08:21:44.201Z"
      }
    ]
  }
}
```
Use `label` for the dropdown text. The `template` can pre-fill the template selector if desired.

---

### 2. Generate Tailored Resume
- `POST http://localhost:5000/api/ai/generate-job-resume`
- You can also `POST /api/ai/generate-resume` with these fields and it will route here automatically.

**Headers**
```
Content-Type: application/json
```

---

### Request Body
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `resumeId` | string | Yes | `_id` from dropdown option (existing resume to tailor). |
| `jobUrl` | string | Cond. | Public job post URL to scrape. |
| `jobDescription` | string | Cond. | Raw text pasted by the user. |
| `template` | string | No | Template to persist on the new resume (defaults to selected resume/template1). |

> Provide at least one of `jobUrl` or `jobDescription`.

**Example**
```json
{
  "resumeId": "675a01d61234567890abcd12",
  "jobUrl": "https://jobs.bdjobs.com/details.asp?id=123456",
  "template": "template2"
}
```

---

### Success Response (201)
```json
{
  "success": true,
  "data": {
    "resume": { "...newly stored tailored resume..." },
    "baseResume": {
      "id": "675a01d61234567890abcd12",
      "name": "Arif Hasan"
    },
    "jobDetails": {
      "sourceType": "url",
      "title": "Senior Backend Engineer",
      "responsibilities": [ "...from scrape..." ],
      "requirements": [ "...from scrape..." ]
    },
    "aiGeneration": {
      "model": "gpt-4o-mini",
      "source": "url",
      "usedUrl": "https://jobs.bdjobs.com/details.asp?id=123456"
    }
  }
}
```

Key notes:
- The tailored resume is saved as a new record; the source resume remains unchanged.
- Contact info is inherited from the selected resume unless the AI enriches it further.
- Every section (summary, experience, education, projects, skills) is rewritten by the AI against the job title, responsibilities, and requirements.
- `jobDetails.fullDescription` includes the trimmed text fed to the AI for auditing.

---

### Error Cheatsheet
| Status | Cause | Typical Message |
|--------|-------|-----------------|
| 400 | Missing `resumeId` or job data | `"A valid resumeId must be provided"`, `"Provide either jobDescription text or jobUrl"` |
| 404 | Resume not found | `"Resume not found for tailoring"` |
| 502 | Scrape failure / AI parse issue | `"Failed to fetch job post (status 403)"`, `"AI failed to generate a tailored resume"` |
| 500 | Unexpected server issue | `"Unable to generate tailored resume"` |

---

### Frontend Flow Tips
1. Load dropdown options on page load via `GET /api/ai/resume-options`.
2. Display labels as provided (`name - current title`) and keep the associated `_id` for submission.
3. Allow the user to supply a job URL or paste the description plus select a template.
4. POST the payload and show progress; scraping + AI can take a few seconds.
5. After success, fetch the new resume from the response and show it alongside the original if needed.
