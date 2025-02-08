import Avatar from "@mui/material/Avatar";
import PropTypes from "prop-types";

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: name.split(" ")[1]
      ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
      : `${name.split(" ")[0][0]}`.toUpperCase(),
  };
}

export default function BackgroundLetterAvatars({ fullname = "John Doe" }) {
  return <Avatar {...stringAvatar(fullname)} />;
}

BackgroundLetterAvatars.propTypes = {
  fullname: PropTypes.string,
};
