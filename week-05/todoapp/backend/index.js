const express = require('express');
const { createTodo, updateTodo } = require('./types');
const { Todo } = require('./db');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/todo', async (req, res) => {
  const createPayload = req.body;
  const parsePayload = createTodo.safeParse(createPayload);

  if (!parsePayload.success)
    return res.status(411).json({
      msg: 'You sent wrong inputs',
    });

  await Todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });

  res.status(201).json({
    msg: 'Todo created',
  });
});

// get todos

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({
      todos,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Unable to fetch todos from mongo',
    });
  }
});

// update todo

app.put('/todo', async (req, res) => {
  const updatePayload = req.body;
  const parsePayload = updateTodo.safeParse(updatePayload);
  if (!parsePayload.success)
    return res.status(411).json({
      msg: 'You sent wrong inputs',
    });

  await Todo.findOneAndUpdate(
    { _id: updatePayload.id },
    {
      $set: { completed: true },
    }
  );
  res.status(200).json({
    msg: 'Todo marked as completed',
  });
});

app.listen(3000, () => console.log('server started at port 3000'));
