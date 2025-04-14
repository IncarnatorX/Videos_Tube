import { useState, useEffect, useRef } from "react";
import { VideoContext } from "./Context";
import PropTypes from "prop-types";
import api from "../utils/api";

const VideoProvider = ({ children }) => {
  const [detailsUpdated, setDetailsUpdated] = useState(false);
  const [videos, setVideos] = useState([]);
  const [currentVideoID, setCurrentVideoId] = useState("");
  const [currentVideo, setCurrentVideo] = useState(() => {
    let video = localStorage.getItem("video");
    return video ? JSON.parse(video) : "";
  });
  const editDialogRef = useRef(null);
  const reuploadRef = useRef(null);
  const uploadVideoRef = useRef(null);

  const fetchAllVideos = async () => {
    try {
      const response = await api.get("/getAllVideos");
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error.message);
    }
  };

  useEffect(() => {
    fetchAllVideos();
  }, [detailsUpdated]);

  // EDIT BUTTON DIALOG HANDLINGS
  function handleEditDialogOpening(id) {
    if (editDialogRef.current) {
      editDialogRef.current.showModal();
      setCurrentVideoId(id);
    }
  }

  // RE-UPLOAD DIALOG HANDLING
  function handleReuploadDialogOpen(id) {
    const { current } = reuploadRef;
    current.showModal();
    setCurrentVideoId(id);
  }

  function handleUploadVideoDialog() {
    if (uploadVideoRef.current) {
      uploadVideoRef.current.showModal();
    }
  }

  const contextValues = {
    detailsUpdated,
    setDetailsUpdated,
    videos,
    currentVideoID,
    editDialogRef,
    reuploadRef,
    uploadVideoRef,
    handleEditDialogOpening,
    handleReuploadDialogOpen,
    handleUploadVideoDialog,
    currentVideo,
    setCurrentVideo,
  };

  return (
    <VideoContext.Provider value={contextValues}>
      {children}
    </VideoContext.Provider>
  );
};

VideoProvider.propTypes = {
  children: PropTypes.node,
};

export default VideoProvider;
