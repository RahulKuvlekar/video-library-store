import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { menus } from "./menus";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul className="nav-pill nav-menu">
        {menus &&
          menus.map(({ name, pathname, icons }) => (
            <li className="list-block-item" key={`sidebar-menu-${name}`}>
              <NavLink
                to={pathname}
                className={({ isActive }) =>
                  isActive ? "nav-active link-no-style" : "link-no-style"
                }
              >
                <span className="sidemenu-title">{name}</span>
                {icons}
              </NavLink>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
