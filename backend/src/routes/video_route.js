import { Router } from "express";
import { Video } from "../models/video_model.js";
import { getAllVideos } from "../controllers/video_controller.js";

const videoRouter = Router();

// videoRouter.route("/getAllVideos").get(getAllVideos);
videoRouter.get("/getAllVideos", async (req, res) => {
  try {
    const allVideos = await Video.find({});

    res.status(200).json(allVideos);
  } catch (error) {
    console.error(error.message);
  }
});

export default videoRouter;
