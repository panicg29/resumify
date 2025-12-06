# Postman Setup for AWS Textract API

## Quick Setup

### 1. Request Configuration

**Method:** `POST`  
**URL:** `http://localhost:5000/api/ai/analyze-file`

### 2. Body Settings

1. Go to **Body** tab
2. Select **form-data**
3. Add a new field:
   - **Key:** `file` (change type from "Text" to **"File"**)
   - **Value:** Click "Select Files" and choose your PDF or image

### 3. Optional Query Parameters

For simple text extraction only (cheaper):
```
http://localhost:5000/api/ai/analyze-file?analysis=false
```

### 4. Send Request

Click **Send** and wait for response.

---

## Example Response

```json
{
  "success": true,
  "message": "File analyzed successfully using AWS Textract (analyzeDocument)",
  "data": {
    "fileInfo": {
      "fileName": "resume.pdf",
      "fileSize": 123456,
      "fileType": "pdf"
    },
    "text": "Extracted text content...",
    "keyValuePairs": [
      {
        "key": "Name",
        "value": "John Doe"
      }
    ],
    "tables": [],
    "pageCount": 1,
    "method": "analyzeDocument",
    "summary": {
      "textLength": 1234,
      "keyValuePairsCount": 5,
      "tablesCount": 0,
      "pages": 1
    }
  }
}
```

---

## Health Check

**Method:** `GET`  
**URL:** `http://localhost:5000/api/ai/health`

---

## Troubleshooting

- **400 Error:** Invalid file format (use PDF, PNG, JPEG, or TIFF)
- **503 Error:** AWS credentials not configured in `.env`
- **401 Error:** Invalid AWS credentials

