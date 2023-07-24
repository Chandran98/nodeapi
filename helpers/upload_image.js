const awsS3 = require("aws-sdk");
const express = require("express");
const multer = require("multer");

var router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  //   limits: { files: 2, fileSize: 10000000 },
});
awsS3.config.update({
  accessKeyId: "AKIA2VEIFVYAA6AYZROR",
  secretAccessKey: "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",
});
const s3 = new awsS3.S3();

module.exports.uploadImage = async (req, res) => {
  console.log("req.file");
  upload.single("file", async (req, res) => {
    const params = {
      Bucket: "bucketName",
      Key: req.file.originalname,
      Body: req.file.buffer,
      ACL: "public-read", // Set access permissions for the uploaded file
    };

    await s3.upload(params, (err, data) => {
      if (err) res.send({ status: false, message: err.message });
      if (data)
        res.send({
          status: true,
          data: data.Location,
          message: "File uploaded successfully",
          type: data.Key,
        });
    });
  });
};
