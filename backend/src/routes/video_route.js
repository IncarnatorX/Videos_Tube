import { Router } from "express";
import {
  editTitleAndDesc,
  getAllVideos,
} from "../controllers/video_controller.js";

const videoRouter = Router();

videoRouter.route("/getAllVideos").get(getAllVideos);

videoRouter.route("/edit").post(editTitleAndDesc);
export default videoRouter;
