import { useLocation } from "react-router";
import { Rating } from "@mui/material";
import "./VideoInfoPage.css";

const VideoInfoPage = () => {
  const { state: video } = useLocation();

  return (
    <div className="video-info">
      <section className="video-section">
        <video src={video.videoFile} controls width={500} height={300}></video>
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

export default VideoInfoPage;
