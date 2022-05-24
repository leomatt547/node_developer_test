require("dotenv").config();
require("./config/database").connect();
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/auth_middleware');
const authRoutes = require('./routes/auth_route');
var cors = require('cors')

const express = require("express");

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors())

// Logic goes here
// app.get("/", (req, res) => {
//   res.status(200).send("Selamat datang");
// });

// routes
app.get('*', checkUser);
app.get('/', (req, res) => {
    res.status(200).send("Selamat datang");
});
// app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);

module.exports = app;