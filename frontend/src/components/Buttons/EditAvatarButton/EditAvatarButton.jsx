import PropTypes from "prop-types";

const EditAvatarButton = ({ handleEditAvatarDialog }) => {
  return (
    <button
      onClick={() => handleEditAvatarDialog()}
      className="flex items-center justify-center gap-2 bg-red-500 py-2 px-4 rounded-md cursor-pointer mb-2 w-fit"
    >
      <img src="/icons/edit-icon.svg" alt="Edit icon" />
      Edit Avatar
    </button>
  );
};

EditAvatarButton.propTypes = {
  handleEditAvatarDialog: PropTypes.func,
};

export default EditAvatarButton;
