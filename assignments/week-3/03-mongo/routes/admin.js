const { Router } = require('express');
const adminMiddleware = require('../middleware/admin');
const { User, Admin, Course } = require('../db');
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ msg: 'One or more required parameters are missing' });

  try {
    const existingUser = await Admin.findOne({ username });
    if (existingUser)
      return res.status(422).json({ msg: 'User already registered' });
    await Admin.create({ username, password });
    res.status(201).json({ msg: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Internal server error' });
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
