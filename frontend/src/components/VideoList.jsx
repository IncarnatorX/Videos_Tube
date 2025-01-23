import { useState, useEffect } from "react";
import axios from "axios";
import VideoListDiv from "./VideoListDiv";
import "./VideoList.css";

const VideoList = () => {
  const [videos, setVideos] = useState([]);

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
  }, []);

  return (
    <>
      <h1 className="title">Videos</h1>
      <VideoListDiv videos={videos} />
    </>
  );
};

export default VideoList;
