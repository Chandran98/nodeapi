const asyncHanlder = require("express-async-handler");
const userModel = require("../models/authModels");
const { validateMongoDbId } = require("../helpers/validateId");

const getuserdata = asyncHanlder(async (req, res) => {
  // const user = await userModel.find({ user_id: req.user.id });

  const user = await userModel.find(req.query);
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
  console.log(req.params.id);
  const user = await userModel.findById(req.params.id);
  console.log(user.id);
  if (!user || user === null || user === undefined) {
    // res.status(404).json({ message: "Not found", details: user });
    res.status(404);
    throw new Error("Not found ");
  }
  if (user.user_id !== req.user.id) {
    res.status(403);
    throw new Error("Not valid");
  }

  res.status(200).json({ message: "success", details: user });
});

const updateuserById = asyncHanlder(async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("Not found ");
  }
  if (user.user_id !== req.user.id) {
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
  if (user.user_id !== req.user.id) {
    res.status(403);
    throw new Error("Not valid");
  }
  await userModel.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "delete by id" });
});

const blockUser = asyncHanlder(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const user = await userModel.findById(id);
  console.log(user);

  // if (!user) {
  //   res.status(404);
  //   throw new Error("Not found ");
  // }
  validateMongoDbId(id);

  // if (user.user_id !== req.user.id) {
  //   res.status(403);
  //   throw new Error("Not valid");
  // }

  const bUser = await userModel.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true }
  );
  res
    .status(200)
    .json({ status: "success", message: `${bUser.name} is blocked` });
});

const unBlockUser = asyncHanlder(async (req, res) => {
  const id = req.params.id;
  const user = await userModel.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("Not found ");
  }

  if (user.user_id !== req.user.id) {
    res.status(403);
    throw new Error("Not valid");
  }

  const unBUser = await userModel.findByIdAndUpdate(
    id,
    { $set: { isBlocked: false } },
    { new: true }
  );
  res
    .status(200)
    .json({ status: "success", message: `${unBUser.name} .is Un-blocked` });
});

const getUserById = asyncHanlder(async (req, res) => {
  console.log(req.params.id);
  const user = await userModel.findById(req.params.id);
  console.log(user);
  if (!user) {
    res.status(404);
    throw new Error("Not found ");
  }
  if (user.user_id !== req.user.id) {
    res.status(403);
    throw new Error("Not valid");
  }
  // await userModel.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "delete by id" });
});

module.exports = {
  getuserdata,
  createuser,
  deleteuserById,
  updateuserById,
  getUserById,
  getuserById,
  unBlockUser,
  blockUser,
};
