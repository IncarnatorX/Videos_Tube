import { useRef } from "react";
import { useVideoStore } from "../../store/videoStore";
import api from "../../utils/api";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const EditVideoDetails = ({ editDialogRef }) => {
  const titleRef = useRef(null);
  const descRef = useRef(null);

  // const { setDetailsUpdated, detailsUpdated, currentVideoID } =
  //   useContext(VideoContext);

  const { setDetailsUpdated, detailsUpdated, currentVideoID } = useVideoStore(
    (store) => store
  );

  const uploadTitleAndDescSubmission = async (e) => {
    const editedDetailsFormData = new FormData(e.currentTarget);
    editedDetailsFormData.append("_id", currentVideoID);
    const editedDetailsPayload = Object.fromEntries(editedDetailsFormData);

    const { title, description } = editedDetailsPayload;

    if (title === "" && description === "") {
      toast.error("Nothing to edit");
      return;
    }

    try {
      const response = await api.post("/edit", editedDetailsPayload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success(response.data.message);
      titleRef.current.value = "";
      descRef.current.value = "";
      setDetailsUpdated(!detailsUpdated);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <dialog ref={editDialogRef} className="dialog fixed">
      <h2 className="font-bold text-2xl">Re-upload video</h2>
      <form
        method="dialog"
        onSubmit={uploadTitleAndDescSubmission}
        className="flex flex-col gap-y-4 items-center justify-center w-full h-full"
      >
        <input
          type="text"
          id="edit-title"
          name="title"
          size={30}
          ref={titleRef}
          placeholder="Enter new title"
          className="w-full p-4 rounded-lg text-base outline-0 border-2 border-[#893939] focus:border-[#673ab7]"
        />

        <textarea
          type="text"
          id="edit-description"
          name="description"
          size={30}
          ref={descRef}
          cols={35}
          rows={5}
          placeholder="Enter new description"
          className="w-full p-2 rounded-lg outline-0 border-2 border-[var(--border-color)] focus:border-[var(--border-focus-color)]"
        ></textarea>

        <button
          type="submit"
          className="w-fit py-2 px-4 text-white border-0 outline-0 cursor-pointer rounded-md bg-blue-600 hover:bg-blue-700 transition-all"
        >
          Save Changes
        </button>
        <button
          className="w-fit py-2 px-4 text-white border-0 outline-0 cursor-pointer rounded-md bg-red-600 hover:bg-red-700 transition-all"
          onClick={() => editDialogRef.current.close()}
          type="button"
        >
          Close Form
        </button>
      </form>
    </dialog>
  );
};

EditVideoDetails.propTypes = {
  editDialogRef: PropTypes.shape({
    current: PropTypes.any,
  }),
};

export default EditVideoDetails;
