import { useLocation } from "react-router";
import VideoInfoComponent from "../components/VideoInfoComponent";
import VideoInfoHeader from "../components/VideoInfoHeader";

const VideoInfoPage = () => {
  const { state: video } = useLocation();

  return (
    <>
      <VideoInfoHeader video={video} />
      <VideoInfoComponent video={video} />
    </>
  );
};

export default VideoInfoPage;
