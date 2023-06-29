import rateLimit from "express-rate-limit"

// Middleware for rate limiting requests
exports.rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Maximum number of requests
    message: 'Too many requests, please try again later',
  });