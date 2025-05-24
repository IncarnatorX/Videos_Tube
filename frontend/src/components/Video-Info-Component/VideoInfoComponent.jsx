import { useContext, useRef } from "react";
import { AuthContext, VideoContext } from "../../Context/Context";
import AvatarComponent from "../Avatar/AvatarComponent";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import getTimeDifference from "../../utils/getTimeDifference";
import toast from "react-hot-toast";
import api from "../../utils/api.js";
import PropTypes from "prop-types";
import "./VideoInfoComponent.css";
import CommentsComponent from "../Comments/CommentsComponent.jsx";

const VideoInfoComponent = () => {
  const { userLoggedIn, setUser, user } = useContext(AuthContext);
  const {
    detailsUpdated,
    setDetailsUpdated,
    currentVideo: video,
    setCurrentVideo,
  } = useContext(VideoContext);

  const thumbsUpRef = useRef(null);
  const thumbsDownRef = useRef(null);

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

  function handleVideoWatchTime(event) {
    // TODO: Add a guard clause to return on true if an API call is made

    const video = event.currentTarget;
    const currentTime = video.currentTime;
    const duration = video.duration;

    const watchedPercentage = (currentTime / duration) * 100;

    if (watchedPercentage >= 50) {
      // TODO: Implement a state that sets to true to prevent multiple API calls. Ex: setWatched or setViewsUpdated
      console.log("Watched 50% video");
    }
  }

  return (
    <div className="video-details">
      <section className="video-section">
        <video
          src={video?.videoFile}
          controls
          height={650}
          // onPlay={(e) => console.log("Video is playing", e)}
          onTimeUpdate={handleVideoWatchTime}
        ></video>
      </section>

      <section className="details-section">
        <div className="flex items-center justify-between">
          {/* TITLE */}
          <p className="text-4xl text-white">{video?.title}</p>
          {/* LIKE AND DISLIKE BUTTON */}
          <div className="flex gap-4 bg-transparent py-2 px-4 rounded-md">
            <ThumbUpAltIcon
              className="cursor-pointer"
              htmlColor={hasLiked ? "green" : "white"}
              ref={thumbsUpRef}
              onClick={() => handleThumbsUp("like")}
            />
            <ThumbDownAltIcon
              className="text-white cursor-pointer"
              ref={thumbsDownRef}
              onClick={() => handleThumbsDown("dislike")}
            />
          </div>
        </div>

        {/* OWNER */}
        <div className="flex gap-4 items-center">
          <AvatarComponent owner={video?.owner} />
          <p className="text-2xl text-white">
            {video?.owner?.fullname[0].toUpperCase() +
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
        <div className="comments text-white mb-9">
          <strong>Comments:</strong>
          {video?.comments.length > 0 ? (
            video?.comments.map((comment) => {
              return (
                <div key={crypto.randomUUID()} className="comment-div">
                  <p className="comment">
                    <span>
                      {comment.comment} --- By {comment.fullname}
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
