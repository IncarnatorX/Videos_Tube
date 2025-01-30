import { useLocation } from "react-router";
import VideoInfoComponent from "../components/Video-Info-Component/VideoInfoComponent";
import VideoInfoHeader from "../components/Video-Info-header/VideoInfoHeader";

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
