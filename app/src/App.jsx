import { useState } from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("all");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedStatus, setEditedStatus] = useState("");

  const addTodo = () => {
    if (taskName.trim() === "") return;

    const newTodo = {
      id: todos.length + 1,
      taskName,
      description,
      status: "not completed",
    };

    setTodos([...todos, newTodo]);
    setTaskName("");
    setDescription("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodoStatus = (id, status) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, status } : todo))
    );
  };

  const editTodo = (todo) => {
    setEditTodoId(todo.id);
    setEditedTaskName(todo.taskName);
    setEditedDescription(todo.description);
    setEditedStatus(todo.status);
  };

  const saveEditedTodo = () => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === editTodoId) {
          return {
            ...todo,
            taskName: editedTaskName,
            description: editedDescription,
            status: editedStatus,
          };
        }
        return todo;
      })
    );
    setEditTodoId(null);
  };

  const filterTodos = (todo) => {
    if (filter === "all") return true;
    return todo.status === filter;
  };

  return (
    <div className="app-container">
      <h1>Todo App</h1>
      <div className="container">
        <input
          type="text"
          placeholder="Todo Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Todo Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTodo} style={{ backgroundColor: "#139874" }}>
          Add Todo
        </button>
      </div>
      <div
        className="header-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="title-container">
          <h2>My Todo</h2>
        </div>
        <div
          className="filters-container"
          style={{ display: "flex", alignItems: "center" }}
        >
          <h3 style={{ marginRight: "10px" }}>Status Filter:</h3>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              backgroundColor: "#E5C2D4",
              height: "25px",
              width: "110px",
            }}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="not completed">Not Completed</option>
          </select>
        </div>
      </div>

      <div className="todo-list">
        {todos.filter(filterTodos).map((todo) => (
          <div
            className="todo-item"
            key={todo.id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "5px",
              width: "350px",
              backgroundColor: "#C2E5D3",
              display: "flex",
              flexDirection: "column",
              marginRight: "10px",
            }}
          >
            <div>
              <p style={{ wordWrap: "break-word" }}>Name: {todo.taskName}</p>
              {editTodoId === todo.id ? (
                <input
                  type="text"
                  value={editedTaskName}
                  onChange={(e) => setEditedTaskName(e.target.value)}
                />
              ) : null}
              <p style={{ wordWrap: "break-word" }}>
                Description: {todo.description}
              </p>
              {editTodoId === todo.id ? (
                <input
                  type="text"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
              ) : null}
              <div className="status-dropdown">
                <label htmlFor={`status-${todo.id}`}>Status: </label>
                <select
                  id={`status-${todo.id}`}
                  value={todo.status}
                  onChange={(e) => updateTodoStatus(todo.id, e.target.value)}
                  style={{
                    backgroundColor: "lightgreen",
                    height: "40px",
                    width: "130px",
                    padding: "5px 10px",
                    color: todo.status === "completed" ? "white" : "black",
                    background:
                      todo.status === "completed" ? "#139874" : "#E5C2D4",
                  }}
                >
                  <option
                    value="completed"
                    style={{ backgroundColor: "#139874", color: "white" }}
                  >
                    Completed
                  </option>
                  <option
                    value="not completed"
                    style={{ backgroundColor: "pink", color: "black" }}
                  >
                    Not Completed
                  </option>
                </select>
                <div style={{ marginTop: "50px" }}>
                  <div style={{ marginBottom: "20px" }}>
                    <div>
                      <div style={{ marginLeft: "80px" }}>
                        {editTodoId === todo.id ? (
                          <button
                            onClick={() => saveEditedTodo()}
                            style={{
                              marginRight: "5px",
                              backgroundColor: "darkgreen",
                            }}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => editTodo(todo)}
                            style={{
                              marginRight: "5px",
                              backgroundColor: "#139874",
                            }}
                          >
                            Edit
                          </button>
                        )}
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          style={{
                            marginRight: "5px",
                            borderColor: "#B42034",
                            backgroundColor: "#B42034",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
