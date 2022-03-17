import React, { useState, useEffect } from "react";
import "./Styles/TodoInput.css";

let TodoInput = (props) => {
  // localStorage
  let savedValue =
    localStorage.getItem("taskInputValue") != null
      ? localStorage.getItem("taskInputValue")
      : "";

  // useState
  let [task, setTask] = useState(savedValue);

  useEffect(() => {
    localStorage.setItem("taskInputValue", task);
  }, [task]);

  // changing the value of TaskInput
  let changeHandler = (e) => {
    setTask(e.target.value);
  };

  // add todo
  let addTodo = () => {
    if (task === "") return;
    let taskData = {
      id: Math.floor(Math.random() * 1000) + 1,
      task: task,
      taskCompleted: false,
    };

    props.addTask(taskData);
    setTask("");
  };

  // on clicking enter key
  let keyDownHandler = (e) => {
    if (e.keyCode === 13) addTodo();
  };

  // add btn
  let clickHandler = () => addTodo();

  return (
    <div className="todo-input">
      <button className="add-btn" onClick={clickHandler}>
        Add
      </button>
      <input
        type="text"
        placeholder="Create a new todo"
        value={task}
        onChange={changeHandler}
        onKeyDown={keyDownHandler}
      />
    </div>
  );
};

export default TodoInput;
