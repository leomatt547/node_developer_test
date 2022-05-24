require("dotenv").config();
require("./config/database").connect();
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/auth_middleware');
const authRoutes = require('./routes/auth_route');
var cors = require('cors')

const express = require("express");
const { positions,position_id } = require("./controllers/positions_controller");

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors())

// routes
app.get('*', checkUser);
app.get('/', (req, res) => {
    res.sendFile('views/home.html', {root: __dirname})
});
app.get('/positions', requireAuth, positions);
app.get('/positions/:id', requireAuth, position_id);
app.use(authRoutes);

module.exports = app;