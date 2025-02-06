import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function UploadFileButton() {
  const [fileDetails, setFileDetails] = useState("");

  useEffect(() => {
    let id;
    if (fileDetails) {
      id = setTimeout(() => {
        setFileDetails("");
      }, 10000);
    }

    return () => clearTimeout(id);
  }, [fileDetails]);

  return (
    <div className="flex flex-col gap-4">
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        color="secondary"
      >
        Browse files
        <VisuallyHiddenInput
          type="file"
          name="videoFile"
          onChange={(event) => setFileDetails(event.target.files)}
          required
        />
      </Button>

      {/* FILE NAME */}
      {fileDetails[0] && (
        <p className=" p-4 text-sm"> File Name:{fileDetails[0]?.name} </p>
      )}
    </div>
  );
}

export default UploadFileButton;
