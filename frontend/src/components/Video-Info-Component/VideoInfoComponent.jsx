import { useRef, useState } from "react";
// import { AuthContext } from "../../Context/Context";
import AvatarComponent from "../Avatar/AvatarComponent";
import CommentsComponent from "../Comments/CommentsComponent.jsx";
import ThumbsUpIcon from "../../assets/icons/ThumbsUpIcon.jsx";
import ThumbsDownIcon from "../../assets/icons/ThumbsDownIcon.jsx";
// import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
// import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import getTimeDifference from "../../utils/getTimeDifference";
import toast from "react-hot-toast";
import api from "../../utils/api.js";
import PropTypes from "prop-types";
import { useVideoStore } from "../../store/videoStore.js";
import { useAuthStore } from "../../store/authStore.js";

const VideoInfoComponent = () => {
  // const { userLoggedIn, setUser, user } = useContext(AuthContext);

  const { userLoggedIn, setUser, user } = useAuthStore((store) => store);

  const {
    detailsUpdated,
    setDetailsUpdated,
    currentVideo: video,
    setCurrentVideo,
  } = useVideoStore((store) => store);

  const thumbsUpRef = useRef(null);
  const thumbsDownRef = useRef(null);

  const [isViewsUpdated, setIsViewsUpdated] = useState(false);

  const hasLiked =
    user?.likedVideos?.length > 0 && user?.likedVideos?.includes(video._id);

  async function likeDislikeAPICall(action) {
    const payload = {
      videoId: video._id,
      kind: action,
    };

    try {
      const response = await api.post("/like-dislike", payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        const { message, updatedUser, updatedVideo } = response.data;
        toast(message);
        setDetailsUpdated(!detailsUpdated);
        setUser(updatedUser);
        setCurrentVideo(updatedVideo);
      }
    } catch (error) {
      console.error("Error in handleThumbsUp function: ", error);
      toast.error(error?.response?.data?.message);
    }
  }

  async function handleThumbsUp(action) {
    if (!userLoggedIn) {
      toast.error("You must login to like a video.");
      return;
    }
    const { current } = thumbsUpRef;
    console.log(current);
    current.classList.add("animate-thumbs-up");
    setTimeout(() => {
      current.classList.remove("animate-thumbs-up");
    }, 500);
    await likeDislikeAPICall(action);
  }

  async function handleThumbsDown(action) {
    if (!userLoggedIn) {
      toast.error("You must login to dislike a video.");
      return;
    }
    const { current } = thumbsDownRef;
    current.classList.add("animate-thumbs-down");
    setTimeout(() => {
      current.classList.remove("animate-thumbs-down");
    }, 500);
    await likeDislikeAPICall(action);
  }

  // ADD COMMENT
  async function handleAddComment(e) {
    e.preventDefault();
    const { comment } = Object.fromEntries(new FormData(e.currentTarget));

    if (!comment.trim()) {
      toast("Comment cannot be empty", {
        icon: "⚠️",
        className: "bg-amber-200",
        duration: 2000,
      });
      e.target.reset();
      return;
    }
    const commentData = {
      comment,
      videoId: video._id,
      userId: user._id,
      fullname: user.fullname,
    };

    try {
      const response = await api.post("/comment", commentData);

      if (response.status === 200) {
        const { message, updatedVideo } = response.data;
        toast.success(message);
        setCurrentVideo(updatedVideo);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error while submitting comment: ", error);
        toast.error(error.message);
      }
    } finally {
      e.target.reset();
    }
  }

  async function handleVideoWatchTime(event) {
    const videoElement = event.currentTarget;

    if (!videoElement || isViewsUpdated) return; // if already viewed then return to prevent API calls

    const currentTime = videoElement.currentTime;
    const duration = videoElement.duration;

    const watchedPercentage = (currentTime / duration) * 100;

    if (watchedPercentage >= 50) {
      try {
        const payload = {
          videoId: video._id,
          videoTitle: video.title,
          userId: user._id,
          fullname: user.fullname,
          username: user.username,
        };
        const response = await api.post("/update-video-views", payload);

        if (response.status === 200) {
          const { message, updatedUser, updatedVideo } = response.data;
          setCurrentVideo(updatedVideo);
          setUser(updatedUser);
          toast.success(message);
        }
      } catch (error) {
        console.error("Error occurred:", error.message);
      } finally {
        setIsViewsUpdated(true); // This will update that the view is submitted
      }
    }
  }

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-start flex-wrap mx-auto gap-y-4">
      <section className="w-full flex grow items-center justify-center">
        <video
          src={video?.videoFile}
          controls
          height={650}
          // onPlay={(e) => console.log("Video is playing", e)}
          onTimeUpdate={handleVideoWatchTime}
          className="rounded w-[60%] block my-0 mx-auto"
        ></video>
      </section>

      <section className="w-full pt-0 px-4 pb-2 flex flex-col gap-y-4 rounded-md flex-[1_1_35%]">
        <div className="flex items-center justify-between">
          {/* TITLE */}
          <p className="text-4xl text-white">{video?.title}</p>
          {/* LIKE AND DISLIKE BUTTON */}
          <div className="flex gap-4 bg-transparent py-2 px-4 rounded-md">
            {/* <ThumbUpAltIcon
              className="cursor-pointer"
              htmlColor={hasLiked ? "green" : "white"}
              ref={thumbsUpRef}
              onClick={() => handleThumbsUp("like")}
            /> */}
            <ThumbsUpIcon
              fillColor={hasLiked ? "green" : "white"}
              thumbsUpRef={thumbsUpRef}
              handleThumbsUp={handleThumbsUp}
            />
            {/* <ThumbDownAltIcon
              className="text-white cursor-pointer"
              ref={thumbsDownRef}
              onClick={() => handleThumbsDown("dislike")}
            /> */}
            <ThumbsDownIcon
              thumbsDownRef={thumbsDownRef}
              handleThumbsDown={handleThumbsDown}
            />
          </div>
        </div>

        {/* OWNER */}
        <div className="flex gap-4 items-center">
          <AvatarComponent owner={video?.owner} />
          <p className="text-2xl text-white">
            {video?.owner?.username
              ? `@${video?.owner?.username}`
              : video?.owner?.fullname[0].toUpperCase() +
                video?.owner?.fullname.slice(1)}
          </p>
        </div>

        {/* VIEWS | UPLOADED DATA | DESCRIPTION */}
        <div className="py-4 px-2 bg-gray-500 flex flex-col gap-4 rounded-xl text-white">
          <p>
            {video?.views} views | {getTimeDifference(video?.createdAt)}
            {video?.likes !== 0 ? ` | ${video?.likes} likes` : " | No Likes"}
          </p>
          <strong>Description:</strong>
          <p>{video?.description}</p>
        </div>

        {/* NEW COMMENT */}
        {userLoggedIn && (
          <CommentsComponent handleAddComment={handleAddComment} />
        )}

        {/* COMMENTS */}
        <div className="flex flex-col gap-y-4 text-white mb-9">
          <strong>Comments:</strong>
          {video?.comments.length > 0 ? (
            video?.comments.map((comment) => {
              return (
                <div key={crypto.randomUUID()} className="flex items-center">
                  <p className="flex items-center justify-center gap-4">
                    <span>
                      {comment?.comment} --- By {comment?.fullname}
                    </span>
                  </p>
                </div>
              );
            })
          ) : (
            <div>No comments</div>
          )}
        </div>
      </section>
    </div>
  );
};

VideoInfoComponent.propTypes = {
  video: PropTypes.object,
};
export default VideoInfoComponent;
