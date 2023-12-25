const { Router } = require('express');
const router = Router();
const userMiddleware = require('../middleware/user');
const { User, Course } = require('../db');

// User Routes
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ msg: 'One or more required parameters are missing' });

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(422).json({ msg: 'User already registered' });
    await User.create({ username, password });
    res.status(201).json({ msg: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Internal server error' });
  }
});

router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ courses });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
  try {
    const courseId = req.params['courseId'];
    const username = req.headers['username'];
    const course = await Course.findById(courseId);

    // Find the user
    const user = await User.findOne({ username });

    // Check if the user is already enrolled in the course
    if (user.enrolledCourseId.includes(course._id)) {
      return res
        .status(400)
        .json({ message: 'User is already enrolled for this course' });
    }

    const updatedUser = await User.findOneAndUpdate(
      { username },
      { $push: { enrolledCourseId: course._id } },
      { new: true }
    );
    console.log(updatedUser);
    res.status(200).json({ message: 'Course purchased successfully' });
    /*
        // Enroll the user in the course if not already enrolled
        const updatedUser = await User.findOneAndUpdate(
        { username },
        { $addToSet: { enrolledCourseId: course._id } },
        { new: true }
        );

        // Check if the course was added to the user's enrolled courses
        if (updatedUser.enrolledCourseId.includes(course._id)) {
        console.log(updatedUser);
        res.status(200).json({ message: 'Course purchased successfully' });
        } else {
        res.status(400).json({ message: 'User is already enrolled for this course' });
        }

    */
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
  try {
    const username = req.headers['username'];
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
