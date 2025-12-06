# 🚨 URGENT: Frontend Connection Fix

## ⚠️ The Problem
`ERR_INTERNET_DISCONNECTED` when calling from frontend (but Postman works)

---

## ✅ **STEP 1: RESTART BACKEND (MANDATORY)**

**YOU MUST RESTART** for CORS changes to take effect!

```bash
# Stop server (Ctrl+C)
# Then restart:
npm start
```

**Wait for these messages:**
```
✅ Successfully connected to MongoDB Atlas
Server is running on port 5000
```

---

## ✅ **STEP 2: Verify Backend is Running**

Open **NEW terminal** and run:

```bash
curl http://localhost:5000/health
```

**Expected output:**
```json
{"status":"OK","message":"Server is running","database":"Connected"}
```

**If this fails:** Backend is NOT running! Go back to Step 1.

---

## ✅ **STEP 3: Check Backend Logs**

When you try upload from frontend, **watch your backend terminal**.

**You should see:**
```
📥 OPTIONS /api/ai/process-pdf-complete - 2025-10-25T...
📥 POST /api/ai/process-pdf-complete - 2025-10-25T...
```

**If you DON'T see these messages:**
- Request is not reaching backend
- Frontend might be calling wrong URL
- Port might be blocked

**If you DO see these messages:**
- Backend is receiving the request
- Error is happening during processing
- Check for errors in backend console after these lines

---

## ✅ **STEP 4: Fix Frontend Code**

Make sure your frontend code looks EXACTLY like this:

```javascript
async function uploadPdf(file) {
  try {
    console.log('🚀 Starting upload...', file.name);
    
    const formData = new FormData();
    formData.append('pdf', file);
    // Do NOT add userId for now - it's optional

    console.log('📡 Sending to:', 'http://localhost:5000/api/ai/process-pdf-complete');

    const response = await fetch(
      'http://localhost:5000/api/ai/process-pdf-complete',
      {
        method: 'POST',
        body: formData,
        // ⚠️ IMPORTANT: Do NOT set Content-Type header!
        // ⚠️ Do NOT set any headers for FormData!
      }
    );

    console.log('📥 Response status:', response.status);
    console.log('📥 Response ok:', response.ok);

    const data = await response.json();
    console.log('📦 Response data:', data);

    if (data.success) {
      alert(`✅ Success: ${data.data.resume.name}`);
      return data;
    } else {
      alert(`❌ Error: ${data.message}`);
      return null;
    }

  } catch (error) {
    console.error('❌ Upload failed:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    
    alert('Cannot connect to backend!\n\n' +
          'Check:\n' +
          '1. Backend running? (npm start)\n' +
          '2. URL correct? (http://localhost:5000)\n' +
          '3. Check browser console (F12) for errors');
    
    return null;
  }
}
```

---

## ✅ **STEP 5: Check Browser Console**

Press **F12** → **Console** tab

**Look for:**
- Red CORS errors? → CORS issue
- "Failed to fetch"? → Backend not reachable
- Network error? → Connection blocked

**Copy ALL error messages** and share them.

---

## ✅ **STEP 6: Check Network Tab**

Press **F12** → **Network** tab

**Look for these requests:**

1. **OPTIONS request** (preflight)
   - Should show status: **204** or **200**
   - If it shows **(failed)**: CORS issue

2. **POST request** (actual upload)
   - Should show status: **200** or **201**
   - If it shows **(failed)**: Backend issue

**Click on the failed request** → **Headers** tab → Screenshot and share

---

## 🔍 **DIAGNOSTIC: Check What's Failing**

### **Scenario A: Backend Not Receiving Request**

**Backend console shows:** Nothing (no logs)  
**Browser shows:** ERR_INTERNET_DISCONNECTED

**Solution:**
```bash
# Check if backend is listening on port 5000
netstat -ano | findstr :5000

# Should show something like:
# TCP    0.0.0.0:5000    0.0.0.0:0    LISTENING    12345

# If nothing shows, backend is NOT running!
npm start
```

### **Scenario B: Backend Receives But Crashes**

**Backend console shows:**
```
📥 POST /api/ai/process-pdf-complete...
[Then errors or crash]
```

**Solution:** Check backend error messages. Share them.

### **Scenario C: CORS Blocking Request**

**Browser console shows:**
```
Access to fetch... has been blocked by CORS policy
```

**Solution:** CORS should be fixed now. Restart backend.

---

## 🛠️ **QUICK FIX: Test with Simple Endpoint First**

### **1. Test Health Endpoint from Browser Console:**

```javascript
// Open browser console (F12) and run:
fetch('http://localhost:5000/health')
  .then(r => r.json())
  .then(data => console.log('✅ Backend reachable:', data))
  .catch(err => console.error('❌ Cannot reach backend:', err));
```

**If this fails:** Backend is not reachable from browser!

