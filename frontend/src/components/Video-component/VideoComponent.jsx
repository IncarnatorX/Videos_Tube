import { useEffect } from "react";
import VideoItem from "./VideoItem";
import { useVideoStore } from "../../store/videoStore";

const VideoComponent = () => {
  const { videos, fetchAllVideos } = useVideoStore((store) => store);

  useEffect(() => {
    fetchAllVideos();
  }, [fetchAllVideos]);

  // grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))]

  return (
    <div className="w-full gap-2 md:gap-4 p-4 flex flex-wrap">
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
