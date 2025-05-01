import jwt from 'jsonwebtoken';

const jwtUtils = {
  generateToken: (userId) => {
    // Use environment variable JWT_SECRET or fallback to a default secret for development
    const secret = process.env.JWT_SECRET || 'development';
    
    if (!secret || secret === 'your_jwt_secret') {
      console.warn('WARNING: Using insecure JWT secret. Set a proper JWT_SECRET in your .env file for production.');
    }
    
    return jwt.sign({ id: userId }, secret, {
      expiresIn: '1d'
    });
  },

  verifyToken: (token) => {
    try {
      // Use environment variable JWT_SECRET or fallback to a default secret for development
      const secret = process.env.JWT_SECRET || 'development_secret_key_do_not_use_in_production';
      
      return jwt.verify(token, secret);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
};

export default jwtUtils;