import User from '../models/userModel.js';
import hashUtils from '../utils/hash.js';
import jwtUtils from '../utils/jwt.js';


// Helper function for generating auth response with JWT token
const generateAuthResponse = (user) => {
  const token = jwtUtils.generateToken(user._id);
  
  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      isVerified: user.isVerified,
    }
  };
};

const authService = {
  register: async (userData) => {
    const { name, email, password, phone, address, role } = userData;
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error('User already exists');
    }

    const hashPassword = await hashUtils.hashPassword(password);

    const user = new User({
      name,
      email,
      password: hashPassword,
      phone,
      address,
      role,
    });

    await user.save();
    return user;
  },

  /**
   * Generate authentication response with JWT token
   * @param {Object} user - User document
   * @returns {Object} - Token and user data
   */
  generateAuthResponse: (user) => {
    return generateAuthResponse(user);
  },

  login: async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await hashUtils.comparePassword(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    return generateAuthResponse(user);
  }
};

export default authService;