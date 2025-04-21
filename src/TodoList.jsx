import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);

  // Função para carregar as tarefas do localStorage
  const loadTodosFromLocalStorage = () => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  };

  // Função para salvar as tarefas no localStorage
  const saveTodosToLocalStorage = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  useEffect(() => {
    loadTodosFromLocalStorage(); // Carrega as tarefas ao iniciar
  }, []);

  // Função para adicionar uma tarefa
  const addTodo = () => {
    if (!newTodo) return;
    const newTask = {
      id: Date.now(),
      task: newTodo,
    };
    const updatedTodos = [...todos, newTask];
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
    setNewTodo(""); // Limpar campo de input
  };

  // Função para editar uma tarefa
  const editTodo = (id, novaTarefa) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task: novaTarefa } : todo
    );
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
    setEditingTodo(null); // Limpa o campo de edição
  };

  // Função para excluir uma tarefa
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  return (
    <div>
      <h1>Todo For You<span>.</span></h1>

      {/* Formulário para adicionar tarefa */}
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Adicione uma nova tarefa"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingTodo === todo.id ? (
              <>
                <input
                  type="text"
                  defaultValue={todo.task}
                  onChange={(e) =>
                    setEditingTodo({ ...editingTodo, task: e.target.value })
                  }
                />
                <button onClick={() => editTodo(todo.id, editingTodo.task)}>
                  Salvar
                </button>
              </>
            ) : (
              <>
                <span>{todo.task}</span>
                <button onClick={() => setEditingTodo(todo.id)}>Editar</button>
                <button onClick={() => deleteTodo(todo.id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
