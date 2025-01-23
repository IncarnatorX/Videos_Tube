import EditVideoDetails from "./EditVideoDetails";
import PropTypes from "prop-types";

const VideoListDiv = ({ videos }) => {
  function HandleDialogOpening() {
    const dialog = document.querySelector("dialog");
    dialog.showModal();
  }

  return (
    <>
      <div className="video-list">
        {videos.map((video) => (
          <div key={video._id} className="video-item">
            <video
              src={video.videoFile}
              controls
              width={250}
              height={250}
            ></video>

            <section>
              {/* <img src={video.thumbnail} alt={video.title} loading="lazy" /> */}
              <div className="video-info">
                <h4>{video.title}</h4>
                <p>{video.description}</p>
                <button
                  className="edit-button btn"
                  onClick={HandleDialogOpening}
                >
                  Edit
                </button>
                <button className="re-upload-button btn">Re-Upload</button>
              </div>
            </section>
          </div>
        ))}
      </div>
      <EditVideoDetails />
    </>
  );
};

VideoListDiv.propTypes = {
  videos: PropTypes.array,
};

export default VideoListDiv;
