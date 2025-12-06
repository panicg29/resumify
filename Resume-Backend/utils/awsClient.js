const AWS = require('aws-sdk');
require('dotenv').config();

/**
 * AWS Client Configuration Utility
 * 
 * Initializes and configures AWS SDK for Textract service.
 * 
 * Environment Variables Required:
 * - AWS_ACCESS_KEY_ID: Your AWS access key ID
 * - AWS_SECRET_ACCESS_KEY: Your AWS secret access key
 * - AWS_REGION: AWS region (e.g., 'us-east-1', 'us-west-2')
 * 
 * AWS Textract Features:
 * - Text extraction from PDFs and images
 * - Form data extraction (key-value pairs)
 * - Table extraction
 * - Multi-page document support
 * - Handles scanned documents, complex layouts, and forms
 */

class AWSClient {
  constructor() {
    this.textract = null;
    this.isConfigured = false;
    this.initializeClient();
  }

  /**
   * Initialize AWS SDK and Textract client
   */
  initializeClient() {
    try {
      const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
      const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
      // AWS Textract requires a region - default to us-east-1 (most common)
      // Note: AWS Textract is NOT a global service, region is mandatory
      const region = process.env.AWS_REGION || 'us-east-1';

      // Check if credentials are provided
      if (!accessKeyId || !secretAccessKey) {
        console.warn('⚠️  AWS credentials not configured. Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables.');
        return;
      }

      // Log region being used
      if (!process.env.AWS_REGION) {
        console.log(`ℹ️  AWS_REGION not set, using default: ${region}`);
        console.log('   You can set AWS_REGION in .env to use a different region.');
      }

      // Configure AWS SDK
      AWS.config.update({
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
        region: region
      });

      // Initialize Textract client
      this.textract = new AWS.Textract({
        apiVersion: '2018-06-27',
        region: region
      });

      this.isConfigured = true;
      console.log(`✅ AWS Textract client initialized successfully (region: ${region})`);
    } catch (error) {
      console.error('❌ Failed to initialize AWS Textract client:', error.message);
      this.isConfigured = false;
    }
  }

  /**
   * Check if AWS Textract is configured and available
   * @returns {boolean} True if configured and ready to use
   */
  isAvailable() {
    return this.isConfigured && this.textract !== null;
  }

  /**
   * Get AWS Textract client instance
   * @returns {AWS.Textract|null} Textract client or null if not configured
   */
  getTextractClient() {
    if (!this.isAvailable()) {
      throw new Error('AWS Textract is not configured. Please set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_REGION environment variables.');
    }
    return this.textract;
  }

  /**
   * Get status information about AWS configuration
   * @returns {Object} Status information
   */
  getStatus() {
    const region = process.env.AWS_REGION || 'us-east-1'; // Default region
    return {
      isConfigured: this.isConfigured,
      isAvailable: this.isAvailable(),
      hasAccessKey: !!process.env.AWS_ACCESS_KEY_ID,
      hasSecretKey: !!process.env.AWS_SECRET_ACCESS_KEY,
      region: region,
      regionSet: !!process.env.AWS_REGION, // Whether explicitly set or using default
      note: !process.env.AWS_REGION ? 'Using default region (us-east-1). Set AWS_REGION to use a different region.' : 'Region explicitly set'
    };
  }
}

// Create singleton instance
const awsClient = new AWSClient();

module.exports = {
  AWSClient,
  awsClient
};

