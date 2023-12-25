const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL);

// Define schemas
const AdminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  enrolledCourseId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
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
