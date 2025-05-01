/**
 * Generate a random OTP (One-Time Password)
 * @param {number} length - Length of OTP (default: 6)
 * @returns {string} - Generated OTP
 */
const generateOTP = (length = 6) => {
  // Default 6-digit OTP generation (preserving original implementation)
  if (length === 6) {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  }

};

/**
 * Validate OTP format
 * @param {string} otp - OTP to validate
 * @param {number} length - Expected length of OTP (default: 6)
 * @returns {boolean} - Whether OTP is valid
 */
const validateOTP = (otp, length = 6) => {
  // Check if OTP is a string and has the correct length
  if (typeof otp !== 'string' || otp.length !== length) {
    return false;
  }
  
  // Check if OTP contains only digits
  return /^\d+$/.test(otp);
};

export { generateOTP, validateOTP };
export default generateOTP;