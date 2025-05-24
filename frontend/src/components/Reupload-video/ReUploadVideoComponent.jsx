import { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";

import { VideoContext } from "../../Context/Context";
import { ThreeDot } from "react-loading-indicators";
import "./ReUploadVideoComponent.css";

const ReUploadVideoComponent = () => {
  const fileInputRef = useRef(null);

  // IMPORTING FROM VIDEO CONTEXT
  const { setDetailsUpdated, detailsUpdated, currentVideoID, reuploadRef } =
    useContext(VideoContext);

  const [uploading, setUploading] = useState(false);

  // FUNCTION TO HANDLE FORM SUBMISSION
  const handleReUploadFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    setUploading(true);

    const formData = new FormData(form);

    formData.append("_id", currentVideoID);

    try {
      const response = await fetch("http://localhost:8080/re-upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        reuploadRef.current.close();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      fileInputRef.current.value = "";
      setDetailsUpdated(!detailsUpdated);
      setUploading(false);
    }
  };

  return (
    <dialog ref={reuploadRef} className="reupload-dialog">
      <form
        method="dialog"
        encType="multipart/form-data"
        onSubmit={handleReUploadFormSubmit}
      >
        <input
          type="file"
          id="re-upload-input"
          name="videoFile"
          accept="video/mp4"
          ref={fileInputRef}
          required
        />

        {uploading ? (
          <ThreeDot
            color="#1920ea"
            size="small"
            text="Uploading"
            textColor="#1920ea"
          />
        ) : (
          <button type="submit" value="Upload" id="re-upload-btn">
            Upload
          </button>
        )}
      </form>
      <button
        className="btn close-btn"
        onClick={() => reuploadRef.current.close()}
      >
        Close
      </button>
    </dialog>
  );
};

export default ReUploadVideoComponent;
