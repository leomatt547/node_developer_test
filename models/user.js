const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Skema penyimpanan username dan password
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Masukkan email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Mohon masukkan email yang valid']
  },
  password: {
    type: String,
    required: [true, 'Masukkan password'],
    minlength: [8, 'Maaf, minimal panjang password 8 karakter'],
  }
});


// fire a function before doc saved to db
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const User = mongoose.model('user', userSchema);

module.exports = User;