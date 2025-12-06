# Backend Connectivity Guide (Aligned with Current Frontend)

This document lists the backend settings and route behaviors required to work reliably with the updated frontend client. It also includes recommended checks for intermittent connectivity issues.

## Context: Frontend Updates You Should Know

- Dynamic API base URL: frontend now builds the API target as `http://<current-frontend-host>:<port>/api/resumes` with optional env overrides:
  - `VITE_API_HOST`, `VITE_API_PORT` (defaults: current host, 5000)
- Resilience layer: requests use a timeout (8–10s) and one retry for transient network hiccups.
- Preflight avoidance: frontend removed unnecessary `Content-Type` headers on `GET` and `DELETE` so those requests typically won’t trigger CORS preflight.
- Semantics/Responses expected by frontend:
  - POST/PUT/GET return JSON with `{ success, message, data }`
  - DELETE returns JSON with `{ success: true, data: { deletedId, deletedName } }` and status 200

If your backend behavior differs, adjust accordingly or update the frontend contract.

---

## 1) CORS Configuration

Ensure your server sends the following CORS headers for API responses and OPTIONS preflight:

- `Access-Control-Allow-Origin: http://<frontend-host>:<frontend-port>`
  - Use `*` only if no credentials are involved.
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization`
- `Access-Control-Allow-Credentials: true` (only if using cookies); otherwise omit.

Example (Express + cors):
```js
import cors from 'cors';

app.use(cors({
  origin: [
    'http://localhost:5173',          // Vite default
    'http://127.0.0.1:5173',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false, // true only if using cookies/sessions
}));

// Ensure OPTIONS is handled for all routes
app.options('*', cors());
```

Notes:
- Frontend no longer sets `Content-Type` on GET/DELETE (so those won’t preflight). POST/PUT still use JSON.
- If you serve the frontend from another host/port, add it to `origin`.

---

## 2) Network Binding and Ports

- Bind to `0.0.0.0` (all interfaces) to avoid loopback-only issues on Windows / WSL / Docker.
- Confirm the port is not intermittently used by other processes.

Example:
```js
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`API listening on http://${HOST}:${PORT}`);
});
```

---

## 3) Timeouts and Body Limits

- Increase server timeouts if needed to exceed frontend’s 8–10s budget.
- JSON body size: ensure typical resume payloads are accepted (e.g., 1–5 MB is more than enough).

Example (Express):
```js
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// If behind a proxy/load balancer
app.set('trust proxy', 1);
```

---

## 4) Route Contracts Expected by Frontend

- GET `/api/resumes`
  - 200 JSON: `{ success: true, data: { resumes: [...] } }`
- GET `/api/resumes/:id`
  - 200 JSON: `{ success: true, data: { resume } }`
  - 404 JSON: `{ success: false, message: 'Not found' }`
- POST `/api/resumes`
  - 201/200 JSON: `{ success: true, data: { resume } }`
- PUT `/api/resumes/:id`
  - 200 JSON: `{ success: true, data: { resume } }`
- DELETE `/api/resumes/:id`
  - 200 JSON: `{ success: true, data: { deletedId, deletedName } }`

Consistency is important—always send JSON; avoid `204 No Content` for DELETE with this frontend.

---

## 5) Error Handling Conventions

- Always return JSON errors for failed requests:
```json
{ "success": false, "message": "why it failed" }
```
- Include useful messages (validation details, missing ID, etc.).
- Avoid abrupt connection resets (uncaught exceptions, process exit) which surface as `TypeError: Failed to fetch` on the client.

---

## 6) Logging and Health Checks

- Log every request minimally: method, path, status, latency (e.g., `morgan('tiny')`).
- Add a health endpoint to quickly diagnose availability:
  - GET `/health` → `{ status: 'ok', uptime: <seconds>, timestamp: <ms> }`

---

## 7) PDF Upload Endpoint (if used)

If you support PDF → Resume extraction:
- Endpoint: `POST /api/ai/process-pdf-complete`
- Must accept `multipart/form-data` via Multer or similar:
```js
import multer from 'multer';
const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB

app.post('/api/ai/process-pdf-complete', upload.single('file'), async (req, res) => {
  // parse file, extract text, call AI, return structured resume
  return res.json({ success: true, data: { resume: {/*...*/} } });
});
```
- Ensure CORS covers this route as well.

---

## 8) Common Intermittency Causes and Fixes

- OPTIONS not handled: add `app.options('*', cors())`.
- Hostname mismatch: frontend calls `localhost`, backend binds only `127.0.0.1` or vice versa; bind to `0.0.0.0`.
- Rapid restarts: nodemon restarts on file changes; requests during restart fail—check logs around failures.
- Firewall/VPN: loopback traffic intermittently blocked—temporarily disable to verify.
- Large payloads: body parser or reverse proxy rejects—raise limits and check server logs.

---

## 9) Quick Checklist

- [ ] CORS set for frontend host/port; OPTIONS enabled
- [ ] Server listens on `0.0.0.0:5000`
- [ ] JSON body limits adequate
- [ ] Consistent JSON responses on all routes (incl. DELETE)
- [ ] Health endpoint available
- [ ] Logging enabled for diagnostics
- [ ] PDF upload route accepts `multipart/form-data` (if applicable)

With these in place, the frontend’s updated client should connect consistently without intermittent `ERR_INTERNET_DISCONNECTED` or `TypeError: Failed to fetch` errors.
