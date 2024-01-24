const express = require('express');
const jwt = require('jsonwebtoken');
const zod = require('zod');
const bcrypt = require('bcrypt');
const { User, Account } = require('../db');
const { authMiddleware } = require('../middleware');
require('dotenv').config();

const signupBody = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  username: zod.string().email(),
  password: zod.string().min(6),
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
});

const updateBody = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().optional(),
});

const SECRET = process.env.SECRET;

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
  try {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: 'Email already taken / Incorrect inputs',
      });
    }
    const { firstName, lastName, username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(411).json({
        message: 'Email already taken / Incorrect inputs',
      });
    }

    const user = await User.create({ firstName, lastName, username, password });
    const userId = user._id;

    await Account.create({
      userId,
      balance: 1 + Math.random() * 10000,
    });

    const token = jwt.sign({ userId }, SECRET);
    res.json({
      message: 'User created successfully',
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

userRouter.post('/signin', async (req, res) => {
  try {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: 'Error while logging in',
      });
    }
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(404).json({
        message: 'Invalid Username/ Password',
      });
    }

    const isValid = await bcrypt.compare(password, existingUser.password);
    if (!isValid) {
      return res.status(404).json({
        message: 'Invalid Username/ Password',
      });
    }

    const userId = existingUser._id;

    const token = jwt.sign({ userId }, SECRET);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

userRouter.put('/', authMiddleware, async (req, res) => {
  try {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
      return res
        .status(411)
        .json({ message: 'Error while updating information' });
    }
    await User.updateOne(req.body, {
      _id: req.userId,
    });

    res.json({
      message: 'Updated successfully',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error while updating information',
    });
  }
});

userRouter.get('/bulk', authMiddleware, async (req, res) => {
  try {
    const filter = req.query.filter || '';
    console.log(filter);
    const users = await User.find({
      $or: [
        {
          firstName: {
            $regex: filter,
          },
        },
        {
          lastName: {
            $regex: filter,
          },
        },
      ],
    });

    return res.status(200).json({
      user: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (error) {
    return res.status(500).json({});
  }
});

userRouter.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    if (!user) return res.status(404).json({});

    const account = await Account.findOne({ userId: req.userId });

    return res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      balance: account.balance,
    });
  } catch (error) {
    return res.status(500).json({});
  }
});

module.exports = userRouter;
