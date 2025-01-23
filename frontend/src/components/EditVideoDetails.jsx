import "./EditVideoDetails.css";

const EditVideoDetails = () => {
  return (
    <dialog>
      <form method="dialog">
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

export default EditVideoDetails;
