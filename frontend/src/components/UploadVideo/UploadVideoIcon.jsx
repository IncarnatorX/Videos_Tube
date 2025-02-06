import Fab from "@mui/material/Fab";
import UploadIcon from "@mui/icons-material/Upload";
import { useContext } from "react";
import { VideoContext } from "../../Context/Context";

const UploadVideoIcon = () => {
  const { handleUploadVideoDialog } = useContext(VideoContext);

  const fabStyle = {
    position: "absolute",
    top: 550,
    right: 16,
  };
  return (
    <Fab color="primary" sx={fabStyle} onClick={handleUploadVideoDialog}>
      <UploadIcon />
    </Fab>
  );
};

export default UploadVideoIcon;
