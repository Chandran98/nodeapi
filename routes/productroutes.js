const express = require('express');
const {getProducts,getProductsByid,createProduct}= require("../controllers/productController")
const router = express.Router();

router.route("/").get(getProducts
).post(createProduct)


router.route("/:id").get(getProductsByid
    )



module.exports= router;