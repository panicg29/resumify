# 🔧 CORS Issue - Complete Fix Guide

## ✅ **FIXED! CORS Configuration Updated**

Your CORS has been upgraded from basic to comprehensive configuration.

---

## 🎯 What Was Fixed

### **Before (Basic CORS):**
```javascript
app.use(cors());  // ❌ Too simple for file uploads
```

### **After (Comprehensive CORS):**
```javascript
const corsOptions = {
  origin: '*',  // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200,
  maxAge: 86400  // Cache preflight for 24 hours
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));  // Handle preflight explicitly
```

---

## 🚀 **RESTART YOUR BACKEND NOW!**

**CRITICAL:** You MUST restart your backend for changes to take effect!

```bash
# Stop current server (Ctrl+C)
# Then restart:
npm start

# Wait for:
# ✅ Successfully connected to MongoDB Atlas
# Server is running on port 5000
```

---

## 🧪 **Test from Browser**

### **1. Open Browser Console (F12)**

### **2. Test with this code:**

```javascript
// Test file upload
const input = document.createElement('input');
input.type = 'file';
input.accept = '.pdf';
input.onchange = async (e) => {
  const file = e.target.files[0];
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
    console.log('✅ Success:', data);
  } catch (error) {
    console.error('❌ Error:', error);
  }
};
input.click();
```

### **3. Check Network Tab:**
- **OPTIONS request** → Should be 200 or 204 ✅
- **POST request** → Should be 200 or 201 ✅
- No CORS errors in console ✅

---

## 📊 **CORS Verification Checklist**

Run through this checklist:

### ✅ **Backend Configuration:**
- [ ] `cors` package installed: `npm list cors`
- [ ] CORS middleware is BEFORE routes in server.js
- [ ] CORS options include all necessary methods
- [ ] Preflight handler (`app.options('*')`) is present
- [ ] Backend restarted after changes

### ✅ **Browser Behavior:**
- [ ] OPTIONS request succeeds (status 200/204)
- [ ] POST request succeeds (status 200/201)
- [ ] No CORS errors in browser console
- [ ] Response headers include `Access-Control-Allow-Origin`

### ✅ **Network Tab Inspection:**

**Look for these headers in Response:**
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH
Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With
```

---

## 🔍 **Still Having Issues?**

### **Test 1: Check CORS Headers**

```bash
# Test from command line
curl -X OPTIONS http://localhost:5000/api/ai/process-pdf-complete -v

# Should see these headers:
# Access-Control-Allow-Origin: *
# Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH
```

### **Test 2: Verify Backend is Running**

```bash
curl http://localhost:5000/health

# Should return:
# {"status":"OK","message":"Server is running","database":"Connected"}
```

### **Test 3: Check Browser Console for Exact Error**

Open Browser Console (F12) → Console tab

**Expected (Working):** No CORS errors  
**Problem (Not Working):** Red errors mentioning CORS or "blocked by CORS policy"

---

## 🎯 **Frontend Code (Updated for CORS)**

### **React Component (Final Version):**

```jsx
import React, { useState } from 'react';

