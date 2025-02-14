import EditVideoDetails from "./Edit-Video/EditVideoDetails";
import ReUploadVideoComponent from "./Reupload-video/ReUploadVideoComponent";
import FeedbackForm from "./Feedback/FeedbackForm";
import VideoComponent from "./Video-component/VideoComponent";
import PropTypes from "prop-types";

const VideoList = () => {
  return (
    <>
      <VideoComponent />
      <EditVideoDetails />
      <ReUploadVideoComponent />
      <FeedbackForm />
    </>
  );
};

VideoList.propTypes = {
  videos: PropTypes.array,
};

export default VideoList;
