import { useState, useEffect, useContext } from "react";
import { VideoContext } from "../Context/VideoContext";
import VideoListDiv from "./VideoListDiv";
import axios from "axios";
import "./VideoList.css";

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  const { detailsUpdated } = useContext(VideoContext);

  const fetchVideos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getAllVideos");
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error.message);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [detailsUpdated]);

  return (
    <>
      <VideoListDiv videos={videos} />
    </>
  );
};

export default VideoList;
