import { v2 as cloudinary } from "cloudinary";

if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error("Missing Cloudinary credentials in environment variables");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (
  buffer: Buffer,
  folder: string = "sermons"
) => {
  try {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            folder: folder,
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          }
        )
        .end(buffer);
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

export default cloudinary;
