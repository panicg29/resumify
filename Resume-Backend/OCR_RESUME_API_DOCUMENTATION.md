# OCR Resume API Documentation

## Endpoint

```
POST /api/ocr/file
```

## Description

Upload a resume file (PDF or image), extract text using OCR, parse it with AI, and automatically create a structured resume in the database.

## Request

### Method
```
POST
```

### URL
```
http://localhost:5000/api/ocr/file
```

### Headers
```
Content-Type: multipart/form-data
```

### Body (Form Data)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | File | Yes | Resume file to upload |
| `userId` | String | No | User ID to associate with resume |
| `template` | String | No | Template name (default: "template1") |
| `language` | String | No | OCR language code (default: "eng") |
| `OCREngine` | Number | No | OCR engine 1 or 2 (default: 2) |

### Supported File Types

- **PDF**: `application/pdf`
- **Images**: `image/jpeg`, `image/jpg`, `image/png`, `image/gif`, `image/bmp`, `image/tiff`

### File Constraints

- **Maximum Size**: 10MB
- **Must contain**: Readable resume text

## Response

### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Resume created successfully from file",
  "data": {
    "resume": {
      "_id": "692b65eb915f596fc6f02ec2",
      "userId": null,
      "name": "Francisco Andrade",
      "email": "hello@reallygreatsite.com",
      "phone": "+123-456-7890",
      "summary": "Experienced Marketing Manager & Specialist...",
      "education": [
        {
          "_id": "692b65eb915f596fc6f02ec3",
          "degree": "Master of Business Management",
          "institution": "Wardiere University",
          "year": 2031,
          "gpa": "3.8 / 4.0"
        }
      ],
      "experience": [
        {
          "_id": "692b65eb915f596fc6f02ec5",
          "title": "Marketing Manager & Specialist",
          "company": "Borcelle Studio",
          "startDate": "2030-01-01T00:00:00.000Z",
          "endDate": null,
          "current": true,
          "description": "Lorem ipsum dolor sit amet..."
        }
      ],
      "skills": [
        {
          "_id": "692b65eb915f596fc6f02ec8",
          "name": "Project Management",
          "level": "Intermediate"
        }
      ],
      "projects": [],
      "template": "template1",
      "createdAt": "2025-11-29T21:30:19.226Z",
      "updatedAt": "2025-11-29T21:30:19.226Z",
      "__v": 0
    }
  }
}
```

### Error Response (400 Bad Request)

```json
{
  "success": false,
  "message": "No file uploaded",
  "error": "Please provide a file in the request. Use multipart/form-data with key \"file\"."
}
```

### Error Response (400 Bad Request - Invalid File)

```json
{
  "success": false,
  "message": "Invalid file type",
  "error": "Invalid file type. Allowed types: .jpg, .jpeg, .png, .gif, .bmp, .tiff, .tif, .pdf"
}
```

### Error Response (400 Bad Request - File Too Large)

```json
{
  "success": false,
  "message": "File too large",
  "error": "File size exceeds the 10MB limit"
}
```

### Error Response (500 Internal Server Error)

```json
{
  "success": false,
  "message": "Failed to create resume from file",
  "error": "OCR_SPACE_API_KEY is not set in environment variables"
}
```

## Example Request

### cURL

```bash
curl -X POST http://localhost:5000/api/ocr/file \
  -F "file=@/path/to/resume.pdf" \
  -F "userId=user123" \
  -F "template=template1"
```

### JavaScript (Fetch)

```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('userId', 'user123');
formData.append('template', 'template1');

const response = await fetch('http://localhost:5000/api/ocr/file', {
  method: 'POST',
  body: formData
});

const data = await response.json();
```

### JavaScript (Axios)

```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('userId', 'user123');

const response = await axios.post(
  'http://localhost:5000/api/ocr/file',
  formData,
  {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
);
```

## Processing Flow

1. **File Upload**: Receives file via multipart/form-data
2. **OCR Processing**: Extracts text using OCR.Space API
3. **AI Parsing**: Parses extracted text using OpenAI GPT-4
4. **Database Save**: Creates and saves structured resume
5. **Response**: Returns created resume object

## Notes

- Files are automatically deleted after processing
- Processing time: 5-30 seconds (depends on file size and complexity)
- Requires valid `OCR_SPACE_API_KEY` and `OPENAI_API_KEY` in backend environment
- The endpoint automatically handles text extraction, parsing, and saving

## Related Documentation

- [Frontend Implementation Guide](./FRONTEND_OCR_RESUME_GUIDE.md)
- [OCR Setup Guide](./OCR_SETUP.md)

