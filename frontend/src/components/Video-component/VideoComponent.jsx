import { useContext } from "react";
import { VideoContext } from "../../Context/Context";
import "./VideoComponent.css";
import VideoItem from "./VideoItem";

const VideoComponent = () => {
  const { videos } = useContext(VideoContext);

  return (
    <div className="video-list">
      {videos.length > 1 ? (
        videos.map((video) => <VideoItem key={video._id} video={video} />)
      ) : (
        <p>No videos available..</p>
      )}
    </div>
  );
};

export default VideoComponent;
