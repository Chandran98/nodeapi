const asyncHandler = require("express-async-handler");
const authSchema = require("../models/authModels");
const OtpModel = require("../models/otpmodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ethers } = require("ethers");
const crypto = require("../helpers/crypto");
const twilio = require("twilio");
require("dotenv").config();

// Register handlers
const signUpRequest = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;
  console.log(req.body);

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const userAvailable = await authSchema.findOne({ email });
  console.log("dsd");

  if (userAvailable) {
    res.status(400);
    throw new Error("User already exists");
  }
  console.log("ddsdssd");
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);

  const wallet = ethers.Wallet.createRandom();
  const publicAddress = crypto.encrypt(wallet.address);
  const privateAddress = crypto.encrypt(wallet.privateKey);

  console.log(`${publicAddress} ${privateAddress}`);
  const user = await authSchema.create({
    name,
    email,
    wallet: {
      publicAddress,
      privateAddress,
    },
    phone,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invlaid user already");
  }
});

// Login handlers
const signInRequest = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  console.log(email, password);

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }
  const user = await authSchema.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  const userAvailable = await bcrypt.compare(password, user.password);
  if (!userAvailable) {
    res.status(400);
    throw new Error("Invalid password");
  }

  const accessToken = jwt.sign(
    {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "1d" }
  );
  res.status(200).json({
    status: "success",
    token: accessToken,
  });
});
// Current User handlers
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

const client = twilio(process.env.SID, process.env.TWILLO_SCERET_KEY);

const sendLoginOtp = asyncHandler(async (req, res) => {
  const mobile = req.body.mobile;
  const otp = Math.floor(100000 + Math.random() * 900000);
  
  let otpEntry = await OtpModel.findOne({ mobile });
  console.log(Date());

  console.log(Date().setMinutes(expirationTime.getMinutes() + 5));

  otpEntry
    ? ((otpEntry.otp = otp), otpEntry.save())
    : OtpModel.create({ mobile, otp });

  await client.messages.create(
    {
      body: `Your Otp is ${otp}`,
      from: process.env.PHONE_NO,
      to: `+91${mobile}`,
    },
    (err, message) => {
      if (err) {
        res
          .status(400)
          .json({ error: err, message: "Failed to Send Otp please try again" });
      }
      if (message) {
        res
          .status(200)
          .json({ message: `OTP sent successfully${message.date_updated}` });
      }
    }
  );
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { mobile, otp } = req.body;

  const userMobile = await OtpModel.findOne({ mobile });
  if (otp === userMobile.otp) {
    await userMobile.deleteOne();

    res.status(200).json({ message: "Verified successfully" });
  }
  if (otp !== userMobile.otp) {
    res.status(200).json({ message: "Invalid otp or expired" });
  }
});

module.exports = {
  currentUser,
  signUpRequest,
  signInRequest,
  sendLoginOtp,
  verifyOtp,
};
