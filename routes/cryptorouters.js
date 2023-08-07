const express = require("express");
const { getCrypto } = require("../controllers/cryptocontrollers");
const { placeOrder, accountInfo, bidPrice, depth, priceInfo } = require("../controllers/tradeController");
const { validateToken } = require("../middlewares/tokenvalidation");

const router = express.Router();

router.route("/").get(validateToken, getCrypto);

router.route("/placeOrder").get(placeOrder);
router.route("/accountInfo").get(accountInfo);
router.route("/priceInfo").post(priceInfo);
router.route("/bidPrice").post(bidPrice);
router.route("/depth").post(depth);

module.exports = router;
