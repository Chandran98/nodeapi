const mongoose = require("mongoose");

const authSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a username"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: [true, "Please add a valid email"],
    },
    phone: {
      type: String,
      default: "",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Users", authSchema);