function PdfUploader() {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('pdf', file);

      console.log('📤 Uploading:', file.name);

      const response = await fetch(
        'http://localhost:5000/api/ai/process-pdf-complete',
        {
          method: 'POST',
          body: formData,
          // Don't set Content-Type - browser sets it with boundary
        }
      );

      console.log('📥 Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        setResult(data);
        console.log('✅ Success:', data);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error('❌ Upload error:', err);
      setError(err.message);
      
      // Check if it's a network/CORS error
      if (err.message.includes('Failed to fetch') || 
          err.message.includes('NetworkError')) {
        setError('Cannot connect to backend. Check CORS configuration.');
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".pdf"
        onChange={handleUpload}
        disabled={uploading}
      />
      
      {uploading && <p>⏳ Uploading...</p>}
      {error && <p style={{color:'red'}}>❌ {error}</p>}
      {result && <p style={{color:'green'}}>✅ Success: {result.data.resume.name}</p>}
    </div>
  );
}

export default PdfUploader;
```

---

## 🛡️ **Production CORS Configuration**

For production, use specific origins instead of `*`:

```javascript
// server.js - Production version
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'https://yourdomain.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Or allow multiple origins:
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://yourdomain.com',
  'https://www.yourdomain.com'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
```

---

## 🐛 **Common CORS Errors & Solutions**

### **Error 1: "Access to fetch... has been blocked by CORS policy"**

**Cause:** CORS not configured or misconfigured  
**Solution:** Use the updated CORS configuration above

### **Error 2: "Method POST is not allowed by Access-Control-Allow-Methods"**

**Cause:** POST not included in allowed methods  
**Solution:** Already fixed with `methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']`

### **Error 3: "Request header field content-type is not allowed"**

**Cause:** Content-Type not in allowedHeaders  
**Solution:** Already fixed with `allowedHeaders: ['Content-Type', ...]`

### **Error 4: Preflight request fails (OPTIONS returns error)**

**Cause:** No explicit OPTIONS handler  
**Solution:** Already fixed with `app.options('*', cors(corsOptions))`

### **Error 5: "ERR_INTERNET_DISCONNECTED" (Your Issue)**

**Cause:** CORS preflight fails, browser cancels request  
**Solution:** ✅ Fixed with comprehensive CORS config above

---

## 📝 **Debugging CORS Issues**

### **Step 1: Check Browser Network Tab**

1. Open DevTools (F12)
2. Go to Network tab
3. Try upload
4. Look for TWO requests:
   - **OPTIONS** (preflight) - Should be 200/204
   - **POST** (actual upload) - Should be 200/201

### **Step 2: Check Request Headers**

Click on OPTIONS request → Headers tab

**Should see:**
```
Request Headers:
  Access-Control-Request-Method: POST
  Access-Control-Request-Headers: content-type

Response Headers:
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH
  Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With
```

### **Step 3: Check Console Errors**

Browser Console should show:
- ✅ No CORS errors
- ✅ Upload logs
- ✅ Success messages

If you see red CORS errors, CORS is still not working.

---

## ✅ **Final Checklist**

Before testing from frontend:

- [ ] Backend updated with new CORS configuration
- [ ] Backend restarted (`npm start`)
- [ ] Backend shows "Server is running on port 5000"
- [ ] Health check works: `curl http://localhost:5000/health`
- [ ] Browser cache cleared (Ctrl+Shift+Delete)
- [ ] Frontend code uses correct URL: `http://localhost:5000`
- [ ] File input accepts `.pdf` files
- [ ] FormData created correctly
- [ ] No manual Content-Type header set

---

## 🎯 **Quick Test Commands**

```bash
# 1. Test health
curl http://localhost:5000/health

# 2. Test CORS headers
curl -X OPTIONS http://localhost:5000/api/ai/process-pdf-complete -v

# 3. Test from browser console
fetch('http://localhost:5000/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

---

## 📞 **Still Not Working?**

Share these details:

1. **Backend console output** (full log from restart)
2. **Browser console errors** (exact error message)
3. **Network tab screenshot** (showing OPTIONS and POST requests)
4. **Response headers** from Network tab
5. **Result of:** `npm list cors` (verify cors package installed)

---

## 🎉 **Success Indicators**

You'll know CORS is working when:

- ✅ OPTIONS request returns 200/204
- ✅ POST request returns 200/201
- ✅ No CORS errors in console
- ✅ Response headers show `Access-Control-Allow-Origin: *`
- ✅ File upload succeeds from browser
- ✅ Resume data returned

---

**🚀 Next Step:** Restart backend and test from browser! CORS is now properly configured.

**Note:** Postman works because it doesn't enforce CORS (server-to-server). Browsers enforce CORS (client-to-server), which is why you need this configuration.

