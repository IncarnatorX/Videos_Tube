import PropTypes from "prop-types";
import { useState } from "react";

const CommentsComponent = ({ handleAddComment }) => {
  const [inputIsFocused, setInputIsFocused] = useState(false);

  return (
    <form onSubmit={handleAddComment} className="flex flex-col">
      <input
        type="text"
        name="comment"
        id="comments"
        placeholder="Add a comment..."
        className="w-full p-2 border-2 border-x-0 border-t-0 border-b-white text-white outline-none focus:border-fuchsia-300"
        onFocus={() => setInputIsFocused(true)}
        onBlur={() => setInputIsFocused(false)}
        required
      />
      {inputIsFocused && (
        <div className="flex self-end py-6 justify-end gap-4">
          <button
            type="submit"
            className="border-none outline-none text-white px-6 py-2 bg-blue-400 rounded-xl cursor-pointer"
          >
            Comment
          </button>
          <button
            type="button"
            className="border-none outline-none text-white px-6 py-2 bg-red-700 rounded-xl cursor-pointer"
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
};

CommentsComponent.propTypes = {
  handleAddComment: PropTypes.func.isRequired,
};

export default CommentsComponent;
