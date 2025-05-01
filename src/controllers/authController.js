
import { registerSchema, loginSchema, otpRequestSchema, otpVerifySchema } from '../validators/authValidator.js';
import authService from '../services/authService.js';
import otpService from '../services/otpService.js';


//authentication controller

const authController = {
  register: async (req, res) => {
    try {
      const { error, value } = registerSchema.validate(req.body, { abortEarly: false });
      if (error) {
        const messages = error.details.map(err => err.message);
        return res.status(400).json({ errors: messages });
      }

      await authService.register(value);
      res.status(201).json({ message: "User created successfully" });

    } catch (error) {
      if (error.message === 'User already exists') {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { error, value } = loginSchema.validate(req.body, { abortEarly: false });
      if (error) {
        const messages = error.details.map(err => ({
          field: err.context.key,
          message: err.message,
        }));
        return res.status(400).json({ errors: messages });
      }

      const { email, password } = value;
      const result = await authService.login(email, password);
      
      res.status(200).json({
        message: "Login successfully",
        ...result
      });

    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ message: error.message });
      }
      if (error.message === 'Invalid credentials') {
        return res.status(401).json({ message: error.message });
      }
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  /**
   * Request OTP for login
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  loginOtpRequest: async (req, res) => {
    try {
      // Validate request body
      const { error, value } = otpRequestSchema.validate(req.body, { abortEarly: false });
      if (error) {
        const messages = error.details.map(err => ({
          field: err.context.key,
          message: err.message,
        }));
        return res.status(400).json({ errors: messages });
      }

      const { email } = value;
      
      // Generate and send OTP
      await otpService.generateAndStoreOTP(email);
      
      res.status(200).json({
        message: "OTP sent to your email"
      });

    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ message: error.message });
      }
      console.error("OTP request error:", error);
      res.status(500).json({ message: "Failed to send OTP" });
    }
  },

  /**
   * Verify OTP and complete login
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  loginOtpVerify: async (req, res) => {
    try {
      // Validate request body
      const { error, value } = otpVerifySchema.validate(req.body, { abortEarly: false });
      if (error) {
        const messages = error.details.map(err => ({
          field: err.context.key,
          message: err.message,
        }));
        return res.status(400).json({ errors: messages });
      }

      const { email, otp } = value;
      
      // Verify OTP
      const user = await otpService.verifyOTP(email, otp);
      
      // Generate JWT token
      const result = await authService.generateAuthResponse(user);
      
      res.status(200).json({
        message: "Login successful",
        ...result
      });

    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ message: error.message });
      }
      if (error.message === 'OTP expired or not found' || error.message === 'Invalid OTP') {
        return res.status(401).json({ message: error.message });
      }
      console.error("OTP verification error:", error);
      res.status(500).json({ message: "Failed to verify OTP" });
    }
  }
};

export default authController;
