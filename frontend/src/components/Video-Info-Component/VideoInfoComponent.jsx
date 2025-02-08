import { Rating } from "@mui/material";
import PropTypes from "prop-types";
import "./VideoInfoComponent.css";
import ImageAvatars from "../Avatar/Avatar";
import BackgroundLetterAvatars from "../Avatar/BackgroundLetterAvatars";
import getTimeDifference from "../../utils/getTimeDifference";

const VideoInfoComponent = ({ video }) => {
  console.log(video);
  return (
    <div className="video-details">
      <section className="video-section">
        <video src={video.videoFile} controls height={650}></video>
      </section>
      <section className="details-section">
        <p className="text-4xl text-white">{video.title}</p>
        <div className="flex gap-4 items-center">
          {video?.owner?.avatar ? (
            <ImageAvatars avatarSrc={video?.owner?.avatar} />
          ) : (
            <BackgroundLetterAvatars fullname={video.owner.fullname} />
          )}
          <p className="text-2xl text-white">
            {video.owner.fullname[0].toUpperCase() +
              video.owner.fullname.slice(1)}
          </p>
        </div>
        <div className="py-4 px-2 bg-gray-500 flex flex-col gap-4 rounded-3xl">
          <p>
            {video.views} views | {getTimeDifference(video.createdAt)}
          </p>
          <strong>Description:</strong>
          <p>{video.description}</p>
        </div>
        <div className="reviews text-white mb-9">
          <strong>Reviews:</strong>
          {video.feedback.length > 1 ? (
            video.feedback.map((feed) => {
              return (
                <div key={crypto.randomUUID()} className="review-div">
                  <p className="review">
                    <span>
                      {feed.feedback} --- By {feed.fullname}
                    </span>
                    <Rating readOnly value={Number(feed.rating)} />
                  </p>
                </div>
              );
            })
          ) : (
            <div>No reviews available</div>
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
