import { Router } from "express";
import verifyJWT from "../middlewares/auth_middleware.js";
import { likesDislikesVideoController } from "../controllers/like_dislike_controller.js";

const likesDislikesRoutes = Router();

likesDislikesRoutes
  .route("/like-dislike")
  .post(verifyJWT, likesDislikesVideoController);

export default likesDislikesRoutes;
