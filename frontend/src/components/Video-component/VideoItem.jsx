import { useNavigate } from "react-router";
import AvatarComponent from "../Avatar/AvatarComponent";
import getTimeDifference from "../../utils/getTimeDifference";
import PropTypes from "prop-types";
import { useContext } from "react";
import { VideoContext } from "../../Context/Context";

const VideoItem = ({ video }) => {
  const navigate = useNavigate();
  const { setCurrentVideo } = useContext(VideoContext);

  function handleVideoClick(video) {
    setCurrentVideo(video);
    localStorage.setItem("video", JSON.stringify(video));
    navigate("/videoInfo");
  }

  return (
    <div className="video-item">
      <img
        src={video.thumbnail}
        alt="Video Thumbnail"
        className="thumbnail cursor-pointer"
        onClick={() => handleVideoClick(video)}
      />
      <section>
        <div className="video-info">
          <AvatarComponent owner={video?.owner} />
          <div>
            <h4 className="video-title">{video.title}</h4>
            <p className="text-gray-500 text-sm">
              {video.views} views | {getTimeDifference(video.createdAt)}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

VideoItem.propTypes = {
  video: PropTypes.object,
};

export default VideoItem;
