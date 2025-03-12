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
  resetPassword,
} from "../controllers/user_controller.js";
import upload from "../middlewares/multer_middleware.js";
import verifyJWT from "../middlewares/auth_middleware.js";

const userRouter = Router();

userRouter.route("/register").post(registerUserController);
userRouter.route("/login").post(logInUserController);
userRouter.route("/refresh-token").post(generateNewAccessToken);

userRouter.route("/verify-token").get(verifyJWT, verifyToken);
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/profile").get(verifyJWT, getProfileController);

userRouter
  .route("/avatar")
  .post(verifyJWT, upload.single("avatar"), editAvatar);

userRouter.route("/verify-password").post(verifyJWT, verifyPassword);

userRouter.route("/reset-pwd").post(verifyJWT, resetPassword);

export default userRouter;
