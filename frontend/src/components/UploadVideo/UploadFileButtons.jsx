import { Controller } from "react-hook-form";

// eslint-disable-next-line react/prop-types
function UploadFileButtons({ control }) {
  return (
    <div className="flex gap-4">
      <section className="flex flex-col items-center justify-center border-2 border-[#893939] rounded-xl">
        <Controller
          control={control}
          name="videoFile"
          render={({ field: { onChange, onBlur, name, ref } }) => (
            <>
              <label htmlFor="upload-video">Choose a Video File: </label>
              <input
                name={name}
                ref={ref}
                onBlur={onBlur}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  onChange(file); // Pass the File object, not the input value
                }}
                type="file"
                id="upload-video"
                className="p-4 cursor-pointer outline-none rounded-lg file:p-2 file:text-white file:bg-blue-600 file:border-0 file:rounded-lg file:cursor-pointer hover:file:bg-purple-600 transition-colors ease-in-out duration-200"
                accept="video/mp4"
                required
              />
            </>
          )}
        />
      </section>
      <section className="flex flex-col items-center justify-center border-2 border-[#893939] rounded-xl">
        <Controller
          control={control}
          name="thumbnail"
          render={({ field: { onChange, onBlur, name, ref } }) => (
            <>
              <label htmlFor="upload-thumbnail">Choose a Thumbnail: </label>
              <input
                type="file"
                id="upload-thumbnail"
                name={name}
                ref={ref}
                onBlur={onBlur}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  onChange(file); // Pass the File object, not the input value
                }}
                className="p-4 cursor-pointer outline-none rounded-lg file:p-2 file:text-white file:bg-blue-600 file:border-0 file:rounded-lg file:cursor-pointer hover:file:bg-purple-600 transition-colors ease-in-out duration-200"
                accept="image/png, image/jpeg"
                required
              />
            </>
          )}
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
