const express = require("express");

const { validateToken } = require("../middlewares/tokenvalidation");
const {
  getProducts,
  createProductsById,
  getMyProductsById,
  createProduct,
  payOnline
} = require("../controllers/productController");
const router = express.Router();


router.route("/").get(getProducts).post(createProduct);

// router.route("/:id").get(getProductsByid);

router.route("/createProductById").post(createProductsById);
router.route("/getMyProduct").post(getMyProductsById);
router.route("/payments").post(validateToken, payOnline);

module.exports = router;
