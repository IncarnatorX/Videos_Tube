import { Router } from "express";
import { registerUserController } from "../controllers/user_controller.js";

const userRouter = Router();

userRouter.route("/register").post(registerUserController);

export default userRouter;
