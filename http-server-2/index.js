const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const body = req.body.msg;
  res.json({
    name: 'Manvendra Singh',
    message: 'I am responding from application having get route',
    requestMessage: body,
  });
});

app.listen(port, () => console.log(`Listening to port ${port}`));
