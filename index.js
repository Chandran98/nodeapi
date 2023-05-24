const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config");

const auth = require("./middlewares/auth");
const auth = require("./middlewares/errors");

const unless = require("express-unless");

const app = express();


mongoose.Promise =global.Promise
;