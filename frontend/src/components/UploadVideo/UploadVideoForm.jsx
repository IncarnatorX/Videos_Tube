import { useState } from "react";
import { useVideoStore } from "../../store/videoStore.js";
import UploadFileButtons from "./UploadFileButtons";
import api from "../../utils/api.js";
import toast from "react-hot-toast";
import { ThreeDot } from "react-loading-indicators";
import PropTypes from "prop-types";

const UploadVideoForm = ({ uploadVideoRef }) => {
  // const { detailsUpdated, setDetailsUpdated } = useContext(VideoContext);

  const { detailsUpdated, setDetailsUpdated } = useVideoStore((store) => store);

  const [uploadingVideo, setUploadingVideo] = useState(false);

  async function handleVideoSubmit(event) {
    event.preventDefault();

    setUploadingVideo(true);

    const formData = new FormData(event.target);

    try {
      const response = await api.post("/publish", formData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        uploadVideoRef.current.close();
        toast.success(response.data.message);
      } else {
        toast.error("Failed to upload video!! Please try again!");
      }
    } catch (error) {
      console.error("Error while uploading the video: ", error.message);
    } finally {
      event.target.reset();
      setDetailsUpdated(!detailsUpdated);
      setUploadingVideo(false);
    }
  }

  return (
    <dialog
      ref={uploadVideoRef}
      className="dialog fixed p-10 rounded-lg w-[800px] h-fit"
    >
      <form
        onSubmit={handleVideoSubmit}
        encType="multipart/form-data"
        className="flex flex-col items-center gap-4"
      >
        <h2 className="font-bold text-2xl">Upload Video</h2>
        <input
          type="text"
          id="upload-title"
          name="title"
          size={30}
          placeholder="Enter Title"
          className="border-2 border-[var(--border-color)] p-3 text-base outline-none w-full focus:border-[var(--border-focus-color)] rounded-md"
          required
        />

        <textarea
          type="text"
          id="upload-description"
          name="description"
          placeholder="Enter Description"
          className="w-full min-h-52 field-sizing-content p-2 outline-none border-2 border-[var(--border-color)] focus:border-[var(--border-focus-color)] rounded-md"
          required
        ></textarea>
        <UploadFileButtons />
        {uploadingVideo ? (
          <ThreeDot
            color="#1920ea"
            size="small"
            text="Uploading"
            textColor="#1920ea"
          />
        ) : (
          <input
            type="submit"
            value="Upload"
            id="video-submit"
            className="w-fit py-2 px-4 mt-4 text-white border-0 outline-none overflow-none cursor-pointer bg-blue-600 rounded-md"
          />
        )}
      </form>
    </dialog>
  );
};

UploadVideoForm.propTypes = {
  uploadVideoRef: PropTypes.shape({
    current: PropTypes.any,
  }),
};

export default UploadVideoForm;
