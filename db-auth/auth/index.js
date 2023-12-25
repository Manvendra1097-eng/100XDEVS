const express = require('express');
const jwt = require('jsonwebtoken');
const jwtPassword = '123456';

const app = express();

app.use(express.json());

const ALL_USERS = [
  {
    username: 'harkirat@gmail.com',
    password: '123',
    name: 'harkirat singh',
  },
  {
    username: 'raman@gmail.com',
    password: '123321',
    name: 'Raman singh',
  },
  {
    username: 'priya@gmail.com',
    password: '123321',
    name: 'Priya kumari',
  },
];

app.post('/signin', function (req, res) {
  const { username, password } = req.body;
  if (!(username && password))
    return res.status(400).json({ msg: 'unauthorized' });

  const user = ALL_USERS.find((user) => user.username === username);

  if (!user) return res.status(400).json({ msg: 'user is not registered' });

  if (!(user.password === password)) {
    return res.status(400).json({ msg: 'username or password is not correct' });
  }

  const token = jwt.sign({ username }, jwtPassword);

  return res.status(200).json({ token });
});

app.get('/users', function (req, res) {
  const authorization = req.headers.authorization;
  if (!authorization)
    return res.status(403).json({ msg: 'login to access users' });
  try {
    const verify = jwt.verify(authorization, jwtPassword);
    if (!verify) return res.status(403).json({ msg: 'invalid token' });

    const users = ALL_USERS.filter((user) => user.username !== verify.username);
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`auth application started at port ${port}`));
