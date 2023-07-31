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
    profilePhoto:{
      type:String,

    },
    wallet: [
      {
        publicAddress: { type: String },
        privateAddress: { type: String },
      },
    ],
    createdProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
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
    viewers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Users",
      },
    ],
    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Users",
      },
    ],
    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Users",
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    plan: [{ type: String, enum: ["Noob", "Pro", "XPro"], default: "Noob" }],
  },
  { timestamp: true }
);

module.exports = mongoose.model("Users", authSchema);
