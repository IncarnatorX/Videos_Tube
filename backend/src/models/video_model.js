import mongoose, { Schema } from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    videoFile: {
      type: String, //cloudinary url
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    videoPublicId: {
      type: String,
      required: true,
    },
    thumbnailPublicId: {
      type: String,
      required: true,
    },
    comments: {
      type: [],
    },
    owner: {
      id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      fullname: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Video = mongoose.model("Video", videoSchema);
