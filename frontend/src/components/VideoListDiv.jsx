import PropTypes from "prop-types";

const VideoListDiv = ({ videos }) => {
  return (
    <div className="video-list">
      {videos.map((video) => (
        <div key={video._id} className="video-item">
          <video
            src={video.videoFile}
            controls
            width={300}
            height={300}
          ></video>
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

VideoListDiv.propTypes = {
  videos: PropTypes.array,
};

export default VideoListDiv;
