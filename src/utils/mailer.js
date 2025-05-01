import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Declare transporter variable to be used for sending emails
let transporter = null;
let testAccount = null;

/**
 * Initialize the email transporter with Gmail credentials
 */
const initializeTransporter = async () => {
  try {
    // Check if we have environment variables for email
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      console.log('Setting up Gmail transporter with:', process.env.EMAIL_USER);
      
      // Create a transporter using Gmail
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER || 'shohelranatonmoy98@gmail.com',
          pass: process.env.EMAIL_PASSWORD || 'utwk mngf vzuy vpbh'
        }
      });
      
      console.log('Gmail transporter initialized successfully');
    } else {
      console.warn('Email credentials not found in environment variables');
      console.log('Attempting to create Ethereal test account...');
      
      // Create a test account using Ethereal for development
      testAccount = await nodemailer.createTestAccount();
      
      // Create a transporter using the test account
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      
      console.log('Ethereal test account created for email testing');
    }
  } catch (error) {
    console.error('Failed to initialize email transporter:', error);
    transporter = null;
  }
};

/**
 * Send email using nodemailer
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - Email HTML content
 * @returns {Promise} - Nodemailer send mail promise
 */
const sendEmail = async ({ to, subject, html }) => {
  // Always send to this developer email for testing
  const developerEmail = 'shohelranatonmoy98@gmail.com';
  
  // Override the recipient to always be the developer email
  to = developerEmail;

  // Make sure transporter is initialized
  if (!transporter) {
    await initializeTransporter();
  }
  
  // If we still don't have a transporter, just log and return
  if (!transporter) {
    console.error('Failed to initialize email transporter. Cannot send email.');
    return { 
      messageId: `mock-${Date.now()}`,
      accepted: [to],
      mock: true
    };
  }
  
  try {
    // Prepare email options
    const mailOptions = {
      from: testAccount ? testAccount.user : (process.env.EMAIL_USER || 'shohelranatonmoy98@gmail.com'),
      to: developerEmail, // Always send to developer email
      subject: `${subject} [FORCED TO: ${developerEmail}]`, // Make it clear this was forced
      html
    };
    
    console.log(`📧 FORCING EMAIL TO: ${developerEmail} (regardless of original recipient)`);

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    
    // If using Ethereal, provide preview URL
    if (testAccount) {
      console.log('Email sent successfully!');
      console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    } else {
      console.log('Email sent successfully:', info.messageId);
    }
    
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    // Don't throw error in development mode
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Failed to send email');
    } else {
      console.log('Continuing despite email error (development mode)');
      return { 
        messageId: `error-${Date.now()}`,
        accepted: [to],
        error: true
      };
    }
  }
};

export default sendEmail;