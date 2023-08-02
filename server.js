const express = require("express");
const bodyParser = require("body-parser");
const { ethers } = require("ethers");

const path = require("path");
const fs = require("fs");
const cors = require("cors");
const errorhandler = require("./middlewares/error");
const connectDb = require("./config/db.config");
const dotenv = require("dotenv").config();
const { Keypair } = require("@solana/web3.js");
const { Connection, clusterApiUrl } = require("@solana/web3.js");

const crypto = require("./helpers/crypto");
const { route } = require("./routes/usersroute");
const morgan = require("morgan");

connectDb();
const app = express();

const port = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// app.use(express.json());
app.use(cors());

const connection = new Connection(clusterApiUrl("devnet"));
const keypair = Keypair.generate();

const publicKey = keypair.publicKey.toString();
const privateKey = keypair.secretKey.toString();

// console.log(`Key's ${publicKey}`);
// console.log(`Key's ${privateKey}`);

// const text_to_encrypt = "texta";
// const result = crypto.aesEncrypt(text_to_encrypt);
// console.log("“encrypted result", result);

// const decryptedText = crypto.aesDecrypt(result);
// console.log("‘decrypted text", decryptedText);

const decryptedText2 = crypto._decrypt(
  "3futy7T/BurYP9HCczSWkbU0uEjDJ39VX9azB41K+HgsCuGHqr7/ZuYRhfe7/ho1"
);
console.log("‘decrypted text", decryptedText2);

app.use("/api/users", require("./routes/usersroute"));

app.use("/api/aws", (req, res) => {
  res.status(200).json({ message: "Busted" });
});

app.use("/api/auth", require("./routes/authroutes"));
app.use("/api/products", require("./routes/productroutes"));
app.use("/api/crypto", require("./routes/cryptorouters"));

app.all("*", (req, res) => {
  res.status(404);

  res.sendFile("views/404.html", { root: __dirname });
  throw new Error("Route Not Found");
});
app.use(errorhandler);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

// test branch