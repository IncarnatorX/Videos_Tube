import { useRef, useState } from "react";
import { ThreeDot } from "react-loading-indicators";
import api from "../../utils/api";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { useVideoStore } from "../../store/videoStore";

const ReUploadVideoComponent = ({ reuploadRef }) => {
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);

  // IMPORTING FROM VIDEO CONTEXT
  // const { setDetailsUpdated, detailsUpdated, currentVideoID } =
  //   useContext(VideoContext);

  const { setDetailsUpdated, detailsUpdated, currentVideoID } = useVideoStore(
    (store) => store
  );

  const [uploading, setUploading] = useState(false);

  // FUNCTION TO HANDLE FORM SUBMISSION
  const handleReUploadFormSubmit = async (event) => {
    event.preventDefault();
    setUploading(true);
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("_id", currentVideoID);
    console.log(formData);
    try {
      const response = await api.post("/re-upload", formData);

      if (response.status === 2000) {
        toast.success(response.data.message);
        reuploadRef.current.close();
      }
    } catch (error) {
      console.error(error.message);
      if (error instanceof AxiosError) {
        toast.error(error.response.data.message);
      }
    } finally {
      fileInputRef.current.value = "";
      setDetailsUpdated(!detailsUpdated);
      setUploading(false);
    }
  };

  return (
    <dialog ref={reuploadRef} className="dialog fixed">
      <form
        method="dialog"
        encType="multipart/form-data"
        onSubmit={handleReUploadFormSubmit}
        className="flex flex-col gap-y-3 items-center"
      >
        <h2 className="font-bold text-xl text-center">Re-Upload video</h2>

        <label
          htmlFor="re-upload-input"
          className="flex flex-col items-center bg-blue-50 cursor-pointer px-20 py-12 w-fit border-2 border-dashed border-indigo-500 rounded-md gap-y-4"
        >
          <img
            src="/icons/file-upload.svg"
            alt="File upload icon"
            className="w-32 h-32"
          />
          <p>
            {file ? `Selected file: ${file.name}` : "Browse file to upload!"}
          </p>

          <input
            type="file"
            id="re-upload-input"
            name="videoFile"
            accept="video/mp4"
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files[0])}
            //className="w-full p-4 cursor-pointer border-2 border-[var(--border-color)] rounded-md file:p-2 file:text-white file:bg-blue-600 file:border-0 file:rounded-md file:cursor-pointer file:hover:bg-purple-600 transition-all"
            className="hidden"
            required
          />
        </label>

        {uploading ? (
          <ThreeDot
            color="#1920ea"
            size="small"
            text="Uploading"
            textColor="#1920ea"
          />
        ) : (
          <button
            type="submit"
            value="Upload"
            id="re-upload-btn"
            className="w-fit py-2 px-6 cursor-pointer text-white outline-0 border-0 rounded-md bg-blue-600 hover:bg-purple-600 transition-all"
          >
            Upload
          </button>
        )}
      </form>
      {/* <button
        className="btn close-btn"
        onClick={() => reuploadRef.current.close()}
      >
        Close
      </button> */}
    </dialog>
  );
};

ReUploadVideoComponent.propTypes = {
  reuploadRef: PropTypes.shape({
    current: PropTypes.any,
  }),
};

export default ReUploadVideoComponent;
