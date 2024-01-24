const express = require('express');
const apiRouter = require('./routes');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', apiRouter);

const PORT = process.env.PORT;
app.listen(PORT, function () {
  console.log('application started at port ' + PORT);
});
