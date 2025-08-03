import { Router } from "express";
import {
    editTitleAndDesc, commentsHandler,
    getAllVideos,
    getUserVideos,
    publishVideo,
    reUploadVideo,
    updateVideoViews,
} from "../controllers/video_controller.js";
import upload from "../middlewares/multer_middleware.js";
import verifyJWT from "../middlewares/auth_middleware.js";
import videoViewsMiddleware from "../middlewares/video_views_middleware.js";

const videoRouter = Router();

videoRouter.route("/getAllVideos").get(getAllVideos);

videoRouter.route("/update-video-views").post(videoViewsMiddleware, updateVideoViews)

videoRouter.route("/edit").post(editTitleAndDesc);

videoRouter.route("/re-upload").post(upload.single("videoFile"), reUploadVideo);

videoRouter.route("/comment").post(verifyJWT,commentsHandler);

videoRouter.route("/publish").post(
  verifyJWT,
  upload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  publishVideo
);

videoRouter.route("/get-user-videos").get(verifyJWT, getUserVideos);

export default videoRouter;
