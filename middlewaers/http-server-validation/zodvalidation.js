const express = require('express');
const z = require('zod');

const app = express();

app.use(express.json());

// define schema for zod validation
const arraySchema = z.array(z.number());

app.use((req, res, next) => {
  console.log(req.body);
  if (!req.body) {
    return res.status(411).json({ msg: "Kidenys value can't be empty" });
  }
  next();
});

app.get('/', (req, res) => {
  const kidneys = req.body.kidenys;
  const response = arraySchema.safeParse(kidneys);
  console.log(response);
  if (!response.success) {
    return res.status(411).json({ msg: 'Invalid input value' });
  }
  const length = kidneys.length;
  res
    .status(200)
    .json({ msg: 'you have provide ' + length + ' number of kidney' });
});

// global catch

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: 'internal server error' });
  next();
});

app.listen(3000, () => console.log('started at port 3000'));
