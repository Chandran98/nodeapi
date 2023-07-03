const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = expressAsyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader === null || authHeader === "" || authHeader === undefined) {
    res.status(401);
    throw new Error("Token is missing ");
  }

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    console.log(token);
    if (token === null || token === "" || token === undefined) {
      res.status(400);
      throw new Error("Token is missing ");
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decode) => {
      if (err) {
        res.status(401);
        throw new Error("Token is not verified");
      }
      req.user = decode.user;
      next();
    });
  }
});

module.exports = { validateToken };
