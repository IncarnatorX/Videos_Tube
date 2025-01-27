import { Router } from "express";
import {
  editTitleAndDesc,
  getAllVideos,
  reUploadVideo,
} from "../controllers/video_controller.js";
import upload from "../utils/multer_middleware.js";

const videoRouter = Router();

videoRouter.route("/getAllVideos").get(getAllVideos);

videoRouter.route("/edit").post(editTitleAndDesc);

videoRouter.route("/re-upload").post(upload.single("videoFile"), reUploadVideo);

export default videoRouter;
