import { useRef, useState } from "react";
import EditVideoDetails from "./EditVideoDetails";
import ReUploadVideoComponent from "./ReUploadVideoComponent";
import FeedbackForm from "./FeedbackForm";
import ToastComponent from "./ToastContainer";
import VideoComponent from "./VideoComponent";
import PropTypes from "prop-types";

const VideoList = () => {
  const [currentVideoID, setCurrentVideoId] = useState("");

  const editDialogRef = useRef(null);
  const reuploadRef = useRef(null);
  const feedbackFormRef = useRef(null);

  // EDIT BUTTON DIALOG HANDLINGS
  function HandleEditDialogOpening(id) {
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

  // FEEDBACK FORM HANDLING
  function handleFeedbackFormDialog(id) {
    if (feedbackFormRef.current) {
      feedbackFormRef.current.showModal();
      setCurrentVideoId(id);
    }
  }

  return (
    <>
      <VideoComponent
        HandleEditDialogOpening={HandleEditDialogOpening}
        handleReuploadDialogOpen={handleReuploadDialogOpen}
        handleFeedbackFormDialog={handleFeedbackFormDialog}
      />
      <EditVideoDetails
        currentVideoID={currentVideoID}
        editDialogRef={editDialogRef}
      />
      <ReUploadVideoComponent
        currentVideoID={currentVideoID}
        reuploadRef={reuploadRef}
      />
      <FeedbackForm
        feedbackFormRef={feedbackFormRef}
        currentVideoID={currentVideoID}
      />
      <ToastComponent />
    </>
  );
};

VideoList.propTypes = {
  videos: PropTypes.array,
};

export default VideoList;
