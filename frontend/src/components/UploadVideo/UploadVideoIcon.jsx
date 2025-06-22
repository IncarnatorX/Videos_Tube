import PropTypes from "prop-types";

const UploadVideoIcon = ({ handleUploadVideoDialog }) => {
  return (
    <div
      className="bg-blue-600 rounded-[50%] p-3 cursor-pointer fixed right-4 bottom-4 flex items-center justify-center"
      onClick={handleUploadVideoDialog}
    >
      <img src="/icons/upload-icon.svg" alt="Upload icon" />
    </div>
  );
};

UploadVideoIcon.propTypes = {
  handleUploadVideoDialog: PropTypes.func.isRequired,
};

export default UploadVideoIcon;
