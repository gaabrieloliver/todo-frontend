// src/TodoList.jsx
import React, { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedTodo, setEditedTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, newTodo]);
      setNewTodo("");
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditedTodo(todos[index]);
  };

  const saveTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = editedTodo;
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditedTodo("");
  };

  return (
    <div className="todo-container">
      <h1>Lista de Tarefas</h1>

      <div className="input-group">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Digite uma nova tarefa"
        />
        <button onClick={addTodo}>Adicionar</button>
      </div>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedTodo}
                  onChange={(e) => setEditedTodo(e.target.value)}
                />
                <button onClick={() => saveTodo(index)}>Salvar</button>
              </>
            ) : (
              <>
                <span>{todo}</span>
                <div>
                  <button onClick={() => startEditing(index)}>Editar</button>
                  <button onClick={() => deleteTodo(index)}>Excluir</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
