import Avatar from "@mui/material/Avatar";
import PropTypes from "prop-types";
import stringAvatar from "../../utils/stringAvatar";

export default function BackgroundLetterAvatars({ fullname = "Avatar" }) {
  return <Avatar {...stringAvatar(fullname)} />;
}

BackgroundLetterAvatars.propTypes = {
  fullname: PropTypes.string,
};
