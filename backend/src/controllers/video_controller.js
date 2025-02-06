import { Video } from "../models/video_model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import redis from "redis";
import dotenv from "dotenv";

dotenv.config();

const client = redis.createClient({
  username: "default",
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
}); // Creating a redis Client

// await client.connect();
// client.on("error", (err) => console.error("Redis error: ", err.message));
// const cacheKey = "allVideos";

const getAllVideos = async (req, res) => {
  try {
    // const cachedVideos = await client.get(cacheKey);

    // if (cachedVideos) {
    //   console.time("cache available.");
    //   console.log("Cache Hit!");
    //   console.timeEnd("cache available.");
    //   if (cachedVideos) return res.status(200).json(JSON.parse(cachedVideos)); //sending cached videos
    // }

    console.time("cache not available.");

    console.log("Cache Miss");

    const allVideos = await Video.find({});

    // client.setEx(cacheKey, 3600, JSON.stringify(allVideos));

    res.status(200).json(allVideos);
    console.timeEnd("cache not available.");
  } catch (error) {
    console.error("Unable to fetch all videos: ", error.message);
  }
};

const editTitleAndDesc = async (req, res) => {
  try {
    const { title, description, _id } = req.body;
    await client.del(cacheKey); // clearing the cache before any updates happen
    await Video.findByIdAndUpdate(_id, {
      $set: { title, description },
    });

    res.status(200).json({ message: "Title and Description updated" });
  } catch (error) {
    console.error(error.message);
  }
};

const reUploadVideo = async (req, res) => {
  try {
    const { path } = req.file;
    const { _id } = req.body;

    const videoFileDetails = await uploadOnCloudinary(path);
    await client.del(cacheKey); // clearing the cache before any updates happen
    const updatedVideo = await Video.findByIdAndUpdate(
      _id,
      {
        $set: { videoFile: videoFileDetails.url },
      },
      { new: true, runValidators: true }
    );

    if (!updatedVideo) {
      res.status(404).json({ message: "Video file not found." });
    }

    res.status(200).json({ message: "Video file received" });
  } catch (error) {
    console.error(error.message);
  }
};

const feedbackHandler = async (req, res) => {
  try {
    const { _id, ...feedback } = req.body;
    await client.del(cacheKey); // clearing the cache before any updates happen
    const updatedVideo = await Video.findByIdAndUpdate(_id, {
      $push: { feedback },
    });

    if (!updatedVideo)
      res
        .status(404)
        .json({ message: "Error fetching and updating the video." });

    res.status(200).json({ message: "Feedback Received" });
  } catch (error) {
    console.error(error.message);
  }
};

const publishVideo = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description)
    return res.status(401).json({ message: "Title and Description required." });

  console.log(`Title: ${title}, Description: ${description}`);
  console.log(req.file);
};

export {
  getAllVideos,
  editTitleAndDesc,
  reUploadVideo,
  feedbackHandler,
  publishVideo,
};
