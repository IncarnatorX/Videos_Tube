import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  thumbnailUrl: { type: String, required: true },
  videoUrl: { type: String, required: true },
  duration: { type: Number },
});

export const Video = mongoose.model("Video", videoSchema);
