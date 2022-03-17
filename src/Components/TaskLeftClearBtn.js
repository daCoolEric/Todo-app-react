import React from "react";
import "./Styles/TaskLeftClearBtn.css";

export let TaskLeft = (props) => {
  // no. of items left
  let itemsLeft = () => {
    let completedItems = [];
    let totalItems = props.items.length;
    completedItems = props.items.filter((item) => item.taskCompleted === true);
    return totalItems - completedItems.length;
  };

  return (
    <div className="items-left">
      <span> {itemsLeft()} items Left</span>
    </div>
  );
};

export let ClearCompleted = (props) => {
  return (
    <button className="clear-completed-btn" onClick={props.clearCompletedTasks}>
      Clear Completed
    </button>
  );
};
