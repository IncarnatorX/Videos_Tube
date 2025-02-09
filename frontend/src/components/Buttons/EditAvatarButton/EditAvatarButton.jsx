import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";

const EditAvatarButton = ({ editAvatarButtonClick }) => {
  return (
    <button
      onClick={() => editAvatarButtonClick()}
      className="flex items-center justify-center gap-2 bg-red-500 py-2 px-4 rounded-md cursor-pointer mt-4"
    >
      <EditIcon />
      Edit Avatar
    </button>
  );
};

EditAvatarButton.propTypes = {
  editAvatarButtonClick: PropTypes.func,
};

export default EditAvatarButton;
