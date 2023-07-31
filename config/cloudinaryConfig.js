const { CloudinaryStorage } = require("multer-storage-cloudinary");
// require("dotenv");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLU_NAME,
  api_key: process.env.CLU_API,
  api_secret: process.env.CLU_SECKEY,
});

exports.cloudStorage =new CloudinaryStorage({
   cloudinary,
  allowedFormate: ["jpeg", "png"],
  params: {
    folder: "estio",
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});
