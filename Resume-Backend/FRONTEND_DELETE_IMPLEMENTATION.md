# 🗑️ Delete Resume - Frontend Implementation Guide

## 📌 API Endpoint

```
DELETE http://localhost:5000/api/resumes/:id
```

**Required:** Resume ID (24-character MongoDB ObjectId)  
**Returns:** `{success: true/false, message: "...", data: {...}}`

---

## ⚡ Quick Implementation (Copy-Paste Ready)

### **Option 1: Pure JavaScript (Fetch API)**

```javascript
const API_BASE = 'http://localhost:5000/api/resumes';

async function deleteResume(resumeId) {
  try {
    const response = await fetch(`${API_BASE}/${resumeId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Deleted:', data.data.deletedName);
      alert('Resume deleted successfully!');
      return true;
    } else {
      alert(`Failed: ${data.message}`);
      return false;
    }
  } catch (error) {
    console.error('Delete error:', error);
    alert('Cannot connect to backend. Is server running?');
    return false;
  }
}

// Usage
await deleteResume('68eabf91fc84ee4422c378d6');
```

---

### **Option 2: React Component (Complete Example)**

```jsx
import React, { useState, useEffect } from 'react';

function ResumeList() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE = 'http://localhost:5000/api/resumes';

  // Fetch all resumes on mount
  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      if (data.success) setResumes(data.data.resumes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete resume for ${name}?`)) return;

    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();

      if (data.success) {
        // Update UI immediately
        setResumes(resumes.filter(r => r._id !== id));
        alert(`✅ Deleted: ${data.data.deletedName}`);
      } else {
        alert(`❌ Failed: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      alert('❌ Cannot connect to backend');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Resumes ({resumes.length})</h1>
      {resumes.map(resume => (
        <div key={resume._id} className="resume-card">
          <h3>{resume.name}</h3>
          <p>{resume.email}</p>
          <button onClick={() => handleDelete(resume._id, resume.name)}>
            🗑️ Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ResumeList;
```

---

### **Option 3: Axios Version**

```javascript
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/resumes';

async function deleteResume(resumeId) {
  try {
    const response = await axios.delete(`${API_BASE}/${resumeId}`);
    
    if (response.data.success) {
      console.log('✅ Deleted:', response.data.data.deletedName);
      return true;
    }
    return false;
  } catch (error) {
    if (error.response) {
      alert(`Failed: ${error.response.data.message}`);
    } else {
      alert('Cannot connect to backend');
    }
    return false;
  }
}
```

---

## 📊 API Response Reference

### **Success (200 OK)**
```json
{
  "success": true,
  "message": "Resume deleted successfully",
  "data": {
    "deletedId": "68eabf91fc84ee4422c378d6",
    "deletedName": "John Doe"
  }
}
```

### **Resume Not Found (404)**
```json
{
  "success": false,
  "message": "Resume not found"
}
```

### **Invalid ID (400)**
```json
{
  "success": false,
  "message": "Invalid resume ID format. Must be 24 character hex string."
}
```

### **Server Error (500)**
```json
{
  "success": false,
  "message": "An error occurred while deleting the resume"
}
```

---

## ⚠️ Error Handling

```javascript
const deleteResume = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/resumes/${id}`, {
      method: 'DELETE'
    });

    // Parse response
    const data = await res.json();

    // Handle different status codes
    if (res.status === 404) {
      alert('Resume not found (already deleted?)');
      return false;
    }

    if (res.status === 400) {
      alert('Invalid resume ID');
      return false;
    }

    if (res.status === 500) {
      alert('Server error. Try again later.');
      return false;
    }

    if (data.success) {
      return true;
    }

    return false;

  } catch (error) {
    // Network error
    if (error.message.includes('Failed to fetch')) {
      alert('Backend not reachable. Check if server is running.');
    }
    return false;
  }
};
```

---

## 🎯 Best Practices

### **1. Always Confirm Before Delete**
```javascript
const handleDelete = async (id, name) => {
  if (!window.confirm(`Delete resume for ${name}?`)) {
    return; // User cancelled
  }
  // Proceed with delete
};
```

### **2. Update UI Immediately (Optimistic Update)**
```javascript
// Remove from state immediately after successful delete
setResumes(resumes.filter(r => r._id !== id));
```

### **3. Show Loading State**
```javascript
const [deleting, setDeleting] = useState(null);

const handleDelete = async (id) => {
  setDeleting(id);
  try {
    await deleteResume(id);
  } finally {
    setDeleting(null);
  }
};

// In render:
<button disabled={deleting === resume._id}>
  {deleting === resume._id ? 'Deleting...' : 'Delete'}
</button>
```

### **4. Validate ID Format**
```javascript
function isValidResumeId(id) {
  return /^[a-fA-F0-9]{24}$/.test(id);
}

if (!isValidResumeId(resumeId)) {
  alert('Invalid resume ID');
  return;
}
```

---

## 🔧 Complete Custom Hook (React)

```javascript
// hooks/useResumes.js
import { useState, useEffect } from 'react';

export function useResumes() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const API_BASE = 'http://localhost:5000/api/resumes';

  const fetchResumes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      if (data.success) {
        setResumes(data.data.resumes);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      
      if (data.success) {
        setResumes(resumes.filter(r => r._id !== id));
        return { success: true, name: data.data.deletedName };
      }
      return { success: false, error: data.message };
    } catch (err) {
      return { success: false, error: 'Cannot connect to backend' };
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return { resumes, loading, error, deleteResume, refetch: fetchResumes };
}

// Usage in component:
import { useResumes } from './hooks/useResumes';

function ResumeList() {
  const { resumes, loading, deleteResume } = useResumes();

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete ${name}?`)) return;
    
    const result = await deleteResume(id);
    if (result.success) {
      alert(`Deleted: ${result.name}`);
    } else {
      alert(`Failed: ${result.error}`);
    }
  };

  // ... render logic
}
```

---

## 🧪 Testing Checklist

- [ ] Delete works for valid ID
- [ ] Shows error for invalid ID
- [ ] Shows error for non-existent resume (404)
- [ ] Confirmation dialog appears
- [ ] UI updates after successful delete
- [ ] Multiple deletes work in succession
- [ ] Error messages are user-friendly
- [ ] Loading state shows during delete

---

## 🚨 Common Issues

### **Issue: "Cannot connect to backend"**
**Fix:** Make sure backend is running on `http://localhost:5000`
```bash
cd backend
npm start
```

