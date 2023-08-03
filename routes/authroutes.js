const express = require("express");
const { validateToken } = require("../middlewares/tokenvalidation");
const {
  signUpRequest,
  signInRequest,
  currentUser,
  sendLoginOtp,
  verifyOtp,
  getPhoto,
  blockUser,
  unBlockUser,deleteUser
} = require("../controllers/authController");
const multer = require("multer");
const { cloudStorage } = require("../config/cloudinaryConfig");

const router = express.Router();

const upload = multer({ cloudStorage });
// router.route("/upload").post(upload.single("profile"),validateToken, getPhoto);
router.route("/upload").post(validateToken, getPhoto);

router.route("/signUp").post(signUpRequest);
router.route("/signIn").post(signInRequest);
router.route("/sendOtp").post(validateToken, sendLoginOtp);
router.route("/verifyOtp").post(verifyOtp);
router.route("/blockUser").post(validateToken, blockUser);
router.route("/unBlockUser").post(validateToken, unBlockUser);

// router.route("/uploadPic").post(verifyOtp);

router.route("/getProfile").get(validateToken, currentUser);
router.route("/deleteUser").get(validateToken, deleteUser);

module.exports = router;
