import React from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";

const NavigationBar = () => {
  return (
    <header className="navigation-bar">
      <div className="nav-logo-title">
        <Link className="link-no-style" to="/">
          V-Store
        </Link>
      </div>
    </header>
  );
};

export default NavigationBar;
