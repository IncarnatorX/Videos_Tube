import "./EditVideoDetails.css";
import PropTypes from "prop-types";

console.log(PropTypes);

const EditVideoDetails = ({ currentVideoID }) => {
  const uploadTitleAndDesc = async (e) => {
    const formData = new FormData(e.target);
    const editedDetails = {};
    for (const [name, value] of formData) {
      editedDetails[name] = value;
    }
    editedDetails._id = currentVideoID;

    try {
      const response = await fetch("http://localhost:8080/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedDetails),
      });

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <dialog>
      <form method="dialog" onSubmit={uploadTitleAndDesc}>
        <div className="input-field">
          <input type="text" id="title" name="title" size={30} />
          <label htmlFor="title">Enter Title: </label>
        </div>
        <div className="input-field">
          <input type="text" id="description" name="description" size={30} />
          <label htmlFor="description">Enter Description: </label>
        </div>
        <button className="save-btn" type="submit">
          Save Changes
        </button>
      </form>
    </dialog>
  );
};

EditVideoDetails.propTypes = {
  currentVideoID: PropTypes.string,
};

export default EditVideoDetails;
