const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

module.exports.validateMongoDbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error("Invalid Id or not Found");
};

exports.generateToken = (data) => {
  return jwt.sign(data, process.env.ACCESS_TOKEN, { expiresIn: "1d" });
};
