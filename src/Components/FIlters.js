import React, { useState } from "react";
import "./Styles/Filters.css";

let Filters = (props) => {
  let [filter, setFilter] = useState("all");

  let clickHandler = (e) => {
    setFilter(e.target.value);
    props.filterTasks(e.target.value);
  };

  return (
    <div className="filters">
      <button
        value="all"
        className={`filter-btn--all ${filter === "all" ? "active-filter" : ""}`}
        onClick={clickHandler}
      >
        All
      </button>
      <button
        value="active"
        className={`filter-btn--active ${
          filter === "active" ? "active-filter" : ""
        }`}
        onClick={clickHandler}
      >
        Active
      </button>
      <button
        value="completed"
        className={`filter-btn--completed ${
          filter === "completed" ? "active-filter" : ""
        }`}
        onClick={clickHandler}
      >
        Completed
      </button>
    </div>
  );
};

export default Filters;
