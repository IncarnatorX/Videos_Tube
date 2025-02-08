import Avatar from "@mui/material/Avatar";
import PropTypes from "prop-types";

export default function ImageAvatars({ avatarSrc }) {
  return <Avatar src={avatarSrc} />;
}

ImageAvatars.propTypes = {
  avatarSrc: PropTypes.string,
};
