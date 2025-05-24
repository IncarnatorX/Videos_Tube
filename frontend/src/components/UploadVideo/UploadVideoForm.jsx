import { useContext, useState } from "react";
import { VideoContext } from "../../Context/Context";
import UploadFileButtons from "./UploadFileButtons";
import toast from "react-hot-toast";

import api from "../../utils/api.js";
import "./UploadVideoForm.css";
import { ThreeDot } from "react-loading-indicators";

const UploadVideoForm = () => {
  const { uploadVideoRef, detailsUpdated, setDetailsUpdated } =
    useContext(VideoContext);

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
        {uploadingVideo ? (
          <ThreeDot
            color="#1920ea"
            size="small"
            text="Uploading"
            textColor="#1920ea"
          />
        ) : (
          <input type="submit" value="Submit" id="video-submit" />
        )}
      </form>
    </dialog>
  );
};

export default UploadVideoForm;
