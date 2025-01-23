import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { VideoContext } from "../Context/VideoContext";
import VideoListDiv from "./VideoListDiv";
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
      <h1 className="title">Videos</h1>
      <VideoListDiv videos={videos} />
    </>
  );
};

export default VideoList;
