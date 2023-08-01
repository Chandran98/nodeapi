const express = require("express");
const { validateToken } = require("../middlewares/tokenvalidation");
const {
  signUpRequest,
  signInRequest,
  currentUser,
  sendLoginOtp,
  verifyOtp,
  getPhoto,
} = require("../controllers/authController");
const multer = require("multer");
const { cloudStorage } = require("../config/cloudinaryConfig");

const router = express.Router();

const upload = multer({ cloudStorage });
router.route("/upload").post(upload.single("profile"),validateToken, getPhoto);

router.route("/signUp").post(signUpRequest);
router.route("/signIn").post(signInRequest);
router.route("/sendOtp").post(validateToken, sendLoginOtp);
router.route("/verifyOtp").post(verifyOtp);

// router.route("/uploadPic").post(verifyOtp);

router.route("/current").get(validateToken, currentUser);

module.exports = router;
