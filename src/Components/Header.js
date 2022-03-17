import React, { useState } from "react";
import "./Styles/Header.css";

import { ReactComponent as SunIcon } from "../assets/images/icon-sun.svg";
import { ReactComponent as MoonIcon } from "../assets/images/icon-moon.svg";

let Header = (props) => {
  
  const [rotate, setRotate] = useState(false);
  
  // theme toggle
  let clickHandler = () => {
    props.themeToggler();
    setRotate(true);
    setTimeout(() => {
      setRotate(false);
    }, 1000)
  };

  return (
    <header className="header">
      <h1 className="title">Todo</h1>
      <button
        aria-label="theme-btn"
        className={`theme-btn ${rotate ? 'rotate' : ''}`}
        onClick={ clickHandler }
      >
        { props.theme === "dark" ? <SunIcon /> : <MoonIcon /> }
      </button>
    </header>
  );
};

export default Header;
