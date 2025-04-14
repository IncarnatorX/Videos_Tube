import { Router } from "express";
import {
  sendOTPForPasswordReset,
  verifyOTP,
} from "../controllers/otp_controller.js";
import { otpRequestLimiter } from "../middlewares/rate_limiters.js";

const otpRouter = Router();

otpRouter.route("/send-otp").post(otpRequestLimiter, sendOTPForPasswordReset);
otpRouter.route("/verify-otp").post(verifyOTP);

export default otpRouter;
