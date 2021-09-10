require('dotenv').config();
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRETE
});

const cloudUpload = async (filePath) => {
  const options = {
    folder: `uploads`,
    use_filename: false,
    resource_type: "auto"
  };

  let response;

  await cloudinary.uploader.upload(
    filePath,
    options,
    async function (error, result) {
      if (error) {
        response = error;
      } else {
        response = result;
      };
    }
  );

  return response;
};

module.exports = { cloudUpload }