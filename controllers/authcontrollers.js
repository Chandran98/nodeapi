const expressAsyncHandler = require("express-async-handler");
const authmodels = require("../models/authmodels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = expressAsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const availableUser = await authmodels.findOne({ email });
  if (availableUser) {
    res.status(400);
    throw new Error("Email is already registered");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(`password${hashedPassword}`);
  const newUser = await authmodels.create({
    username,
    email,
    password: hashedPassword,
  });
  if (newUser) {
    res.status(201).json({
      message: "User creadted",
      details: [{ id: newUser.id, email: newUser.email }],
    });
  } else {
    res.status(400).json({ message: "User data is not valid" });
  }

  // res.status(200).json({ message: "usercreated" });
});
const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const user = await authmodels.findOne({email});
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "50m" }
    );
    res.status(200).json({token});
  }else{
    
  res.status(400);
  throw new Error("Invaild Email or password ")
  }
});
const currentUser = expressAsyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
