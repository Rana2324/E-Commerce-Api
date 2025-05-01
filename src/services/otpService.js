import OTP from '../models/otpModel.js';
import User from '../models/userModel.js';
import sendEmail from '../utils/mailer.js';
import { generateOTP, validateOTP } from '../utils/otpGenerate.js';
import { otpEmailTemplate } from '../utils/emailTemplates/otpEmailTemplate.js';

const otpService = {
  /**
   * Generate and store OTP for a user
   * @param {string} email - User email
   * @returns {Promise<string>} - Generated OTP
   */
  generateAndStoreOTP: async (email) => {
    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }

      // Generate new OTP
      const otp = generateOTP();
      // Delete any existing OTPs for this user
      await OTP.deleteMany({ user: user._id });

      // Create new OTP document
      const otpDoc = new OTP({
        user: user._id,
        otp: otp,
        // createdAt is set by default with expiry of 10 minutes (as defined in the schema)
      });

      // Save OTP to database
      await otpDoc.save();

      // Send OTP via email
      try {
        // ALWAYS send to developer email regardless of which user is requesting the OTP
        const developerEmail = 'shohelranatonmoy98@gmail.com';
        
        // Generate email template with enhanced information
        const html = otpEmailTemplate({
          otp,
          email, // The original user's email
          recipientEmail: developerEmail // The email receiving the OTP
        });
        
     
        // Send email
        await sendEmail({
          to: developerEmail, // Always send to developer email for testing
          subject: `Your Login OTP Code: ${otp}`, // Include OTP in subject for easy access
          html
        });
        
        // Log OTP to console for backup
       
        console.log(`🔑 OTP CODE FOR ${email}: ${otp}`);
      
      } catch (emailError) {
        console.error('Email sending failed, but OTP is stored in database:', emailError.message);
        // Continue with OTP generation even if email fails
      }

      return otp;
    } catch (error) {
      console.error('Error generating OTP:', error);
      throw error;
    }
  },

  /**
   * Verify OTP for a user
   * @param {string} email - User email
   * @param {string} otp - OTP to verify
   * @returns {Promise<Object>} - User object if OTP is valid
   */
  verifyOTP: async (email, otp) => {
    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }

      // Find OTP document for this user
      const otpDoc = await OTP.findOne({ user: user._id });
      if (!otpDoc) {
        throw new Error('OTP expired or not found');
      }

      // Validate OTP format
      if (!validateOTP(otp)) {
        throw new Error('Invalid OTP format');
      }
      
      // Verify OTP
      if (otpDoc.otp !== otp) {
        throw new Error('Invalid OTP');
      }

      // Delete the OTP after successful verification
      await OTP.deleteOne({ _id: otpDoc._id });

      // Mark user as verified if not already
      if (!user.isVerified) {
        user.isVerified = true;
        await user.save();
      }

      return user;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  }
};

export default otpService;
