// rateLimiter.js
import rateLimit from 'express-rate-limit';



/**
 * Configure rate limiting middleware
 * Limits each IP to 100 requests per 10 minutes
 */
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
  });

export default limiter;