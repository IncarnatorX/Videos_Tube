import mongoose from "mongoose";
import { LikesDislikes } from "../models/like_dislike_model.js";
import { Video } from "../models/video_model.js";
import { User } from "../models/user_model.js";

const likesDislikesVideoController = async (req, res) => {
  try {
    const { videoId, kind } = req.body;
    const kinds = ["like", "dislike"];
    const userId = req.user._id;

    if (!videoId) {
      return res.status(404).json({ message: "Unable to identify the video." });
    }

    if (!kind || kind === "") {
      return res.status(404).json({
        message: "Operation not identify - Operation must be like or dislike.",
      });
    }

    if (!kinds.includes(kind)) {
      return res
        .status(422)
        .json({ message: "Incorrect kind. Must be 'like' or 'dislike'." });
    }

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Unable to find the video." });
    }

    if (video.owner.id.toString() === userId.toString()) {
      return res
        .status(422)
        .json({ message: "You cannot like/dislike your own video." });
    }

    // IF THE USER HAS ALREADY LIKED/DISLIKED THE VIDEO
    const existingLikeDislikeWithSameKind = await LikesDislikes.findOne({
      userId,
      videoId,
      kind,
    });

    // THE USER HAS ALREADY LIKED/DISLIKED THE VIDEO WITH SAME KIND
    if (existingLikeDislikeWithSameKind) {
      const updatedVideo = await Video.findById(videoId);
      const updatedUser = await User.findById(userId);
      return res.status(200).json({
        message: `You've already ${kind}d the video.`,
        updatedVideo,
        updatedUser,
      });
    }

    // IF THE USER HAS ALREADY LIKED/DISLIKED THE VIDEO BUT CHANGES FROM LIKE TO DISLIKE & VICE-VERSA
    const existingLikeDislikeDifferentKind =
      await LikesDislikes.findOneAndUpdate(
        {
          userId,
          videoId,
        },
        { kind },
        { new: true }
      );

    if (existingLikeDislikeDifferentKind) {
      let updatedUser;
      if (existingLikeDislikeDifferentKind.kind === "dislike") {
        updatedUser = await User.findByIdAndUpdate(
          userId,
          {
            $pull: {
              likedVideos: mongoose.Types.ObjectId.createFromHexString(videoId),
            },
          },
          { new: true }
        );
      } else if (existingLikeDislikeDifferentKind.kind === "like") {
        updatedUser = await User.findByIdAndUpdate(
          userId,
          {
            $push: {
              likedVideos: mongoose.Types.ObjectId.createFromHexString(videoId),
            },
          },
          { new: true }
        );
      }
      const updatedVideo = await updateLikesAndDislikesCount(videoId); //Updating the likes and dislikes count
      return res.status(200).json({
        message: `You've now ${kind}d the video.`,
        updatedVideo,
        updatedUser,
      });
    }

    // NO LIKE OR DISLIKE BY THE USER.
    const likeDislike = await LikesDislikes.create({
      userId,
      videoId,
      kind,
    });

    if (!likeDislike) {
      return res.status(404).json({
        message: `Error occurred while registering ${kind} operation for your video.`,
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          likedVideos: mongoose.Types.ObjectId.createFromHexString(videoId),
        },
      },
      { new: true }
    );

    const updatedVideo = await updateLikesAndDislikesCount(videoId); // updating the likes and dislikes count

    return res
      .status(200)
      .json({ message: `You ${kind}d the video.`, updatedVideo, updatedUser });
  } catch (error) {
    console.error("Error in likeVideo controller: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error. Something wen't wrong." });
  }
};

// HELPER FUNCTION TO UPDATE LIKES AND DISLIKES
const updateLikesAndDislikesCount = async (videoId) => {
  // AGGREGATION TO FETCH THE COUNT OF LIKES AND DISLIKES FROM LikesDislikes DOCUMENT
  const [likesResult, dislikesResult] = await Promise.all([
    LikesDislikes.aggregate([
      {
        $match: {
          videoId: mongoose.Types.ObjectId.createFromHexString(videoId),
          kind: "like",
        },
      },
      { $count: "likes" },
    ]),
    LikesDislikes.aggregate([
      {
        $match: {
          videoId: mongoose.Types.ObjectId.createFromHexString(videoId),
          kind: "dislike",
        },
      },
      {
        $count: "dislikes",
      },
    ]),
  ]);

  const likesCount = likesResult.length > 0 ? likesResult[0].likes : 0;
  const disLikesCount =
    dislikesResult.length > 0 ? dislikesResult[0].dislikes : 0;

  // UPDATING THE LIKES AND DISLIKES COUNT TO THE VIDEO MODEL.
  const updatedVideo = await Video.findByIdAndUpdate(
    videoId,
    {
      likes: likesCount,
      dislikes: disLikesCount,
    },
    { new: true }
  );

  return updatedVideo;
};

export { likesDislikesVideoController };
