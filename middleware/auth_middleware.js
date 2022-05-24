const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // Kembali cek apakah JWT masih berlaku dan valid
  if (token) {
    jwt.verify(token, 'rahasia', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        // res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(400).json({error: "Token expired, login kembali"});
  }
};

// Kembali cek user yang sekarang sedang digunakan
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'rahasia', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};


module.exports = { requireAuth, checkUser };