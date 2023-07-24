const express = require("express");
const { validateToken } = require("../middlewares/tokenvalidation");
const {
  signUpRequest,
  signInRequest,
  currentUser,
} = require("../controllers/authController");

const router = express.Router();


router.route("/signUp").post(signUpRequest);
router.route("/signIn").post(signInRequest);

router.route("/current").get(validateToken, currentUser);
// I made  a change
// now made changes
module.exports = router;
