const express = require("express");
const { getCrypto } = require("../controllers/cryptocontrollers");
const { validateToken } = require("../middlewares/tokenvalidation");

const router = express.Router();

router.route("/").get(validateToken, getCrypto);

module.exports = router;
