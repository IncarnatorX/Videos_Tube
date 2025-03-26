import { Router } from "express";
import {
  sendOTPForPasswordReset,
  verifyOTP,
} from "../controllers/otp_controller.js";

const otpRouter = Router();

otpRouter.route("/send-otp").post(sendOTPForPasswordReset);
otpRouter.route("/verify-otp").post(verifyOTP);

export default otpRouter;
