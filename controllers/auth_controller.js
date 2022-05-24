const User = require("../models/User");
const jwt = require('jsonwebtoken');

// tangani error yang akan terjadi
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { username: '', password: '' };

  // incorrect username
  if (err.message === 'incorrect username') {
    errors.username = 'Username tidak terdaftar';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'Password salah';
  }

  // *  Pesan error username dan password disamakan agar 
  //    menambah kombinasi terjadi brute force 

  // Username duplikat
  if (err.code === 11000) {
    errors.username = 'Username sudah pernah digunakan';
    return errors;
  }

  // Validasi error
  if (err.message.includes('Maaf')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  if (err.message.includes('Masukkan')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }


  return errors;
}

// Generate JWT
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'rahasia', {
    expiresIn: maxAge
  });
};

// // controller actions
// module.exports.signup_get = (req, res) => {
//   res.render('signup');
// }

// module.exports.login_get = (req, res) => {
//   res.render('login');
// }

module.exports.signup_post = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.create({ username, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.login_post = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}