### **Issue: CORS Error**
**Fix:** Backend already has CORS enabled. Clear browser cache and try again.

### **Issue: Resume Not Found (404)**
**Fix:** Resume was already deleted. Refresh the list to get current data.

---

## 📝 Quick Reference

| What | How |
|------|-----|
| **Endpoint** | `DELETE http://localhost:5000/api/resumes/:id` |
| **Headers** | `Content-Type: application/json` |
| **Success Response** | `{success: true, data: {deletedId, deletedName}}` |
| **Error Response** | `{success: false, message: "..."}` |
| **Status Codes** | 200 (success), 404 (not found), 400 (invalid ID), 500 (error) |

---

## ✅ Final Implementation

```javascript
// api.js - Centralized API functions
const API_BASE = 'http://localhost:5000/api/resumes';

export const resumeAPI = {
  // Get all resumes
  getAll: async () => {
    const res = await fetch(API_BASE);
    return res.json();
  },

  // Delete resume
  delete: async (id) => {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    return res.json();
  }
};

// In your component:
import { resumeAPI } from './api';

const handleDelete = async (id) => {
  const result = await resumeAPI.delete(id);
  if (result.success) {
    alert('Deleted!');
    // Update UI
  } else {
    alert(result.message);
  }
};
```

---

**That's it!** Choose the implementation that fits your tech stack and you're ready to go. 🚀

**Need help?** Backend logs show detailed info for debugging.

