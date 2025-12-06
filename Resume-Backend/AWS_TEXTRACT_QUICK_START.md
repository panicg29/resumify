# AWS Textract Quick Start Guide

Get up and running with AWS Textract in 5 minutes!

## Step 1: Get AWS Credentials (2 minutes)

1. Go to [AWS Console](https://console.aws.amazon.com/) and sign in
2. Navigate to **IAM** → **Users** → **Create User**
3. Username: `textract-user`
4. Attach policy: **AmazonTextractFullAccess**
5. Create user and **copy the Access Key ID and Secret Access Key**

## Step 2: Configure Environment Variables (1 minute)

Add to your `.env` file:

```env
AWS_ACCESS_KEY_ID=your_access_key_id_here
AWS_SECRET_ACCESS_KEY=your_secret_access_key_here
AWS_REGION=us-east-1  # Optional: defaults to us-east-1 if not set
```

**Note:** `AWS_REGION` is optional. If not set, it defaults to `us-east-1` (most common region). You can set it to any region where Textract is available (e.g., `us-west-2`, `eu-west-1`, `ap-southeast-1`).

## Step 3: Start Server (30 seconds)

```bash
npm start
```

## Step 4: Test It! (1 minute)

### Option A: Using Test Script

```bash
# Update TEST_FILE_PATH in test-textract.js to point to your PDF/image
node test-textract.js
```

### Option B: Using cURL

```bash
curl -X POST http://localhost:5000/api/ai/analyze-file \
  -F "file=@/path/to/your/document.pdf"
```

### Option C: Using Postman

1. Method: `POST`
2. URL: `http://localhost:5000/api/ai/analyze-file`
3. Body → form-data → Key: `file` (File type) → Select your PDF/image

## Step 5: Check Health

```bash
curl http://localhost:5000/api/ai/health
```

## That's It! 🎉

Your AWS Textract integration is ready. The endpoint will:
- Extract text from PDFs and images
- Extract forms (key-value pairs)
- Extract tables
- Handle multi-page documents automatically

## API Endpoint

**POST** `/api/ai/analyze-file`

**Query Parameters:**
- `?analysis=false` - Use simple text extraction only (cheaper)

**Response:**
```json
{
  "success": true,
  "data": {
    "text": "Extracted text...",
    "keyValuePairs": [...],
    "tables": [...],
    "pageCount": 1
  }
}
```

## Troubleshooting

**"AWS Textract is not configured"**
- Check `.env` file has all 3 variables
- Restart server after updating `.env`

**"AccessDeniedException"**
- Verify IAM user has `AmazonTextractFullAccess` policy
- Check access keys are correct

**Need more help?**
- See `AWS_TEXTRACT_SETUP.md` for detailed documentation

