import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavigationBar.css";
import { menus } from "./menus";
import { useAuthContext } from "../../Hooks/useAuthContext";

const NavigationBar = () => {
  const {
    authState: { isAuthenticated },
  } = useAuthContext();
  return (
    <header className="navigation-bar">
      <div className="nav-logo-title">
        <Link className="link-no-style" to="/">
          V-Store
        </Link>
      </div>
      <ul className="nav-pill nav-menu">
        {menus &&
          !isAuthenticated &&
          menus.map(({ name, pathname }) => (
            <li className="list-inline-item" key={`navigationbar-menu-${name}`}>
              <NavLink
                to={pathname}
                className={({ isActive }) => (isActive ? "nav-active" : "")}
              >
                {name}
              </NavLink>
            </li>
          ))}
        {isAuthenticated && (
          <li>
            <img
              src="/Images/avatar.png"
              className="avatar avatar-md"
              alt="loginAvatar"
            />
          </li>
        )}
      </ul>
    </header>
  );
};

export default NavigationBar;
