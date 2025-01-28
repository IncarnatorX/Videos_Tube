import { useRef, useState } from "react";
import EditVideoDetails from "./EditVideoDetails";
import ReUploadVideoComponent from "./ReUploadVideoComponent";
import FeedbackForm from "./FeedbackForm";
import ToastComponent from "./ToastContainer";
import "./VideoList.css";
import PropTypes from "prop-types";

const VideoListDiv = ({ videos }) => {
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
      <div className="video-list">
        {videos.map((video) => (
          <div key={video._id} className="video-item">
            <video
              src={video.videoFile}
              controls
              width={300}
              height={250}
            ></video>

            <section>
              {/* <img src={video.thumbnail} alt={video.title} loading="lazy" /> */}
              <div className="video-info">
                <h4>{video.title}</h4>
                <p>{video.description}</p>
                <button
                  className="edit-button btn"
                  onClick={() => HandleEditDialogOpening(video._id)}
                >
                  Edit
                </button>
                <button
                  className="re-upload-button btn"
                  onClick={() => handleReuploadDialogOpen(video._id)}
                >
                  Re-Upload
                </button>
                <button
                  className="btn feedback-btn"
                  onClick={() => handleFeedbackFormDialog(video._id)}
                >
                  Submit Feedback
                </button>
              </div>
            </section>
          </div>
        ))}
      </div>
      <EditVideoDetails
        currentVideoID={currentVideoID}
        editDialogRef={editDialogRef}
      />
      <ReUploadVideoComponent
        currentVideoID={currentVideoID}
        reuploadRef={reuploadRef}
      />
      <FeedbackForm feedbackFormRef={feedbackFormRef} />
      <ToastComponent />
    </>
  );
};

VideoListDiv.propTypes = {
  videos: PropTypes.array,
};

export default VideoListDiv;
