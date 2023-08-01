const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
// const userModel = require("../models/authmodels");

// const authSchema = require("../models/authmodels");
const userModel = require("../models/authmodels");
const proudctmodel = require("..//models/productmodel");

const getProducts = asyncHandler((req, res) => {
  res.status(200).json({ message: "new products" });
});

const createProduct = asyncHandler(async (req, res) => {
  const user = console.log(req.body);

  const { name, price, qty } = req.body;
  if (!name || !price || !qty) {
    res.status(400);

    throw new Error("All fields are mandatory");
  }

  const product = await proudctmodel.create({
    name,
    price,
    qty,
  });

  res.status(200).json(product);
});

const createProductsById = asyncHandler(async (req, res) => {
  console.log(req.body);

  const user = await userModel.findById(req.body.id);

  if (!user) {
    res.status(201).json({ message: "Invalid user" });
  }
  if (user) {
    const productNew = await proudctmodel.create({
      creatorId: req.body.id,
      name: req.body.name,
      price: req.body.price,
      qty: req.body.qty,
    });
    await userModel.findByIdAndUpdate(
      req.body.id,
      {
        $push: { createdProducts: productNew.id },
      },
    );

    res.status(200).json({ status: true, message: productNew });
  }

  res.status(200).json({ message: `product id ${req.params.id}` });
});

const getMyProductsById = asyncHandler(async (req, res) => {
  console.log(req.body);
  const user = await userModel.findById(req.body.id);

  if (!user) {
    res.status(201).json({ message: "Invalid user" });
  }
  if (user) {
    console.log("user");
    const productNew = await proudctmodel.find({
      creatorId: req.body.id,
    });
    res.status(200).json({ status: true, message: productNew });
  }

  res.status(200).json({ message: `product id ${req.params.id}` });
});

module.exports = {
  getProducts,
  createProductsById,
  getMyProductsById,
  createProduct,
};
