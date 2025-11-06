import stringToColor from "./stringToColor";

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

export default stringAvatar;
