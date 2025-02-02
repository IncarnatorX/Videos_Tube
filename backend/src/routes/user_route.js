import { Router } from "express";
import {
  logInUserController,
  registerUserController,
  verifyToken,
} from "../controllers/user_controller.js";
import verifyJWT from "../middlewares/auth_middleware.js";

const userRouter = Router();

userRouter.route("/register").post(registerUserController);
userRouter.route("/login").post(logInUserController);
userRouter.route("/verify-token").get(verifyToken);

userRouter.route("/logout").post(verifyJWT);

export default userRouter;
