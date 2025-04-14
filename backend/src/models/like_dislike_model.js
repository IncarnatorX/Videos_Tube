import mongoose, { Schema } from "mongoose";

const likeDislikeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
    kind: {
      type: String,
      enum: ["like", "dislike"],
      required: true,
    },
  },
  { timestamps: true }
);

export const LikesDislikes = mongoose.model("Like_Dislike", likeDislikeSchema);
