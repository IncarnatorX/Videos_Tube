import "./UploadFileButtons.css";

function UploadFileButtons() {
  return (
    <div className="flex gap-4">
      <section className="flex flex-col items-center justify-center border-2 border-[#893939] rounded-xl">
        <label htmlFor="upload-video">Choose a Video File: </label>
        <input
          type="file"
          id="upload-video"
          className="upload-btns"
          name="videoFile"
          accept="video/mp4"
          required
        />
      </section>

      <section className="flex flex-col items-center justify-center border-2 border-[#893939] rounded-xl">
        <label htmlFor="upload-thumbnail">Choose a Thumbnail: </label>
        <input
          type="file"
          id="upload-thumbnail"
          className="upload-btns"
          name="thumbnail"
          accept="image/png, image/jpeg"
          required
        />
      </section>
    </div>
  );
}

export default UploadFileButtons;

// <Button
//         component="label"
//         role={undefined}
//         variant="contained"
//         tabIndex={-1}
//         startIcon={<CloudUploadIcon />}
//         color="secondary"
//       >
//         Browse files
//         <VisuallyHiddenInput
//           type="file"
//           name="videoFile"
//           onChange={(event) => setFileDetails(event.target.files)}
//           required
//         />
//       </Button>

//       {/* FILE NAME */}
//       {fileDetails[0] && (
//         <p className=" p-4 text-sm"> File Name:{fileDetails[0]?.name} </p>
//       )}
