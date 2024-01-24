const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const MONGODB_URL = process.env.MONGODB_URL;

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log('DB connected successfully'))
  .catch((error) => console.log(error));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

userSchema.pre('save', function (next) {
  var user = this;

  if (!user.isModified('password')) next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) next(err);
      user.password = hash;
      next();
    });
  });
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = { User, Account };
