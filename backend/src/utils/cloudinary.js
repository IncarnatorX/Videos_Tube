import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // console.log("File uploaded on cloudinary and the src is: ", response.url);
    fs.unlinkSync(localFilePath); // delete file after the file is uploaded to cloudinary
    return response;
  } catch (error) {
    // console.log("Error Uploading the file to cloudinary:", error.message);
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteFromCloudinary = async (publicId, resource) => {
  try {
    if (resource === "video") {
      await cloudinary.uploader.destroy(publicId, {
        resource_type: "video",
      });
    }

    if (resource === "thumbnail") {
      await cloudinary.uploader.destroy(publicId);
    }
  } catch (error) {
    console.error(
      "Error while deleting the resources from cloudinary: ",
      error.message
    );
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
