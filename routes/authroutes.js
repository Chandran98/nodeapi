const express = require("express");
const { validateToken } = require("../middlewares/tokenvalidation");
const {
  signUpRequest,
  signInRequest,
  currentUser,
} = require("../controllers/authController");

const router = express.Router();

// router.route("/register").post(registerUser);
// router.post("/register", registerUser);
// router.post("/login", loginUser);

router.post("/signUp", signUpRequest);
router.post("/signIn", signInRequest);

router.get("/current", validateToken, currentUser);
module.exports = router;
