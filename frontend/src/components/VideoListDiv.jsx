import { useState } from "react";
import EditVideoDetails from "./EditVideoDetails";
import ReUploadVideoComponent from "./ReUploadVideoComponent";
import ToastComponent from "./ToastContainer";
import PropTypes from "prop-types";
import RatingComponent from "./RatingComponent";
import "./VideoList.css";

const VideoListDiv = ({ videos }) => {
  const [currentVideoID, setCurrentVideoId] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [reuploadDialog, setReUploadDialog] = useState(false);

  function HandleEditDialogOpening(id) {
    setEditDialogOpen(!editDialogOpen);
    setCurrentVideoId(id);
  }

  function HandleReUploadDialog(id) {
    setReUploadDialog(!reuploadDialog);
    setCurrentVideoId(id);
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
                  onClick={() => HandleReUploadDialog(video._id)}
                >
                  Re-Upload
                </button>
                <button className="btn feedback-btn">Submit Feedback</button>
                <RatingComponent />
              </div>
            </section>
          </div>
        ))}
      </div>
      <EditVideoDetails
        currentVideoID={currentVideoID}
        editDialogOpen={editDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
      />
      <ReUploadVideoComponent
        currentVideoID={currentVideoID}
        reuploadDialog={reuploadDialog}
        setReUploadDialog={setReUploadDialog}
      />
      <ToastComponent />
    </>
  );
};

VideoListDiv.propTypes = {
  videos: PropTypes.array,
};

export default VideoListDiv;
