import { useLocation } from "react-router";
import VideoInfoComponent from "../components/Video-Info-Component/VideoInfoComponent";
import Navbar from "../components/Navbar/Navbar";

const VideoInfoPage = () => {
  const { state: video } = useLocation();

  return (
    <>
      <Navbar />
      <VideoInfoComponent video={video} />
    </>
  );
};

export default VideoInfoPage;
