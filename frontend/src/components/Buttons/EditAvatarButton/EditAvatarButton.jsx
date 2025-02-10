import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";

const EditAvatarButton = ({ handleEditAvatarDialog }) => {
  return (
    <button
      onClick={() => handleEditAvatarDialog()}
      className="flex items-center justify-center gap-2 bg-red-500 py-2 px-4 rounded-md cursor-pointer mt-4"
    >
      <EditIcon />
      Edit Avatar
    </button>
  );
};

EditAvatarButton.propTypes = {
  handleEditAvatarDialog: PropTypes.func,
};

export default EditAvatarButton;
