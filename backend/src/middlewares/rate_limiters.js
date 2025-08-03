import { rateLimit } from "express-rate-limit";

const refreshTokenRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP/email to limit refresh the refresh tokens to 5
  message: "Too many requests. Please try again.",
});

const otpRequestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP/email to 3 OTP requests per window
  message: { message: "Too many OTP requests. Try again later." },
});

export { refreshTokenRateLimiter, otpRequestLimiter };
