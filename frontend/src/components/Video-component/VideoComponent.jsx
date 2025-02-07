import { useContext } from "react";
import { VideoContext } from "../../Context/Context";
import "./VideoComponent.css";
import VideoItem from "./VideoItem";

const VideoComponent = () => {
  const { videos } = useContext(VideoContext);

  return (
    <div className="video-list">
      {videos.length > 0 ? (
        videos.map((video) => <VideoItem key={video._id} video={video} />)
      ) : (
        <p className="w-full text-center text-2xl p-4">
          No videos available...
        </p>
      )}
    </div>
  );
};

export default VideoComponent;
