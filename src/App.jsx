import { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('https://todo-backend-7rai.onrender.com/todos')
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  return (
    <div>
      <h1>Minhas Tarefas</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
