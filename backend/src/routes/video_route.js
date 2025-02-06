import { Router } from "express";
import {
  editTitleAndDesc,
  feedbackHandler,
  getAllVideos,
  publishVideo,
  reUploadVideo,
} from "../controllers/video_controller.js";
import upload from "../middlewares/multer_middleware.js";
import verifyJWT from "../middlewares/auth_middleware.js";

const videoRouter = Router();

videoRouter.route("/getAllVideos").get(getAllVideos);

videoRouter.route("/edit").post(editTitleAndDesc);

videoRouter.route("/re-upload").post(upload.single("videoFile"), reUploadVideo);

videoRouter.route("/feedback").post(feedbackHandler);

videoRouter
  .route("/upload")
  .post(verifyJWT, upload.single("videoFile"), publishVideo);

export default videoRouter;
