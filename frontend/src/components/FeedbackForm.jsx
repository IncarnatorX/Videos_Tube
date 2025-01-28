import RatingComponent from "./RatingComponent";
import PropTypes from "prop-types";

const FeedbackForm = ({ feedbackFormRef }) => {
  return (
    <dialog ref={feedbackFormRef}>
      <form method="dialog">
        <label htmlFor="fullname">Fullname: </label>
        <input type="text" id="fullname" name="fullname" />

        <label htmlFor="">Email address: </label>
        <input type="email" name="email" id="email" />

        <textarea
          name="feedback"
          id="feedback"
          placeholder="Enter your feedback"
          cols={30}
          rows={10}
        ></textarea>
        <RatingComponent />
      </form>
      <button onClick={() => feedbackFormRef.current.close()}>
        Close Form
      </button>
    </dialog>
  );
};

FeedbackForm.propTypes = {
  feedbackFormRef: PropTypes.object,
};

export default FeedbackForm;
