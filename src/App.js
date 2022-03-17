import React, { useState, useEffect } from "react";
import "./Components/Styles/App.css";

import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, GlobalStyles } from "./theme";

import Header from "./Components/Header";
import TodoInput from "./Components/TodoInput";
import TodoContainer from "./Components/TodoContainer";
import { TaskLeft, ClearCompleted } from "./Components/TaskLeftClearBtn";
import Filters from "./Components/FIlters";

function App() {
  // get todo and theme from local storage
  let savedTheme =
    localStorage.getItem("theme") != null
      ? localStorage.getItem("theme")
      : "dark";
  let savedTasks =
    localStorage.getItem("tasks") != null
      ? JSON.parse(localStorage.getItem("tasks"))
      : [];

  // use state
  const [theme, setTheme] = useState(savedTheme);
  const [tasks, setTasks] = useState(savedTasks);
  const [filter, setFilter] = useState("all");

  // use effect
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [theme, tasks]);

  // toggle theme
  const themeToggler = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  // add todo
  const addTask = (taskData) => {
    let data = [taskData, ...tasks];
    setTasks(data);
  };

  // mark task completed
  const checkItem = (id) => {
    const updatedTasks = [...tasks];
    const task = updatedTasks.find((data) => data.id === id);
    task.taskCompleted = task ? !task.taskCompleted : task.taskCompleted;
    setTasks(updatedTasks);
  };

  // delete todo
  const deleteTodo = (taskId) => {
    setTasks([...tasks].filter((todo) => todo.id !== taskId));
  };

  // delete completed todo
  const clearCompletedTasks = () => {
    let completedTasks = tasks.filter((item) => item.taskCompleted === true);
    let unCompletedTasks = tasks.filter((item) => item.taskCompleted === false);

    if (completedTasks.length === 0) return;
    if (
      window.confirm(
        `Are you sure you want to delete ${completedTasks.length} ${
          completedTasks.length === 1 ? "task" : "tasks"
        }? `
      )
    ) {
      setTasks(unCompletedTasks);
    }
  };

  // filter tasks
  let filterTasks = (filter) => {
    setFilter(filter);
  };

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyles />
      <main className="App">
        <Header themeToggler={themeToggler} theme={theme} />
        <TodoInput addTask={addTask} />
        <div className="container">
          <TodoContainer
            todoData={tasks}
            deleteTodo={deleteTodo}
            updateItem={checkItem}
            filter={filter}
          />
          <div className="items-filters-clear-container">
            <TaskLeft items={tasks} />
            <div className="for-desktop">
              <Filters filterTasks={filterTasks} />
            </div>
            <ClearCompleted clearCompletedTasks={clearCompletedTasks} />
          </div>
        </div>
        <div className="for-mobile">
          <Filters filterTasks={filterTasks} />
        </div>
        <p className="drag-drop-line">Drag and drop to reorder list</p>
      </main>
    </ThemeProvider>
  );
}

export default App;
