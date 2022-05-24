require("dotenv").config();
require("./config/database").connect();
const cookieParser = require('cookie-parser');

const express = require("express");

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// Logic goes here
app.get("/", (req, res) => {
  res.status(200).send("Selamat datang");
});

module.exports = app;