const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Connect to MongoDB
MONGODB_URL = process.env.MONGODB_URL;
mongoose
  .connect(MONGODB_URL)
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

// Define schemas
const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

AdminSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  enrolledCourseId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
});

UserSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
