import { useContext } from "react";
import { VideoContext } from "../Context/VideoContext";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import "./VideoComponent.css";

const VideoComponent = ({
  HandleEditDialogOpening,
  handleReuploadDialogOpen,
  handleFeedbackFormDialog,
}) => {
  const { videos } = useContext(VideoContext);

  const navigate = useNavigate();

  return (
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
              <h4 className="video-title">{video.title}</h4>
              <p className="video-desc">{video.description}</p>
            </div>
            <div className="video-btns">
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
          <section className="review-ratings">
            <p>No. of Reviews: {video.feedback.length} </p>
            <p>
              Average Rating:{" "}
              {video.feedback.reduce((sum, r) => sum + Number(r.rating), 0) /
                video.feedback.length || 0}{" "}
              stars
            </p>
            <span
              className="more-btn"
              onClick={() => navigate("/videoInfo", { state: video })}
            >
              More....
            </span>
          </section>
        </div>
      ))}
    </div>
  );
};

VideoComponent.propTypes = {
  HandleEditDialogOpening: PropTypes.func,
  handleReuploadDialogOpen: PropTypes.func,
  handleFeedbackFormDialog: PropTypes.func,
};

export default VideoComponent;
