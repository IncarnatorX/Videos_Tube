import { Router } from "express";

const videoRouter = Router();

videoRouter.route("/").get(getAllUserVideos);

export default videoRouter;
