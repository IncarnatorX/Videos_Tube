import { Router } from "express";
import {
  editTitleAndDesc,
    commentsHandler,
  getAllVideos,
  getUserVideos,
  publishVideo,
  reUploadVideo,
} from "../controllers/video_controller.js";
import upload from "../middlewares/multer_middleware.js";
import verifyJWT from "../middlewares/auth_middleware.js";

const videoRouter = Router();

videoRouter.route("/getAllVideos").get(getAllVideos);

videoRouter.route("/edit").post(editTitleAndDesc);

videoRouter.route("/re-upload").post(upload.single("videoFile"), reUploadVideo);

videoRouter.route("/comment").post(commentsHandler);

videoRouter.route("/publish").post(
  verifyJWT,
  upload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  publishVideo
);

videoRouter.route("/getUserVideos").post(verifyJWT, getUserVideos);

export default videoRouter;
