import { Router } from "express";
import { getAllVideos } from "../controllers/video_controller";

const videoRouter = Router();

videoRouter.route("/getAllVideos").get(getAllVideos);

export default videoRouter;
