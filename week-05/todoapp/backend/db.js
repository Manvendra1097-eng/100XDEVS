const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://manvendra1097:s5.a7TVqxmczN8S@cluster0.rywutvl.mongodb.net/todoapp'
);

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = {
  Todo,
};
