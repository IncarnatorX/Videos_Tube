import { useState, useEffect } from "react";
import { VideoContext } from "./Context";
import PropTypes from "prop-types";

const VideoProvider = ({ children }) => {
  const [detailsUpdated, setDetailsUpdated] = useState(false);
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const response = await fetch("http://localhost:8080/getAllVideos");
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error.message);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [detailsUpdated]);

  return (
    <VideoContext.Provider
      value={{
        detailsUpdated,
        setDetailsUpdated,
        videos,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

VideoProvider.propTypes = {
  children: PropTypes.node,
};

export default VideoProvider;
