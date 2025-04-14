import { useContext } from "react";
import { VideoContext } from "../../Context/Context";
import VideoItem from "./VideoItem";
import "./VideoComponent.css";

const VideoComponent = () => {
  const { videos } = useContext(VideoContext);

  return (
    <div className="video-list">
      {videos.length > 0 ? (
        videos.map((video) => <VideoItem key={video._id} video={video} />)
      ) : (
        <p className="w-full text-center text-white text-2xl p-4 col-span-12">
          No videos available at this time. Please try again later.
        </p>
      )}
    </div>
  );
};

export default VideoComponent;
