# Enable AWS Textract Service - Quick Fix

## Error: "SubscriptionRequiredException"

If you're seeing this error:
```
The AWS Access Key Id needs a subscription for the service
```

**This means AWS Textract is not enabled in your AWS account.**

## Solution: Enable Textract (2 minutes)

### Step 1: Go to AWS Textract Console

1. Open [AWS Console](https://console.aws.amazon.com/)
2. Search for **"Textract"** in the services search bar
3. Click on **Amazon Textract**

### Step 2: Enable the Service

1. You'll see a page with Textract information
2. Click **"Get started"** or **"Enable Textract"** button
3. Review and accept any terms if prompted
4. Wait 1-2 minutes for activation

### Step 3: Verify Activation

1. Go back to Textract console
2. You should see the Textract dashboard (not a "get started" page)
3. Try your API request again

## Alternative: Enable via AWS CLI

```bash
aws textract get-document-text-detection --document '{"S3Object":{"Bucket":"test","Name":"test.pdf"}}' --region us-east-1
```

This will trigger the enablement process if you have AWS CLI configured.

## Quick Links

- **Textract Console (us-east-1):** https://console.aws.amazon.com/textract/home?region=us-east-1
- **Textract Console (us-west-2):** https://console.aws.amazon.com/textract/home?region=us-west-2

## After Enabling

1. Wait 1-2 minutes for the service to activate
2. Try your API request again
3. The error should be resolved

## Note

- Textract has a **free tier**: 1,000 pages/month for first 3 months
- No credit card required for free tier
- Service activation is usually instant but can take a few minutes

---

**Once enabled, your API will work!** 🚀

