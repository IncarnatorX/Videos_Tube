import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { VideoContext } from "../Context/VideoContext";
import { ThreeDot } from "react-loading-indicators";
import "./ReUploadVideoComponent.css";
import PropTypes from "prop-types";

const ReUploadVideoComponent = ({
  currentVideoID,
  reuploadDialog,
  setReUploadDialog,
}) => {
  const reuploadRef = useRef(null);
  const fileInputRef = useRef(null);
  const { setDetailsUpdated, detailsUpdated } = useContext(VideoContext);

  const [uploading, setUploading] = useState(false);

  const handleReuploadDialogOpen = () => {
    const { current } = reuploadRef;
    current.showModal();
  };

  const handleReuploadDialogClose = () => {
    const { current } = reuploadRef;
    if (reuploadDialog) {
      current.close();
      setReUploadDialog(!reuploadDialog);
    }
  };

  useEffect(() => {
    if (reuploadDialog) handleReuploadDialogOpen();
  }, [reuploadDialog]);

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
        handleReuploadDialogClose();
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
    <dialog ref={reuploadRef}>
      <form
        method="dialog"
        encType="multipart/form-data"
        onSubmit={handleReUploadFormSubmit}
      >
        <input
          type="file"
          id="upload-input"
          name="videoFile"
          ref={fileInputRef}
        />

        {uploading ? (
          <ThreeDot
            color="#1920ea"
            size="small"
            text="Uploading"
            textColor="#1920ea"
          />
        ) : (
          <button type="submit" value="Upload" id="upload-btn">
            Upload
          </button>
        )}
      </form>
      <button className="btn close-btn" onClick={handleReuploadDialogClose}>
        Close
      </button>
    </dialog>
  );
};

ReUploadVideoComponent.propTypes = {
  currentVideoID: PropTypes.string,
  reuploadDialog: PropTypes.bool,
  setReUploadDialog: PropTypes.func,
};

export default ReUploadVideoComponent;
