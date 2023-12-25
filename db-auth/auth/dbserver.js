const express = require('express');
const jwt = require('jsonwebtoken');
const jwtPassword = '123456';

const mongoose = require('mongoose');

mongoose.connect(
  'url/userdb'
);

const User = mongoose.model('User', {
  username: String,
  password: { type: String, select: false },
});

const app = express();

app.use(express.json());

app.post('/user', async function (req, res) {
  const { username, password } = req.body;

  if (!(username && password)) {
    return res.status(422).json({ msg: 'ivalid data' });
  }

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser)
      return res.status(200).json({ msg: 'user already registered' });

    const user = new User({ username, password });

    const dbres = await user.save();

    res.status(201).json({ msg: 'user created', user: dbres });
  } catch (error) {
    res.status(500).json({ msg: 'internal server error' });
  }
});

app.post('/signin', async function (req, res) {
  const { username, password } = req.body;
  if (!(username && password))
    return res.status(400).json({ msg: 'unauthorized' });

  // expilicitly calling for password
  const user = await User.findOne({ username }).select('+password');

  if (!user) return res.status(400).json({ msg: 'user is not registered' });
  console.log(user);
  if (!(user.password === password)) {
    return res.status(400).json({ msg: 'username or password is not correct' });
  }

  const token = jwt.sign({ username }, jwtPassword);

  return res.status(200).json({ token });
});

app.get('/users', async function (req, res) {
  const authorization = req.headers.authorization;
  console.log(authorization);
  if (!authorization)
    return res.status(403).json({ msg: 'login to access users' });
  try {
    const verify = jwt.verify(authorization, jwtPassword);
    if (!verify) return res.status(403).json({ msg: 'invalid token' });

    const users = await User.find();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

app.listen(3000);
