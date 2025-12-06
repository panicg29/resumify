# Environment Variables Example

Add the following to your `.env` file:

```env
# OCR.Space API Configuration (Required)
OCR_SPACE_API_KEY=your_ocr_space_api_key_here

# Get your API key from: https://ocr.space/ocrapi/freekey
# Free tier includes 25,000 requests per day

# Other existing environment variables
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
PORT=5000
HOST=0.0.0.0
NODE_ENV=development

# MongoDB Configuration (if needed)
# MONGO_URI=your_mongodb_connection_string_here

# AWS Textract Configuration (optional)
# AWS_ACCESS_KEY_ID=your_aws_access_key_id_here
# AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key_here
# AWS_REGION=us-east-1

# Email Configuration (optional)
# BREVO_EMAIL=your_email@example.com
# BREVO_API_KEY=your_brevo_api_key_here
# BREVO_SMTP_LOGIN=your_smtp_login_here
```

## Getting Your OCR.Space API Key

1. Visit [OCR.Space API - Free Key](https://ocr.space/ocrapi/freekey)
2. Register for a free account
3. Copy your API key from the dashboard
4. Paste it in your `.env` file as `OCR_SPACE_API_KEY`

## Free Tier Limits

- **25,000 requests per day**
- **Up to 10MB file size**
- **1 request per second**

For higher limits, consider upgrading to a paid plan.

