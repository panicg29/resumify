## Resume Update API Contract (Frontend Integration Guide)

This document defines how the frontend should persist inline edits for resumes. It reflects the current backend behavior and adds clear, concrete contracts for requests, responses, and validation.

### Base URL
- Default: `http://localhost:5000` or `http://<host>:5000` as configured
- All endpoints are under: `http://localhost:5000/api/resumes`

### Auth
- None required at the moment (public endpoints). If you add auth later, include `Authorization: Bearer <token>` and update CORS to allow credentials if cookies/sessions are used.

---

## Endpoints for Updating a Resume

### 1) PUT http://localhost:5000/api/resumes/:id
- Purpose: Replace or update an existing resume. Backend currently supports partial updates on PUT (i.e., behaves like PATCH). Fields not sent remain unchanged.
- Full URL: `http://localhost:5000/api/resumes/:id` (replace `:id` with actual resume ID)
- Request Content-Type: `application/json`

Request body schema (send any subset of fields below):
```
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "summary": "string",
  "education": [
    {
      "degree": "string",
      "institution": "string",
      "year": "string | number"
    }
  ],
  "experience": [
    {
      "title": "string",
      "company": "string",
      "startDate": "YYYY-MM-DD | YYYY-MM | YYYY",
      "endDate": "YYYY-MM-DD | YYYY-MM | YYYY | null",
      "description": "string"
    }
  ],
  "skills": [
    { "name": "string", "level": "string (optional)" }
  ],
  "projects": [
    {
      "name": "string",
      "description": "string",
      "technologies": ["string", "string"]
    }
  ],
  "template": "string (optional)"
}
```

Array handling:
- Arrays are replaced, not merged. If you send `experience`, it will replace the entire list for that field.
- Omit a field to leave it unchanged.

Dates:
- Accepts flexible strings; prefer ISO-8601 `YYYY-MM-DD`. `YYYY-MM` or `YYYY` are acceptable if day/month are unknown.

Response: 200
```
{
  "success": true,
  "message": "Resume updated successfully",
  "data": { "resume": { /* full updated resume document */ } }
}
```

Errors:
- 400 Invalid ID or validation error
```
{ "success": false, "message": "Invalid resume ID" }
```
```
{ "success": false, "message": "Validation failed", "errors": ["..."] }
```
- 404 Not found
```
{ "success": false, "message": "Resume not found" }
```
- 500 Server error
```
{ "success": false, "message": "Server error" }
```

Example:
```
PUT http://localhost:5000/api/resumes/65f1d6c2a56f3e0012abc123
Content-Type: application/json

{
  "summary": "Full-stack engineer with 6+ years building scalable apps",
  "skills": [{ "name": "React" }, { "name": "Node.js" }, { "name": "MongoDB" }]
}
```

---

### 2) PATCH http://localhost:5000/api/resumes/:id (Optional frontend usage)
- Full URL: `http://localhost:5000/api/resumes/:id` (replace `:id` with actual resume ID)
- The backend currently only exposes PUT for updates, but it accepts partial fields. The frontend may continue using PUT for partial updates. If needed, we can add PATCH with identical semantics later.

---

## Additional Contracts Used by Frontend

### GET http://localhost:5000/api/resumes
- Full URL: `http://localhost:5000/api/resumes`
- Response 200:
```
{ "success": true, "data": { "resumes": [ /* ... */ ] } }
```

### GET http://localhost:5000/api/resumes/:id
- Full URL: `http://localhost:5000/api/resumes/:id` (replace `:id` with actual resume ID)
- Response 200:
```
{ "success": true, "data": { "resume": { /* ... */ } } }
```
- 404:
```
{ "success": false, "message": "Resume not found" }
```

### DELETE http://localhost:5000/api/resumes/:id
- Full URL: `http://localhost:5000/api/resumes/:id` (replace `:id` with actual resume ID)
- Response 200:
```
{ "success": true, "data": { "deletedId": "...", "deletedName": "..." } }
```

### POST http://localhost:5000/api/resumes
- Full URL: `http://localhost:5000/api/resumes`
- Response 201:
```
{ "success": true, "message": "Resume created successfully", "data": { "resume": { /* ... */ } } }
```

---

## Validation and Constraints
- Create requires: `name`, `email`, `phone`, `summary`.
- Update: all fields optional; arrays replace when provided.
- Education items should include `degree`, `institution`, `year`.
- Experience items should include `title`, `company`, `startDate`, `description`. `endDate` optional.
- Skills items should include `name`. `level` optional free text.
- Projects items should include `name`, `description`. `technologies` is an array of strings.
- Max body size: 2MB (server-enforced). Keep payloads small.

Error format (always JSON):
```
{ "success": false, "message": "why it failed", "errors": [optional array] }
```

---

## CORS and Headers
- Allowed Origins: `http://localhost:5173`, `http://127.0.0.1:5173` (dev). Add your host if different.
- Methods: `GET, POST, PUT, DELETE, OPTIONS`
- Allowed Headers: `Content-Type, Authorization`
- Credentials: `false` (no cookies used)
- Frontend should not set `Content-Type` for GET/DELETE to avoid preflight; do set `application/json` for PUT/POST.

---

## Optional/Nice-to-Have (Future)

1) Bulk update
- `PATCH http://localhost:5000/api/resumes` with body like `{ updates: [{ id, changes }, ...] }` → returns updated docs.

2) Section-specific updates
- `PATCH http://localhost:5000/api/resumes/:id/experience/:expId` with `{ title?, company?, startDate?, endDate?, description? }`.

3) Versioning / optimistic UI
- Include `updatedAt` in the resume payload; frontend can use it for concurrency checks.

---

## Frontend Integration Notes
- Inline editor "Save (Local)" currently keeps state client-side only.
- To persist: call `PUT http://localhost:5000/api/resumes/:id` with only changed fields. Arrays you include will replace.
- After success, update the dashboard list with the returned `data.resume`.

If you prefer true PATCH semantics (partial without replace for arrays) or need merge logic for arrays, let us know and we’ll add a dedicated `PATCH` endpoint with merge rules.


