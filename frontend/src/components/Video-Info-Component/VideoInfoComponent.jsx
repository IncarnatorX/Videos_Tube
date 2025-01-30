import { Rating } from "@mui/material";
import PropTypes from "prop-types";
import "./VideoInfoComponent.css";

const VideoInfoComponent = ({ video }) => {
  return (
    <div className="video-details">
      <section className="video-section">
        <video src={video.videoFile} controls height={650}></video>
      </section>
      <section className="details-section">
        <p>
          <strong>Title:</strong> {video.title}
        </p>
        <p>
          <strong>Description:</strong> <br />
          <br /> {video.description}
        </p>
        <div className="reviews">
          <strong>Reviews:</strong>
          {video.feedback.length > 1
            ? video.feedback.map((feed) => {
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
            : "No reviews available"}
        </div>
      </section>
    </div>
  );
};

VideoInfoComponent.propTypes = {
  video: PropTypes.object,
};
export default VideoInfoComponent;
