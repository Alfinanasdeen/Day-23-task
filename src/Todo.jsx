import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import "./Todo.css";

function Todo() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodo, setTodo] = useState([]);
  const [newTitle, setTitle] = useState("");
  const [newDescription, setDescription] = useState("");
  const [completedTodo, setCompletedTodo] = useState([]);
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodo];
    updatedTodoArr.push(newTodoItem);
    setTodo(updatedTodoArr);
    localStorage.setItem("todoItems", JSON.stringify(updatedTodoArr));

    setTitle("");
    setDescription("");
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodo];
    reducedTodo.splice(index, 1);

    localStorage.setItem("todoItems", JSON.stringify(reducedTodo));
    setTodo(reducedTodo);
  };

  const handleComplted = (index) => {
    let now = new Date();
    let dd = now.getDay();
    let mm = now.getMonth();
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + "-" + mm + "-" + yyyy + "-" + h + ":" + m + ":" + s;

    let filterCompltetedTodo = {
      ...allTodo[index],
      completedOn: completedOn,
    };

    const updatedCompletedTodo = [...completedTodo];
    updatedCompletedTodo.push(filterCompltetedTodo);
    setCompletedTodo(updatedCompletedTodo);
    handleDeleteTodo(index);
    localStorage.setItem("completedTodo", JSON.stringify(updatedCompletedTodo));
  };

  const handleDeleteCompletedTodo = (index) => {
    let reducedCompletedTodo = [...completedTodo];
    reducedCompletedTodo.splice(index, 1);

    localStorage.setItem("completedTodo", JSON.stringify(reducedCompletedTodo));
    setCompletedTodo(reducedCompletedTodo);
  };

  const handleEdit = (index, item) => {
    setCurrentEdit(index);
    setCurrentEditedItem(item);
  };

  const handleEditTitle = (value) => {
    setCurrentEditedItem((prev) => {
      return {
        ...prev,
        title: value,
      };
    });
  };

  const handleEditDescription = (value) => {
    setCurrentEditedItem((prev) => {
      return {
        ...prev,
        description: value,
      };
    });
  };

  const handleUpdateTodo = () => {
    let newTodo = [...allTodo];
    newTodo[currentEdit] = currentEditedItem;
    setTodo(newTodo);
    setCurrentEdit("");
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todoItems"));
    if (savedTodo) {
      setTodo(savedTodo);
    }

    let saveCompletedTodo = JSON.parse(localStorage.getItem("completedTodo"));
    if (saveCompletedTodo) {
      setCompletedTodo(saveCompletedTodo);
    }
  }, []);
  return (
    <div className="App">
      <h1>ToDo App</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="write your title"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="write your description"
            />
          </div>
          <div className="todo-input-item">
            <button className="addBtn" onClick={handleAddTodo}>
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {isCompleteScreen === false &&
            allTodo.map((item, index) => {
              if (currentEdit === index) {
                return (
                  <div className="edit-wrapper" key={index}>
                    <input
                      type="text"
                      onChange={(e) => handleEditTitle(e.target.value)}
                      value={currentEditedItem.title}
                    />
                    <textarea
                      rows={4}
                      onChange={(e) => handleEditDescription(e.target.value)}
                      value={currentEditedItem.description}
                    />
                    <button className="addBtn" onClick={handleUpdateTodo}>
                      Update
                    </button>
                  </div>
                );
              } else {
                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>

                    <div>
                      <MdDelete
                        className="icon"
                        onClick={() => handleDeleteTodo(index)}
                        title="Delete?"
                      />
                      <BsCheckLg
                        className="check-icon"
                        onClick={() => handleComplted(index)}
                        title="completed?"
                      />
                      <AiOutlineEdit
                        className="check-icon"
                        onClick={() => handleEdit(index, item)}
                        title="Edit?"
                      />
                    </div>
                  </div>
                );
              }
            })}
          {isCompleteScreen === true &&
            completedTodo.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>Completed On: {item.completedOn}</small>
                    </p>
                  </div>

                  <div>
                    <MdDelete
                      className="icon"
                      onClick={() => handleDeleteCompletedTodo(index)}
                      title="Delete?"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
export default Todo;
