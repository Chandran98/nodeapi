const asyncHandler = require("express-async-handler");
// const authSchema = require("../models/authModels");

const User = require("../models/authmodels");
const products = require("../models/productmodel");
const OtpModel = require("../models/otpmodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ethers, makeError } = require("ethers");
const crypto = require("../helpers/crypto");
const twilio = require("twilio");
const { generateToken } = require("../helpers/validateId");
const { validateToken } = require("../middlewares/tokenvalidation");
const authmodels = require("../models/authmodels");
require("dotenv").config();

// Register handlers
const signUpRequest = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;
  console.log(req.body);

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }
  console.log("dssasad");
  const userAvailable = await User.findOne({ email });
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
  const user = await User.create({
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
  console.log(req.headers);
  console.log(req.header);

  const { email, password } = req.body;
  console.log(req.body);
  console.log(email, password);

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  const userAvailable = await bcrypt.compare(password, user.password);
  if (!userAvailable) {
    res.status(400);
    throw new Error("Invalid password");
  }
  console.log("approved");

  user.lastLogin = new Date();
  await user.save();
  const accessToken = generateToken({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });

  res.status(200).json({
    status: "success",
    token: accessToken,
  });
});
// Current User handlers
const currentUser = asyncHandler(async (req, res) => {
  console.log(req.user._id);
  try {
    const user = await User.findById(req.user._id).populate(
      // "createdProducts"
      {
        path: "createdProducts",
        select: ["name", "price", "qty", "createdAt"],
      }
      // path: "createdProducts",
      // strictPopulate: false,
      // {path:"createdProducts",populate:{path:"creatorId",select:"name"}}
    );
    // .populate({ path: "creatorId", select: ["name"] });
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  console.log(req.user._id);
  try {
    const user = await User.findById(req.user._id);
    await products.deleteMany({ creatorId: req.user._id });
    await User.findByIdAndRemove(req.user._id);

    console.log(user.name);
    res.status(200).json(`${user.name} - your profile has been deleted`);
  } catch (error) {
    console.log(error);
  }
});

const client = twilio(process.env.SID, process.env.TWILIO_SCERET_KEY);

const sendLoginOtp = asyncHandler(async (req, res) => {
  console.log(req.body);
  const mobile = req.body.mobile;
  console.log(req.body);
  const otp = Math.floor(100000 + Math.random() * 900000);

  let otpEntry = await OtpModel.findOne({ mobile });
  // console.log(Date());

  // console.log(Date().setMinutes(expirationTime.getMinutes() + 5));

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
          .json({ message: `OTP sent successfully${message.accountSid}` });
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

const getPhoto = asyncHandler(async (req, res) => {
  // console.log(req.file.originalname);
  console.log(req.user._id);
  console.log(req.body.id);

  // console.log(`Viewers ${isUser.viewers}`);

  const mainUser = await User.findById(req.user._id);
  const viewedUser = await User.findById(req.body.id);
  if (!mainUser || !viewedUser) {
    res.status(201).json({ status: "false", message: "User not found" });
  }
  if (mainUser && viewedUser) {
    console.log(mainUser.viewers);
    const alreadyViewer = mainUser.viewers.find(
      (viewer) => viewer.toString() === viewedUser._id.toString()
    );
    if (alreadyViewer) {
      // res.status(200).json({ status: "true", message: "Already viewed" });
      res.status(400);
      throw new Error("Already viewed");
    }
  }
  console.log("sdafdsfd233");
  mainUser.viewers.push(viewedUser._id);

  await mainUser.save();
  res.status(200).json({ status: "true", message: "viewed successfully" });
  // } catch (e) {
  //   res.json({ error: e });
  // }
});

const blockUser = asyncHandler(async (req, res) => {
  console.log(req.user._id);
  console.log(req.body.id);

  const mainUser = await User.findById(req.user._id);
  const whoNeedsToBlock = await User.findById(req.body.id);

  if (!mainUser || !whoNeedsToBlock) {
    res.status(201).json({ status: "false", message: "User not found" });
  }
  if (mainUser && whoNeedsToBlock) {
    console.log(mainUser.blockList);
    const alreadyViewer = mainUser.blockList.find(
      (viewer) => viewer.toString() === whoNeedsToBlock._id.toString()
    );
    if (alreadyViewer) {
      res.status(400);
      throw new Error("Already blocked");
    }
  }
  mainUser.blockList.push(whoNeedsToBlock._id);

  await mainUser.save();
  res.status(200).json({ status: "true", message: "Blocked successfully" });
});

const unBlockUser = asyncHandler(async (req, res) => {
  console.log(req.user._id);
  console.log(req.body.id);

  const mainUser = await User.findById(req.user._id);
  const whoNeedsToUnBlock = await User.findById(req.body.id);

  if (!mainUser || !whoNeedsToUnBlock) {
    res.status(201).json({ status: "false", message: "User not found" });
  }
  if (mainUser && whoNeedsToUnBlock) {
    const blockedUserId = mainUser.blockList.includes(whoNeedsToUnBlock._id);
    console.log(`blockedUserId${blockedUserId}`);
    ``;
    // const alreadyBlocked = mainUser.blockList.find(
    //   (viewer) => viewer.toString() === whoNeedsToUnBlock._id.toString()
    // );
    if (!blockedUserId) {
      res.status(400);
      throw new Error("You haven't yet blocked the user");
    }
    if (blockedUserId) {
      const reList = mainUser.blockList.filter(
        (blockId) => blockId.toString() !== whoNeedsToUnBlock._id.toString()
      );
      console.log(reList);
      mainUser.blockList = reList;

      await mainUser.save();
    }
    res.status(200).json({ status: "true", message: "UnBlocked successfully" });
  }
});

module.exports = {
  currentUser,
  deleteUser,
  signUpRequest,
  signInRequest,
  sendLoginOtp,
  verifyOtp,
  getPhoto,
  blockUser,
  unBlockUser,
};
