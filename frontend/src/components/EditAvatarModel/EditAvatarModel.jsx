import { useEffect, useRef, useState } from "react";
import { ThreeDot } from "react-loading-indicators";
import api from "../../utils/api";
// import { AuthContext } from "../../Context/Context";
import toast from "react-hot-toast";
import "./EditAvatarModel.css";
import Button from "../Buttons/Button/Button";
import { useAvatarStore } from "../../store/avatarStore";
import { useAuthStore } from "../../store/authStore";

const EditAvatarModel = () => {
  const { avatarFile, avatarPreviewFile, setAvatarFile, setAvatarPreviewFile } =
    useAvatarStore((store) => store);

  const { setUser, setUserLoggedIn, user } = useAuthStore((store) => store);

  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const avatarPreviewDialogRef = useRef(null);

  function handleModalClose() {
    avatarPreviewDialogRef.current.close();
    setAvatarPreviewFile(null);
    setAvatarFile(null);
    setUploadingAvatar(false);
  }

  async function getUpdatedUser() {
    localStorage.removeItem("user");
    const updatedUser = await api.get("/profile", { withCredentials: true });
    localStorage.setItem("user", JSON.stringify(updatedUser.data.user));
    setUser(updatedUser.data.user);
    setUserLoggedIn(true);
  }

  async function handleEditAvatarSubmission(event) {
    event.preventDefault();
    setUploadingAvatar(true);

    const formData = new FormData(event.target);
    formData.append("_id", user?._id);
    formData.append("avatar", avatarFile);

    try {
      const response = await api.post("/avatar", formData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        getUpdatedUser();
        handleModalClose();
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("Error: ", error.message);
      toast.error("Error updating the avatar");
    } finally {
      setUploadingAvatar(false);
    }
  }

  useEffect(() => {
    if (!avatarPreviewFile) return;

    avatarPreviewDialogRef.current.showModal();
  }, [avatarPreviewFile]);

  return (
    <dialog
      ref={avatarPreviewDialogRef}
      className="backdrop:bg-black backdrop:opacity-80 outline-0 bg-none w-[50%] h-full bg-[#f7f7f7] m-auto rounded-md"
    >
      <form
        encType="multipart/form-data"
        onSubmit={handleEditAvatarSubmission}
        className="flex flex-col items-center p-3 gap-3"
      >
        <div className="flex flex-col gap-0.5">
          <p className="text-center text-lg p-2">Avatar Preview</p>
          <p className="text-sm text-gray-500 text-center">
            Preview your image file before uploading....
          </p>
        </div>
        <img
          src={avatarPreviewFile}
          alt="Image Preview"
          className="w-fit h-80 rounded-md"
        />
        {uploadingAvatar ? (
          <ThreeDot
            color="#1920ea"
            size="small"
            text="Uploading"
            textColor="#1920ea"
          />
        ) : (
          <Button className="w-full" type="submit">
            Upload
          </Button>
        )}
        <Button
          className="bg-red-500 w-full"
          onClick={handleModalClose}
          type="button"
        >
          Cancel
        </Button>
      </form>
    </dialog>
  );
};

export default EditAvatarModel;
