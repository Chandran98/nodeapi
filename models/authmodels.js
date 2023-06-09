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

    wallet: [
      {
        publicAddress: { type: String },
        privateAddress: { type: String },
      },
    ],
    phone: {
      type: String,
      
      required: [true, "Please add a phone"],
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
