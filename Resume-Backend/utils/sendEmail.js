const nodemailer = require('nodemailer');

/**
 * Email Service Helper
 * Handles email sending using Nodemailer with SMTP provider (Brevo/Sendinblue)
 * 
 * Required Environment Variables:
 * - BREVO_EMAIL: Your verified sender email address (currently: resumefy.ai@gmail.com)
 * - BREVO_API_KEY: Your Brevo SMTP API key (get from https://www.brevo.com/)
 * 
 * Optional Environment Variables:
 * - BREVO_FROM_NAME: Display name for sender (default: "ResumeFy")
 * - BREVO_SMTP_LOGIN: SMTP login username (e.g., 9a8af3001@smtp-brevo.com)
 *                     If not set, will use BREVO_EMAIL for authentication
 * 
 * To get Brevo credentials:
 * 1. Sign up at https://www.brevo.com/ (300 emails/day free)
 * 2. Go to Settings → SMTP & API section in dashboard
 * 3. Create an SMTP key and note your SMTP Login (shown on the same page)
 * 4. Use your verified email as BREVO_EMAIL
 * 5. Use the SMTP key as BREVO_API_KEY
 * 6. Optionally set BREVO_SMTP_LOGIN if your account requires it
 */

// Initialize transporter with SMTP configuration
const createTransporter = () => {
  // Check if required environment variables are set
  if (!process.env.BREVO_EMAIL || !process.env.BREVO_API_KEY) {
    throw new Error('Missing email configuration: BREVO_EMAIL and BREVO_API_KEY must be set in environment variables');
  }

  // Determine SMTP login username
  // Brevo allows using either:
  // 1. SMTP Login (format: xxxxx@smtp-brevo.com) - account-specific
  // 2. Verified email address - if email is verified
  const smtpLogin = process.env.BREVO_SMTP_LOGIN 
    ? process.env.BREVO_SMTP_LOGIN.trim() 
    : process.env.BREVO_EMAIL.trim();

  // Log configuration (without exposing full key)
  console.log('📧 SMTP Configuration:');
  console.log('  Host: smtp-relay.brevo.com');
  console.log('  Port: 587');
  console.log('  SMTP Login:', smtpLogin);
  console.log('  From Email:', process.env.BREVO_EMAIL);
  console.log('  API Key:', process.env.BREVO_API_KEY.substring(0, 10) + '...' + ' (length: ' + process.env.BREVO_API_KEY.length + ')');

  // Create transporter using Brevo SMTP
  // Brevo (formerly Sendinblue) SMTP settings
  // IMPORTANT: The email address MUST be verified in Brevo's Senders section
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // true for 465, false for other ports (587 uses STARTTLS)
    auth: {
      user: smtpLogin, // Use SMTP login if provided, otherwise use email
      pass: process.env.BREVO_API_KEY.trim() // Trim whitespace
    },
    // Connection settings
    connectionTimeout: 15000, // 15 seconds
    greetingTimeout: 5000, // 5 seconds
    socketTimeout: 15000, // 15 seconds
    // Enable debug for troubleshooting (set NODE_ENV=development to see)
    debug: process.env.NODE_ENV === 'development',
    logger: process.env.NODE_ENV === 'development'
  });

  return transporter;
};

/**
 * Verify SMTP connection
 * @returns {Promise<boolean>}
 */
const verifyConnection = async () => {
  try {
    console.log('🔍 Creating SMTP transporter...');
    const transporter = createTransporter();
    
    console.log('🔍 Verifying SMTP connection...');
    await transporter.verify();
    
    console.log('✅ SMTP connection verified successfully');
    return true;
  } catch (error) {
    console.error('❌ SMTP connection verification failed');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Error response:', error.response);
    console.error('Error command:', error.command);
    
    if (error.code === 'EAUTH') {
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('AUTHENTICATION FAILED - Possible reasons:');
      console.error('1. Email address is not verified in Brevo');
      console.error('   → Go to Brevo Dashboard → Senders → Verify resumefy.ai@gmail.com');
      console.error('2. SMTP key is incorrect or expired');
      console.error('   → Go to Brevo Dashboard → SMTP & API → Regenerate SMTP key');
      console.error('3. Email and SMTP key mismatch');
      console.error('   → Ensure BREVO_EMAIL matches the verified sender email');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    }
    
    return false;
  }
};

