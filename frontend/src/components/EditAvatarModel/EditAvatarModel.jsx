import { useContext, useState } from "react";
import { ThreeDot } from "react-loading-indicators";
import "./EditAvatarModel.css";
import api from "../../utils/api";
import PropTypes from "prop-types";
import { AuthContext } from "../../Context/Context";
import { toast } from "react-toastify";

const EditAvatarModel = ({ id, editAvatarRef }) => {
  const { setUserLoggedIn, setUser } = useContext(AuthContext);

  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [userUpdated, setUserUpdated] = useState(false);

  async function getUpdatedUser() {
    localStorage.removeItem("user");
    const updatedUser = await api.get("/profile", { withCredentials: true });
    localStorage.setItem("user", JSON.stringify(updatedUser.data));
    setUser(updatedUser);
    setUserLoggedIn(true);
  }

  async function handleEditAvatarSubmission(event) {
    event.preventDefault();
    setUploadingAvatar(true);
    const formData = new FormData(event.target);
    formData.append("_id", id);

    try {
      const response = await api.post("/avatar", formData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        editAvatarRef.current.close();
        getUpdatedUser();
        toast.success(response.data);
        setUserUpdated(!userUpdated);
        setUploadingAvatar(false);
      }
    } catch (error) {
      console.error("Error: ", error.message);
      toast.error("Error updating the avatar");
    }
  }

  return (
    <dialog ref={editAvatarRef} className="m-auto p-5 rounded-2xl">
      <form
        method="dialog"
        encType="multipart/form-data"
        onSubmit={handleEditAvatarSubmission}
      >
        <input
          type="file"
          id="avatar-input"
          name="avatar"
          accept="image/jpg image/png"
          className="border-2 border-blue-500 rounded-md p-4"
          required
        />

        {uploadingAvatar ? (
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
            id="avatar-btn"
            className="text-white bg-blue-500 py-2 px-4 rounded-md cursor-pointer"
          >
            Upload
          </button>
        )}

        <button
          className="text-white bg-red-500 py-2 px-4 rounded-md cursor-pointer close-btn"
          type="button"
          onClick={() => editAvatarRef.current.close()}
        >
          Close
        </button>
      </form>
    </dialog>
  );
};

export default EditAvatarModel;

EditAvatarModel.propTypes = {
  id: PropTypes.string,
  editAvatarRef: PropTypes.object,
};
