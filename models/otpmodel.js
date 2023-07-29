const mongoose = require("mongoose");

const otpSchema = mongoose.Schema(
  {
    mobile: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      // required: true,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Otp", otpSchema);
