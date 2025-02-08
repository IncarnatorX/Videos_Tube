import { useContext } from "react";
import { VideoContext } from "../../Context/Context";
import UploadFileButtons from "./UploadFileButtons";
import { toast } from "react-toastify";
import api from "../../utils/api.js";
import "./UploadVideoForm.css";

const UploadVideoForm = () => {
  const { uploadVideoRef, detailsUpdated, setDetailsUpdated } =
    useContext(VideoContext);

  async function handleVideoSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    event.target.reset();

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
      setDetailsUpdated(!detailsUpdated);
    }
  }

  return (
    <dialog ref={uploadVideoRef} className="upload-dialog">
      <form onSubmit={handleVideoSubmit} encType="multipart/form-data">
        <p>Upload Video</p>

        <input
          type="text"
          id="upload-title"
          name="title"
          size={30}
          placeholder="Enter Title"
          required
        />

        <textarea
          type="text"
          id="upload-description"
          name="description"
          placeholder="Enter Description"
          required
        ></textarea>
        <UploadFileButtons />
        <input type="submit" value="Submit" id="video-submit" />
      </form>
    </dialog>
  );
};

export default UploadVideoForm;
