const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please Add name"],
    },
    email: {
      type: String,
      required: [true, "Please Add email"],
    },
    phone: {
      type: String,
      required: [true, "Please Add email"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userModel);
