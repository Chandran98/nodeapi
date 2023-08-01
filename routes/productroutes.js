const express = require("express");
const {
  getProducts,
  createProductsById,
  getMyProductsById,
  createProduct,
} = require("../controllers/productController");
const router = express.Router();

router.route("/").get(getProducts).post(createProduct);

// router.route("/:id").get(getProductsByid);

router.route("/createProductById").post(createProductsById);
router.route("/getMyProduct").post(getMyProductsById);

module.exports = router;
