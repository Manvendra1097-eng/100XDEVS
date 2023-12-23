// 1. aquire express
const express = require('express');
const bodyParser = require('body-parser');

// 2. create app
const app = express();

// middlewares
app.use(bodyParser.json());

// 3. assign port - use export PORT=3005 - unset PORT
const port = process.env.PORT || 3000;

// 4. define route
app.get('/', (req, res) => {
  res.send('Hello World! With Nodemon');
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.send(req.headers);
});

// 5. listen to port defined
app.listen(port, () => {
  console.log(`Application listening on port ${port}`);
});
