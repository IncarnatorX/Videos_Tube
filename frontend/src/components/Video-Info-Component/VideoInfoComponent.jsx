import AvatarComponent from "../Avatar/AvatarComponent";
import getTimeDifference from "../../utils/getTimeDifference";
import "./VideoInfoComponent.css";
import PropTypes from "prop-types";

const VideoInfoComponent = ({ video }) => {
  return (
    <div className="video-details">
      <section className="video-section">
        <video
          src={video.videoFile}
          controls
          height={650}
          // onPlay={(e) => console.log("Video is playing", e.type)}
        ></video>
      </section>

      <section className="details-section">
        {/* TITLE */}
        <p className="text-4xl text-white">{video.title}</p>

        {/* OWNER */}
        <div className="flex gap-4 items-center">
          <AvatarComponent owner={video.owner} />
          <p className="text-2xl text-white">
            {video.owner.fullname[0].toUpperCase() +
              video.owner.fullname.slice(1)}
          </p>
        </div>

        {/* VIEWS | UPLOADED DATA | DESCRIPTION */}
        <div className="py-4 px-2 bg-gray-500 flex flex-col gap-4 rounded-xl text-white">
          <p>
            {video.views} views | {getTimeDifference(video.createdAt)}
          </p>
          <strong>Description:</strong>
          <p>{video.description}</p>
        </div>

        {/* COMMENTS */}
        <div className="comments text-white mb-9">
          <strong>Comments:</strong>
          {video.comments.length > 1 ? (
            video.comments.map((comment) => {
              return (
                <div key={crypto.randomUUID()} className="comment-div">
                  <p className="comment">
                    <span>
                      {comment.feedback} --- By {comment.fullname}
                    </span>
                  </p>
                </div>
              );
            })
          ) : (
            <div>No comments</div>
          )}
        </div>

        {/* NEW COMMENT */}
        <div className="">
          <input
            type="text"
            name="comment"
            id="comments"
            placeholder="Add a comment..."
            className="w-full p-2 border-2 border-x-0 border-t-0 border-b-white text-white outline-none focus:border-fuchsia-300"
          />
          <div className="flex py-6 justify-end gap-4">
            <button className="border-none outline-none text-white px-6 py-2 bg-blue-400 rounded-xl cursor-pointer">
              Comment
            </button>
            <button className="border-none outline-none text-white px-6 py-2 bg-red-700 rounded-xl cursor-pointer">
              Cancel
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

VideoInfoComponent.propTypes = {
  video: PropTypes.object,
};
export default VideoInfoComponent;
