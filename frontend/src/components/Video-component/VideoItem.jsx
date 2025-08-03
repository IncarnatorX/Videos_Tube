import { useNavigate } from "react-router";
import AvatarComponent from "../Avatar/AvatarComponent";
import getTimeDifference from "../../utils/getTimeDifference";
import PropTypes from "prop-types";
import { useVideoStore } from "../../store/videoStore";

const VideoItem = ({ video }) => {
  const navigate = useNavigate();

  const setCurrentVideo = useVideoStore((store) => store.setCurrentVideo);

  function handleVideoClick(video) {
    setCurrentVideo(video);
    localStorage.setItem("video", JSON.stringify(video));
    navigate("/videoInfo");
  }

  return (
    <div className="w-full md:w-[22rem] lg:w-[25rem] flex flex-col gap-4 p-3 rounded-lg bg-[#232323] hover:shadow-lg transition-all">
      <img
        src={video?.thumbnail}
        alt={video?.title}
        className="w-full h-52 object-cover rounded-lg cursor-pointer"
        onClick={() => handleVideoClick(video)}
      />
      <section>
        <div className="flex items-center gap-8">
          <AvatarComponent owner={video?.owner} />
          <div>
            <h4 className="m-0 text-lg font-bold text-white">{video?.title}</h4>
            <p className="text-white text-md">{video?.owner?.fullname}</p>
            <p className="text-white text-sm">
              {video?.views} views | {getTimeDifference(video?.createdAt)}
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