/**
 * Send greeting email to a user
 * @param {string} toEmail - Recipient email address
 * @param {Object} options - Optional parameters (subject, message)
 * @returns {Promise<Object>} - Result object with success status and message
 */
const sendGreetingEmail = async (toEmail, options = {}) => {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!toEmail || !emailRegex.test(toEmail)) {
      throw new Error('Invalid email address format');
    }

    // Default values
    const subject = options.subject || "Welcome to Our App!";
    const message = options.message || "Hey there! Thanks for signing up. We're excited to have you 🎉";
    // Use BREVO_EMAIL from environment (should be your verified sender email in Brevo)
    // Currently using: resumefy.ai@gmail.com (verified in Brevo)
    const fromEmail = process.env.BREVO_EMAIL || 'resumefy.ai@gmail.com';
    const fromName = process.env.BREVO_FROM_NAME || 'ResumeFy';

    // Create transporter
    const transporter = createTransporter();

    // Email options
    const mailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: toEmail,
      subject: subject,
      text: message,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h1 style="color: #2c3e50; margin-top: 0;">${subject}</h1>
            <p style="font-size: 16px; margin-bottom: 0;">${message}</p>
          </div>
          <p style="font-size: 14px; color: #666; margin-top: 30px;">
            Best regards,<br>
            The Team
          </p>
        </body>
        </html>
      `
    };

    // Send email
    console.log(`📧 Sending greeting email to: ${toEmail}`);
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully:', {
      messageId: info.messageId,
      to: toEmail,
      accepted: info.accepted,
      rejected: info.rejected
    });

    return {
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId
    };

  } catch (error) {
    console.error('❌ Error sending email:', error);
    console.error('Error code:', error.code);
    console.error('Error command:', error.command);
    console.error('Full error:', JSON.stringify(error, null, 2));
    
    // Handle specific SMTP errors
    if (error.code === 'EAUTH') {
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('SMTP Authentication Error Details:');
      console.error('BREVO_EMAIL:', process.env.BREVO_EMAIL ? '✓ Set' : '✗ Missing');
      console.error('BREVO_API_KEY:', process.env.BREVO_API_KEY ? '✓ Set (length: ' + process.env.BREVO_API_KEY.length + ')' : '✗ Missing');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      return {
        success: false,
        message: 'Email authentication failed. Please check SMTP credentials.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        details: process.env.NODE_ENV === 'development' ? {
          hint: 'Make sure you are using the SMTP API key (not the regular API key) from Brevo',
          emailSet: !!process.env.BREVO_EMAIL,
          apiKeySet: !!process.env.BREVO_API_KEY,
          apiKeyLength: process.env.BREVO_API_KEY ? process.env.BREVO_API_KEY.length : 0
        } : undefined
      };
    }
    
    if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      console.error('SMTP Connection Error: Could not connect to SMTP server');
      return {
        success: false,
        message: 'Email service temporarily unavailable. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      };
    }

    return {
      success: false,
      message: 'Failed to send email',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    };
  }
};

/**
 * Generic email sender
 * @param {Object} options - Email options { to, subject, text, html }
 * @returns {Promise<Object>}
 */
const sendEmail = async (options) => {
  try {
    const { to, subject, text, html } = options;

    if (!to || !subject || (!text && !html)) {
      throw new Error('Missing required email fields: to, subject, and text or html');
    }

    const transporter = createTransporter();
    // Use BREVO_EMAIL from environment (should be your verified sender email in Brevo)
    // Currently using: resumefy.ai@gmail.com (verified in Brevo)
    const fromEmail = process.env.BREVO_EMAIL || 'resumefy.ai@gmail.com';
    const fromName = process.env.BREVO_FROM_NAME || 'ResumeFy';

    const mailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: to,
      subject: subject,
      text: text,
      html: html
    };

    const info = await transporter.sendMail(mailOptions);
    
    return {
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId
    };

  } catch (error) {
    console.error('❌ Error sending email:', error);
    return {
      success: false,
      message: 'Failed to send email',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    };
  }
};

module.exports = {
  sendGreetingEmail,
  sendEmail,
  verifyConnection,
  createTransporter
};

