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
    profilePhoto: {
      type: String,
    },
    lastLogin: {
      type: Date,
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
    blockList: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Users",
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    plan:[ {
      type: String,
      enum: ["Beginner", "Intermediate", "Pro"],
      default: "Beginner",
    }],
  },
  { timestamp: true, toJSON: { virtuals: true } }
);
// authSchema.virtual("blockedUsers").get(function () {
//   return this.blockList.length;
// });

module.exports = mongoose.model("Users", authSchema);
// "lastLogin": "2023-08-03T11:27:06.383Z",
// "lastLogin": "2023-08-03T11:28:23.590Z",

