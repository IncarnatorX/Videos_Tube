import { Video } from "../models/video_model.js";

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

export { getAllVideos, editTitleAndDesc };
