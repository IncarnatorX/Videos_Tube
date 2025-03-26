import { Router } from "express";
import {
  generateNewAccessToken,
  getProfileController,
  logInUserController,
  logoutUser,
  registerUserController,
  verifyToken,
  editAvatar,
  verifyPassword,
  changePassword,
  resetPassword,
} from "../controllers/user_controller.js";
import upload from "../middlewares/multer_middleware.js";
import verifyJWT from "../middlewares/auth_middleware.js";

import { rateLimit } from "express-rate-limit";

const userRouter = Router();

const refreshTokenRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Too many requests. Please try again.",
});

userRouter.route("/register").post(registerUserController);
userRouter.route("/login").post(logInUserController);
userRouter
  .route("/refresh-token")
  .post(refreshTokenRateLimiter, generateNewAccessToken);
userRouter.route("/reset-pwd").post(resetPassword);

// PROTECTED ROUTES
userRouter.route("/verify-token").get(verifyJWT, verifyToken);
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/profile").get(verifyJWT, getProfileController);

userRouter
  .route("/avatar")
  .post(verifyJWT, upload.single("avatar"), editAvatar);

userRouter.route("/verify-password").post(verifyJWT, verifyPassword);

userRouter.route("/change-pwd").post(verifyJWT, changePassword);

export default userRouter;
