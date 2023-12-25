const { User } = require('../db');

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const { username, password } = req.headers;
  if (!username || !password)
    return res
      .status(400)
      .json({ msg: 'One or more required parameters are missing' });

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(403).json({ msg: 'Invalid username' });

    if (user.password !== password)
      return res.status(403).json({ msg: 'Username or password is incorrect' });

    next();
  } catch (error) {
    return res.status(500).json({ msg: 'Internal server error' });
  }
}

module.exports = userMiddleware;
