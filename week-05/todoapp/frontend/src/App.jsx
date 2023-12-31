import { useEffect, useState } from 'react';
import './App.css';
import CreateTodo from './components/CreateTodo';
import Todos from './components/Todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [isNewTodo, setIsNewTodo] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/todos').then(async function (res) {
      const data = await res.json();
      setTodos(data.todos);
    });
  }, [isNewTodo]);

  return (
    <>
      <div>
        <CreateTodo setIsNewTodo={setIsNewTodo} isNewTodo={isNewTodo} />
      </div>

      <hr />
      <div>
        <Todos todos={todos} />
      </div>
    </>
  );
}

export default App;
