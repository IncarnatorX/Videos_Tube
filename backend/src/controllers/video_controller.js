import Video from "../models/video_model.js";

const getAllVideos = async (req, res) => {
  try {
    const allVideos = await Video.find({});

    res
      .status(200)
      .json(
        new ApiResponse(200, allVideos, "Fetched all the videos successfully.")
      );
  } catch (error) {
    console.error("Unable to fetch all videos: ", error.message);
  }
};

export { getAllVideos };
