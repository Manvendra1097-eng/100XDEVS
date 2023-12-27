const { Router } = require('express');
const adminMiddleware = require('../middleware/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Admin, Course } = require('../db');
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: 'One or more parameter missing' });
    // checking for existing user
    const existingUser = await Admin.findOne({ username });
    if (existingUser)
      return res.status(422).json({ message: 'User already exists' });
    // if all checks passed
    await Admin.create({ username, password });
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: 'One or more parameter missing' });
    // checking for existing user
    const existingUser = await Admin.findOne({ username });
    if (!existingUser)
      return res.status(404).json({ message: 'User not registered' });
    const isValid = await bcrypt.compare(password, existingUser.password);
    if (!isValid)
      return res
        .status(403)
        .json({ message: 'Username or password is incorrect' });

    const SECRET = process.env.SECRET;
    // const payload = {
    //     data: 'your_data',  // your payload data
    //     exp: Math.floor(Date.now() / 1000) + (60 * 60),  // expires in 1 hour
    // };
    const token = jwt.sign({ username }, SECRET);
    res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/courses', adminMiddleware, (req, res) => {
  try {
    const { title, description, price, imageLink } = req.body;

    if (!title || !description || !price || !imageLink)
      return res.status(400).json({ msg: 'One or more parameters missing' });
    const published = true;
    const course = Course.create({
      title,
      description,
      price,
      imageLink,
      published,
    });
    res
      .status(201)
      .json({ message: 'Course created successfully', courseId: course._id });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/courses', adminMiddleware, async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ courses });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
