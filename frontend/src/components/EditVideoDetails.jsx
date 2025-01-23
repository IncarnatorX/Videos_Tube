import { toast } from "react-toastify";
import "./EditVideoDetails.css";
import PropTypes from "prop-types";
import { useContext, useRef } from "react";
import { VideoContext } from "../Context/VideoContext";

const EditVideoDetails = ({ currentVideoID }) => {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const { setDetailsUpdated, detailsUpdated } = useContext(VideoContext);

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
      toast.success(data.message);
      titleRef.current.value = "";
      descRef.current.value = "";
      setDetailsUpdated(!detailsUpdated);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <dialog>
      <form method="dialog" onSubmit={uploadTitleAndDesc}>
        <div className="input-field">
          <input type="text" id="title" name="title" size={30} ref={titleRef} />
          <label htmlFor="title">Enter Title: </label>
        </div>
        <div className="input-field">
          <input
            type="text"
            id="description"
            name="description"
            size={30}
            ref={descRef}
          />
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
