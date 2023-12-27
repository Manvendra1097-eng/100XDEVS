const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = Router();
const userMiddleware = require('../middleware/user');
const { User, Course } = require('../db');

// User Routes
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: 'One or more parameter missing' });
    // checking for existing user
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(422).json({ message: 'User already exists' });
    // if all checks passed
    await User.create({ username, password });
    res.status(201).json({ message: 'User created successfully' });
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
    const existingUser = await User.findOne({ username });
    if (!existingUser)
      return res.status(404).json({ message: 'User not registered' });
    const isValid = await bcrypt.compare(password, existingUser.password);
    if (!isValid)
      return res
        .status(403)
        .json({ message: 'Username or password is incorrect' });

    const SECRET = process.env.SECRET;
    const payload = {
      data: username,
      exp: Math.floor(new Date() / 1000) + 60 * 60,
    };
    const token = jwt.sign(payload, SECRET);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/courses', (req, res) => {
  // Implement listing all courses logic
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
  try {
    const courseId = req.params['courseId'];
    const username = req.username;
    const course = await Course.findById(courseId);
    // Find the user
    const user = await User.findOne({ username });

    if (user.enrolledCourseId.includes(course._id)) {
      return res
        .status(400)
        .json({ message: 'User is already enrolled for this course' });
    }

    await User.findOneAndUpdate(
      { username },
      { $addToSet: { enrolledCourseId: course._id } }
    );
    res.status(200).json({ message: 'Course purchased successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
  try {
    const username = req.username;
    const user = await User.findOne({ username }).populate('enrolledCourseId');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ purchasedCourses: user.enrolledCourseId });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
