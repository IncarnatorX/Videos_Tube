import { uploadOnCloudinary } from "./cloudinary.js";

const videoAndThumbnailDetails = async (req) => {
  const videoFilePath = req.files.videoFile[0].path;
  const thumbnailPath = req.files.thumbnail[0].path;

  if (!videoFilePath)
    throw new Error("Couldn't find video file. Probably missing file!!!");
  if (!thumbnailPath)
    throw new Error("Couldn't find thumbnail. Probably missing file!!!");

  const videoFile = await uploadOnCloudinary(videoFilePath);
  const thumbnail = await uploadOnCloudinary(thumbnailPath);

  return { videoFile, thumbnail };
};

export default videoAndThumbnailDetails;
