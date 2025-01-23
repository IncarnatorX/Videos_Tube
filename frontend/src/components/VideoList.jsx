import { useState, useEffect } from "react";
import axios from "axios";
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
    <div className="video-list">
      {videos.map((video) => (
        <div key={video._id} className="video-item">
          <img src={video.thumbnail} alt={video.title} loading="lazy" />
          <div className="video-info">
            <h4>{video.title}</h4>
            <p>{video.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
