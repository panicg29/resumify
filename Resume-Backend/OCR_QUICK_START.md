# OCR API Quick Start Guide

Get up and running with OCR functionality in 3 minutes!

## Step 1: Get API Key (1 minute)

1. Visit [OCR.Space - Free API Key](https://ocr.space/ocrapi/freekey)
2. Register and get your API key
3. Copy the API key

## Step 2: Configure (30 seconds)

Add to your `.env` file:

```env
OCR_SPACE_API_KEY=your_api_key_here
```

## Step 3: Start Server (30 seconds)

```bash
npm start
```

## Step 4: Test It! (1 minute)

### Test Health Check

```bash
curl http://localhost:5000/api/ocr/health
```

### Test File Upload

```bash
curl -X POST http://localhost:5000/api/ocr/file \
  -F "file=@/path/to/your/document.pdf"
```

### Test URL Processing

```bash
curl -X POST http://localhost:5000/api/ocr/url \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/document.pdf"}'
```

## That's It! 🎉

Your OCR API is ready. The endpoints will:
- Extract text from uploaded images (JPEG, PNG, GIF, BMP, TIFF)
- Extract text from uploaded PDFs
- Process remote files via URL
- Support multiple languages
- Provide detailed error messages

## Available Endpoints

- `POST /api/ocr/file` - Upload file for OCR
- `POST /api/ocr/url` - Process remote file URL
- `GET /api/ocr/health` - Check service status

## Supported File Types

- **Images**: JPEG, JPG, PNG, GIF, BMP, TIFF
- **Documents**: PDF

## Supported Languages

- English (`eng`) - Default
- Arabic (`ara`)
- Chinese Simplified (`chi_sim`)
- Chinese Traditional (`chi_tra`)
- German (`deu`)
- French (`fra`)
- Japanese (`jpn`)
- Korean (`kor`)
- Portuguese (`por`)
- Russian (`rus`)
- Spanish (`spa`)
- Hindi (`hin`)
- Bengali (`ben`)

## Example Response

```json
{
  "success": true,
  "message": "Text extracted successfully",
  "data": {
    "extractedText": "Your extracted text here...",
    "fileInfo": {
      "originalName": "document.pdf",
      "mimetype": "application/pdf",
      "size": 123456
    },
    "rawResponse": {
      "ParsedResults": [...]
    }
  }
}
```

## Need More Help?

- See [OCR_SETUP.md](./OCR_SETUP.md) for detailed documentation
- See [OCR_POSTMAN_COLLECTION.json](./OCR_POSTMAN_COLLECTION.json) for Postman tests
- Check [OCR_ENV_EXAMPLE.md](./OCR_ENV_EXAMPLE.md) for environment setup

