const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/authcontrollers");
const { validateToken } = require("../middlewares/tokenvalidation");

const router = express.Router();

// router.route("/register").post(registerUser);
router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken,currentUser);
module.exports = router;
