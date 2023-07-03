const asyncHanlder = require("express-async-handler");
const userModel = require("../models/user.model");

const getuserdata = asyncHanlder(async (req, res) => {
  const user = await userModel.find({ user_id: req.user.id });

  // const user = await userModel.find({});
  res.status(200).json(user);
});

const createuser = asyncHanlder(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await userModel.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(200).json(user);
});
const getuserById = asyncHanlder(async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("Not found ");
  }
  if (user.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not valid");
  }
  res.status(200).json({ message: "get by id", details: user });
});

const updateuserById = asyncHanlder(async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("Not found ");
  }
  if (user.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not valid");
  }
  const updateuser = await userModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({ message: "updaate by id", detais: updateuser });
});

const deleteuserById = asyncHanlder(async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("Not found ");
  }
  if (user.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not valid");
  }
  await userModel.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "delete by id" });
});

module.exports = {
  getuserdata,
  createuser,
  deleteuserById,
  updateuserById,
  getuserById,
};
