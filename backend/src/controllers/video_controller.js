import { Video } from "../models/video_model.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
// import redis from "redis";
import dotenv from "dotenv";
import videoAndThumbnailDetails from "../utils/fetchVideoAndThumbnailDetails.js";
import mongoose from "mongoose";

dotenv.config();

// Creating a redis Client
// const client = redis.createClient({
//   username: "default",
//   password: process.env.REDIS_PASSWORD,
//   socket: {
//     host: process.env.REDIS_HOST,
//     port: process.env.REDIS_PORT,
//   },
// });

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

    // console.time("cache not available.");

    // console.log("Cache Miss");

    const allVideos = await Video.find({});

    // client.setEx(cacheKey, 3600, JSON.stringify(allVideos));

    res.status(200).json(allVideos);
    // console.timeEnd("cache not available.");
  } catch (error) {
    console.error("Unable to fetch all videos: ", error.message);
    res.status(401).json({
      message: "Unable to fetch videos at this time. Please try again later.",
    });
  }
};

const editTitleAndDesc = async (req, res) => {
  try {
    const { title, description, _id } = req.body;
    // await client.del(cacheKey); // clearing the cache before any updates happen
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
    // await client.del(cacheKey); // clearing the cache before any updates happen
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

const commentsHandler = async (req, res) => {
  try {
    const {comment, videoId, userId, fullname} = req.body;
    if(!videoId){
     return res.status(404).json({message: "Video id not found"});
    }

    if(!userId){
      return res.status(404).json({message: "User id not found"});
    }

    if(!comment){
      return res.status(404).json({message: "Comment not found"});
    }

    // await client.del(cacheKey); // clearing the cache before any updates happen
    const updatedVideo = await Video.findByIdAndUpdate(videoId, {
      $push: { comments: {comment, videoId, userId, fullname} },
    }, {new : true});

    if (!updatedVideo)
      res
        .status(404)
        .json({ message: "Error fetching and updating the video." });

    res.status(200).json({ message: "Comment posted successfully.", updatedVideo });
  } catch (error) {
    console.error(error.message);
  }
};

const publishVideo = async (req, res) => {
  const { title, description } = req.body;

  try {
    if (!title || !description)
      return res
        .status(401)
        .json({ message: "Title and Description required." });

    const { videoFile, thumbnail } = await videoAndThumbnailDetails(req);

    const video = await Video.create({
      videoFile: videoFile.url,
      thumbnail: thumbnail.url,
      title,
      description,
      videoPublicId: videoFile.public_id,
      thumbnailPublicId: thumbnail.public_id,
      owner: {
        id: req.user._id,
        fullname: req.user.fullname,
        avatar: req.user.avatar,
      },
    });

    return res
      .status(200)
      .json({ message: "Video Uploaded successfully", video });
  } catch (error) {
    console.error(
      "Error While uploading the video in publishVideo controller: ",
      error.message
    );
    if (videoFile) await deleteFromCloudinary(videoFile.public_id, "video");
    if (thumbnail) await deleteFromCloudinary(thumbnail.public_id, "thumbnail");
    return res
      .status(404)
      .json({ message: "Error while uploading the video. Please try again." });
  }
};

const getUserVideos = async (req, res) => {
  const { _id: userId } = req.user;

  try {
    if (!userId)
      return res.status(404).json({ message: "No user id available." });

    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(404).json({ message: "Invalid User Id.." });

    const userVideos = await Video.find({ "owner.id": userId });

    if (!userVideos)
      return res.status(404).json({ message: "Unable to fetch user videos." });

    return res
      .status(200)
      .json({ message: "Videos Fetched Successfully", payload: userVideos });
  } catch (error) {
    console.error("getUserVideos controller errored out: ", error.message);
    return res.status(404).json({
      message: "Something went wrong with fetching the user videos.",
    });
  }
};

export {
  getAllVideos,
  editTitleAndDesc,
  reUploadVideo,
  commentsHandler,
  publishVideo,
  getUserVideos,
};
