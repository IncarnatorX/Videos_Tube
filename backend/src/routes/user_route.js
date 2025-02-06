import { Router } from "express";
import {
  generateNewAccessToken,
  getProfileController,
  logInUserController,
  logoutUser,
  registerUserController,
  verifyToken,
} from "../controllers/user_controller.js";
import verifyJWT from "../middlewares/auth_middleware.js";

const userRouter = Router();

userRouter.route("/register").post(registerUserController);
userRouter.route("/login").post(logInUserController);
userRouter.route("/refresh-token").post(generateNewAccessToken);

userRouter.route("/verify-token").get(verifyJWT, verifyToken);
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/profile").get(verifyJWT, getProfileController);

export default userRouter;
