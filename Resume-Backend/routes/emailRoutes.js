const express = require('express');
const { sendGreetingEmail, verifyConnection } = require('../utils/sendEmail');

const router = express.Router();

/**
 * @route   POST /api/email/send-greeting
 * @desc    Send a predefined greeting message to a user's email address
 * @access  Public
 * @body    { "email": "user@example.com" }
 */
router.post('/send-greeting', async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email is provided
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required'
      });
    }

    // Validate email format (basic check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address format'
      });
    }

    console.log(`📧 Request to send greeting email to: ${email}`);

    // Send greeting email with predefined message
    const result = await sendGreetingEmail(email, {
      subject: "Welcome to Our App!",
      message: "Hey there! Thanks for signing up. We're excited to have you 🎉"
    });

    // Return response based on result
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Email sent!',
        data: {
          email: email,
          messageId: result.messageId
        }
      });
    } else {
      return res.status(500).json({
        success: false,
        message: result.message || 'Email failed',
        error: result.error
      });
    }

  } catch (error) {
    console.error('❌ Error in send-greeting route:', error);
    console.error('Error stack:', error.stack);
    
    return res.status(500).json({
      success: false,
      message: 'Email failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @route   POST /api/email/verify
 * @desc    Verify SMTP connection configuration
 * @access  Public
 */
router.post('/verify', async (req, res) => {
  try {
    console.log('🔍 Verifying SMTP connection...');
    console.log('Environment check:');
    console.log('- BREVO_EMAIL:', process.env.BREVO_EMAIL ? `Set (${process.env.BREVO_EMAIL})` : '✗ MISSING');
    console.log('- BREVO_API_KEY:', process.env.BREVO_API_KEY ? `Set (length: ${process.env.BREVO_API_KEY.length})` : '✗ MISSING');
    
    if (!process.env.BREVO_EMAIL || !process.env.BREVO_API_KEY) {
      return res.status(400).json({
        success: false,
        message: 'SMTP credentials not configured',
        details: {
          BREVO_EMAIL: !!process.env.BREVO_EMAIL,
          BREVO_API_KEY: !!process.env.BREVO_API_KEY,
          hint: 'Add BREVO_EMAIL and BREVO_API_KEY to your .env file'
        }
      });
    }
    
    const isVerified = await verifyConnection();

    if (isVerified) {
      return res.status(200).json({
        success: true,
        message: 'SMTP connection verified successfully',
        email: process.env.BREVO_EMAIL
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'SMTP connection verification failed. Check your credentials.',
        hint: 'Make sure you are using the SMTP API key (not the regular API key) from Brevo dashboard'
      });
    }
  } catch (error) {
    console.error('❌ Error verifying SMTP connection:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    return res.status(500).json({
      success: false,
      message: 'Failed to verify SMTP connection',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      errorCode: error.code,
      hint: error.code === 'EAUTH' ? 'Authentication failed. Check if BREVO_API_KEY is the SMTP key (not the API key).' : undefined
    });
  }
});

/**
 * @route   GET /api/email/config-check
 * @desc    Check if email configuration is set (without testing connection)
 * @access  Public
 */
router.get('/config-check', (req, res) => {
  const config = {
    BREVO_EMAIL: process.env.BREVO_EMAIL ? '✓ Set' : '✗ Missing',
    BREVO_API_KEY: process.env.BREVO_API_KEY ? `✓ Set (${process.env.BREVO_API_KEY.length} chars)` : '✗ Missing',
    BREVO_FROM_NAME: process.env.BREVO_FROM_NAME || 'Using default: ResumeFy'
  };
  
  const allSet = process.env.BREVO_EMAIL && process.env.BREVO_API_KEY;
  
  return res.status(allSet ? 200 : 400).json({
    success: allSet,
    message: allSet ? 'Email configuration found' : 'Email configuration incomplete',
    config: config,
    hint: !allSet ? 'Add missing variables to your .env file' : 'Use POST /api/email/verify to test the connection'
  });
});

module.exports = router;

