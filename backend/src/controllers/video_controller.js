import { Video } from "../models/video_model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllVideos = async (req, res) => {
  try {
    const allVideos = await Video.find({});

    res.status(200).json(allVideos);
  } catch (error) {
    console.error("Unable to fetch all videos: ", error.message);
  }
};

const editTitleAndDesc = async (req, res) => {
  try {
    const { title, description, _id } = req.body;
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

export { getAllVideos, editTitleAndDesc, reUploadVideo };
