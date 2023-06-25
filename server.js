const express = require("express");
const errorhandler = require("./middlewares/error");
const connectDb = require("./config/db.config");
const dotenv = require("dotenv").config();


connectDb();
const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());


app.use("/api/message",(req, res)=>{
  res.status(200).json({message:"Why I'm not getting it?"})
});

app.use("/api/aws",(req, res)=>{
  res.status(200).json({message:"Busted"})
});
app.use("/api/data",require("./routes/users.route"));
app.use("/api/auth",require("./routes/authroutes"));
app.use(errorhandler);
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
