// const AWS = require("aws-sdk");
// const express = require("express");
// const multer = require("multer");
// const asyncHandler = require("express-async-handler");
// const router = express.Router();
// // const storage = multer.memoryStorage();
// // const upload = multer({
// //   storage: storage,
// //   //   limits: { files: 2, fileSize: 10000000 },
// // });
// // const s3= new awsS3.S3({
// //   accessKeyId: "AKIA2VEIFVYAA6AYZROR",
// //   secretAccessKey: "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",
// // });

// // module.exports.uploadImage = async (req, res) => {
// //   console.log("req.file");
// //   upload.single("file", async (req, res) => {
// //     const params = {
// //       Bucket: "",
// //       Key: req.file.originalname,
// //       Body: req.file.buffer,
// //       ACL: "public-read", // Set access permissions for the uploaded file
// //     };

// //     await s3.upload(params, (err, data) => {
// //       if (err) res.send({ status: false, message: err.message });
// //       if (data)
// //         res.send({
// //           status: true,
// //           data: data.Location,
// //           message: "File uploaded successfully",
// //           type: data.Key,
// //         });
// //     });
// //   });
// // };

// AWS.config.update({
//   accessKeyId: process.env.S3_KEY,
//   secretAccessKey: process.env.S3_SCERET_KEY,
//   // region: 'your_bucket_region',
// });

// const s3 = new AWS.S3();

// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024, // limit file size to 5MB
//   },
// });

// const upLoadImage = asyncHandler(async (req, res) => {
//   upload.single("file"),
//     async (req, res) => {
//       const params = {
//         Bucket: "your_bucket_name",
//         Key: req.file.originalname,
//         Body: req.file.buffer,
//       };

//       await s3.upload(params, (err, data) => {
//         if (err) {
//           console.error(err);
//           return res.status(500).send("Error uploading file");
//         }

//         res.send("File uploaded successfully");
//       });
//     };
// });

// router.route("/upload").post(upLoadImage);

// module.exports = router;