### **2. Test DELETE Endpoint (Should Work):**

```javascript
// Get a resume ID first
fetch('http://localhost:5000/api/resumes')
  .then(r => r.json())
  .then(data => {
    const id = data.data.resumes[0]?._id;
    console.log('Resume ID:', id);
    
    // Try to delete it
    return fetch(`http://localhost:5000/api/resumes/${id}`, {
      method: 'DELETE'
    });
  })
  .then(r => r.json())
  .then(data => console.log('✅ DELETE works:', data))
  .catch(err => console.error('❌ DELETE failed:', err));
```

**If DELETE works but PDF upload doesn't:** Issue is specific to file upload endpoint.

---

## 📋 **Checklist Before Trying Again**

- [ ] Backend restarted: `npm start`
- [ ] Backend shows "Server is running on port 5000"
- [ ] Health check works: `curl http://localhost:5000/health`
- [ ] Browser cache cleared (Ctrl+Shift+Delete)
- [ ] Frontend using correct URL: `http://localhost:5000`
- [ ] No Content-Type header set in frontend (for FormData)
- [ ] File is valid PDF (not empty, not corrupted)
- [ ] Firewall not blocking localhost

---

## 🚨 **If Still Failing, Share These:**

### **1. Backend Console Output:**
```
Copy everything from server start through upload attempt
```

### **2. Browser Console Errors:**
```
F12 → Console → Copy all red errors
```

### **3. Network Tab:**
```
F12 → Network → Screenshot of failed request
Click on request → Headers tab → Screenshot
```

### **4. Test Results:**
```bash
# Run these and share results:
curl http://localhost:5000/health
netstat -ano | findstr :5000
npm list cors
```

---

## 💡 **Alternative: Use Simple HTML for Testing**

Create `test-upload.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <title>PDF Upload Test</title>
</head>
<body>
  <h1>PDF Upload Test</h1>
  <input type="file" id="fileInput" accept=".pdf">
  <button onclick="upload()">Upload</button>
  <div id="result"></div>

  <script>
    async function upload() {
      const file = document.getElementById('fileInput').files[0];
      if (!file) {
        alert('Select a PDF file first');
        return;
      }

      console.log('Uploading:', file.name);
      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = 'Uploading...';

      try {
        const formData = new FormData();
        formData.append('pdf', file);

        const response = await fetch(
          'http://localhost:5000/api/ai/process-pdf-complete',
          {
            method: 'POST',
            body: formData
          }
        );

        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Response data:', data);

        if (data.success) {
          resultDiv.innerHTML = `<h3 style="color:green">✅ Success!</h3>
            <p>Name: ${data.data.resume.name}</p>
            <p>Email: ${data.data.resume.email}</p>`;
        } else {
          resultDiv.innerHTML = `<p style="color:red">❌ ${data.message}</p>`;
        }
      } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = `<p style="color:red">❌ ${error.message}</p>`;
      }
    }
  </script>
</body>
</html>
```

**Open this HTML file in browser and test.**

If this works but your app doesn't, the issue is in your app's code.

---

## 🎯 **Most Likely Causes**

1. **Backend not restarted** (90% of cases) → Restart now!
2. **Backend not running** → Check with `curl http://localhost:5000/health`
3. **Wrong URL in frontend** → Should be `http://localhost:5000`
4. **Firewall blocking** → Disable temporarily to test
5. **Browser cache** → Clear cache (Ctrl+Shift+Delete)

---

## ✅ **Expected Working Scenario**

**Backend console:**
```
✅ Successfully connected to MongoDB Atlas
Server is running on port 5000
📥 OPTIONS /api/ai/process-pdf-complete - 2025-10-25T...
📥 POST /api/ai/process-pdf-complete - 2025-10-25T...
Processing PDF: CV 2.pdf
Attempting direct text extraction...
Direct extraction result: 1524 characters
Parsing resume with AI...
AI parsing successful
Creating resume record...
```

**Browser console:**
```
🚀 Starting upload... CV 2.pdf
📡 Sending to: http://localhost:5000/api/ai/process-pdf-complete
📥 Response status: 201
📥 Response ok: true
📦 Response data: {success: true, ...}
```

**Browser Network tab:**
```
OPTIONS /api/ai/process-pdf-complete → 204 No Content
POST /api/ai/process-pdf-complete → 201 Created
```

---

**🔥 DO THIS NOW:**

1. **Stop backend** (Ctrl+C)
2. **Start backend** (`npm start`)
3. **Wait for "Server is running on port 5000"**
4. **Test with simple HTML file above**
5. **If HTML test works:** Issue is in your app's code
6. **If HTML test fails:** Share backend console output

---

**Need more help?** Share screenshots of:
- Backend terminal (full output)
- Browser console (F12 → Console)
- Network tab (F12 → Network → Failed request)

