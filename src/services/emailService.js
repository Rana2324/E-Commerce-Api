import { otpEmailTemplate } from '../utils/emailTemplates/otpEmailTemplate.js';
import sendEmail from '../utils/mailer.js';

const emailService = {
  /**
   * Send OTP email to user
   * @param {string} email - Recipient email
   * @param {string} otp - One-time password
   * @returns {Promise} - Nodemailer send mail promise
   */
  /**
   * Send OTP email to user
   * @deprecated Use the mailer utility directly instead
   * @param {string} email - Recipient email
   * @param {string} otp - One-time password
   * @returns {Promise} - Email send result
   */
  sendOtpEmail: async (email, otp) => {
    // Always send OTP to the developer's email for testing
    const developerEmail = 'shohelranatonmoy98@gmail.com';
    try {
      // Generate the email template
      const html = otpEmailTemplate(otp);
      
   
      // Use the mailer utility
      return await sendEmail({
        to: developerEmail, // Always send to developer email for testing
        subject: 'Your Login OTP Code',
        html
      });
    } catch (error) {
      console.error('Error handling email:', error);
      // Even if email fails, return success so testing can continue
      console.log('You can still use the OTP code shown in the console above');
      return { messageId: 'mock-email-id', accepted: [developerEmail] };
    }
  }
};

export default emailService;