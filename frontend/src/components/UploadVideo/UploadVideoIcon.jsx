import { useModalsStore } from "../../store/modalsStore";

const UploadVideoIcon = () => {
  const { openUploadVideoModal } = useModalsStore((state) => state);

  return (
    <div
      className="bg-blue-600 rounded-[50%] p-3 cursor-pointer fixed right-4 bottom-4 flex items-center justify-center"
      onClick={openUploadVideoModal}
    >
      <img src="/icons/upload-icon.svg" alt="Upload icon" />
    </div>
  );
};

export default UploadVideoIcon;
