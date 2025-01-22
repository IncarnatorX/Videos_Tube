import { Router } from "express";
import { Video } from "../models/video_model.js";
import { getAllVideos } from "../controllers/video_controller.js";

const videoRouter = Router();

videoRouter.route("/getAllVideos").get(getAllVideos);
export default videoRouter;
