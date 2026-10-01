import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

function App() {
  const [text, setText] = useState("");

  const todos = useQuery(api.todos.getTodos);

  const addTodo = useMutation(api.todos.addTodo);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    await addTodo({
      text: text,
    });

    setText("");
  };

  return (
    <div className="container">
      <h1>Belajar Convex</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Masukkan tugas..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button type="submit">
          Tambah
        </button>
      </form>

      <div className="todo-list">
        {todos?.map((todo) => (
          <div className="todo" key={todo._id}>
            <span
              className={todo.completed ? "completed" : ""}
              onClick={() => toggleTodo({ id: todo._id })}
            >
              {todo.text}
            </span>

            <button
              onClick={() => deleteTodo({ id: todo._id })}
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;