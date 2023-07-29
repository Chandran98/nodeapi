const express = require("express");
const { validateToken } = require("../middlewares/tokenvalidation");
const {
  signUpRequest,
  signInRequest,
  currentUser,
  sendLoginOtp,
  verifyOtp,
} = require("../controllers/authController");

const router = express.Router();

router.route("/signUp").post(signUpRequest);
router.route("/signIn").post(signInRequest);
router.route("/sendOtp").post(sendLoginOtp);
router.route("/verifyOtp").post(verifyOtp);

router.route("/current").get(validateToken, currentUser);

module.exports = router;
