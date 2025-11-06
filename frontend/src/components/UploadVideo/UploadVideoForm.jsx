import { useEffect, useRef, useState } from "react";
import { useVideoStore } from "../../store/videoStore.js";
import UploadFileButtons from "./UploadFileButtons";
import api from "../../utils/api.js";
import toast from "react-hot-toast";
import { ThreeDot } from "react-loading-indicators";
import { useModalsStore } from "../../store/modalsStore.js";
import { Controller, useForm } from "react-hook-form";

const defaultValues = {
  title: "",
  description: "",
  videoFile: null,
  thumbnail: null,
};

const UploadVideoForm = () => {
  // const { detailsUpdated, setDetailsUpdated } = useContext(VideoContext);

  const { detailsUpdated, setDetailsUpdated } = useVideoStore((store) => store);

  const { uploadVideoModal, closeUploadVideoModal } = useModalsStore(
    (store) => store
  );

  // console.log("uploadVideoModal DEBUG ", uploadVideoModal);

  const [uploadingVideo, setUploadingVideo] = useState(false);

  const uploadVideoRef = useRef(null);

  const { control, handleSubmit, reset } = useForm({ defaultValues });

  // USE EFFECT
  useEffect(() => {
    // if (!uploadVideoModal?.status) return;

    if (uploadVideoRef.current && uploadVideoModal?.status) {
      uploadVideoRef.current.showModal();
    }

    if (!uploadVideoModal?.status) {
      uploadVideoRef.current.close();
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadVideoModal?.status]);

  // VIDEO SUBMIT HANDLER
  // async function handleVideoSubmit(event) {
  //   event.preventDefault();

  //   const formData = new FormData(event.target);

  //   console.log("formData", formData);

  //   return;
  // }

  async function uploadVideoHandler(data) {
    // console.log("DEBUG =>", data);

    // setUploadingVideo(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("videoFile", data.videoFile);
    formData.append("thumbnail", data.thumbnail);

    closeUploadVideoModal();

    try {
      const response = await api.post("/publish", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        closeUploadVideoModal();
        toast.success(response.data.message);
      } else {
        toast.error("Failed to upload video!! Please try again!");
      }
    } catch (error) {
      console.error("Error while uploading the video: ", error.message);
    } finally {
      setDetailsUpdated(!detailsUpdated);
      setUploadingVideo(false);
      closeUploadVideoModal();
    }
  }

  return (
    <dialog
      ref={uploadVideoRef}
      className="dialog fixed p-10 rounded-lg w-[800px] h-fit"
      onClose={closeUploadVideoModal}
    >
      <form
        // onSubmit={handleVideoSubmit}
        onSubmit={handleSubmit(uploadVideoHandler)}
        // encType="multipart/form-data"
        className="flex flex-col items-center gap-4"
      >
        <h2 className="font-bold text-2xl">Upload Video</h2>

        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <input
              {...field}
              type="text"
              id="upload-title"
              size={30}
              placeholder="Enter Title"
              className="border-2 border-(--border-color) p-3 text-base outline-none w-full focus:border-(--border-focus-color) rounded-md"
              required
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <textarea
              {...field}
              type="text"
              id="upload-description"
              placeholder="Enter Description"
              className="w-full min-h-52 field-sizing-content p-2 outline-none border-2 border-(--border-color) focus:border-(--border-focus-color) rounded-md"
              required
            ></textarea>
          )}
        />
        <UploadFileButtons control={control} />
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

export default UploadVideoForm;
