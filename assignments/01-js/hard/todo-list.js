/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor() {
    this.todos = [];
  }

  add(task) {
    this.todos.push(task);
  }

  getAll() {
    return this.todos;
  }

  remove(indexOfTodo) {
    this.todos = this.todos.filter((todo) => todo !== this.todos[indexOfTodo]);
  }

  update(index, task) {
    this.todos = this.todos.map((todo) => {
      if (todo === this.todos[index]) return task;
      else return todo;
    });
  }

  get(indexOfTodo) {
    const arr = this.todos.find((todo) => todo === this.todos[indexOfTodo]);
    if (indexOfTodo < this.todos.length) return arr;
    else return null;
  }

  clear() {
    this.todos = [];
  }
}

module.exports = Todo;
