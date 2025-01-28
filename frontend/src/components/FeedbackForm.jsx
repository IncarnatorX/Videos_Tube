import RatingComponent from "./RatingComponent";
import PropTypes from "prop-types";
import "./FeedbackForm.css";

const FeedbackForm = ({ feedbackFormRef }) => {
  return (
    <dialog ref={feedbackFormRef} className="feedback-form-dialog">
      <form method="dialog" className="feedback-form">
        <div>
          <label htmlFor="fullname">Fullname: </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            placeholder="Enter fullname"
          />
        </div>

        <div>
          <label htmlFor="">Email address: </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email address"
          />
        </div>

        <div>
          <label htmlFor="feedback">Enter Feedback: </label>
          <textarea
            name="feedback"
            id="feedback"
            placeholder="Enter your feedback"
            cols={30}
            rows={10}
            className="feedback-textarea"
          ></textarea>
        </div>
        <div className="rating-div">
          <p>Submit your Rating:</p>
          <RatingComponent />
        </div>
      </form>
      <button
        className="close-feedback-form"
        onClick={() => feedbackFormRef.current.close()}
      >
        Close Form
      </button>
    </dialog>
  );
};

FeedbackForm.propTypes = {
  feedbackFormRef: PropTypes.object,
};

export default FeedbackForm;
