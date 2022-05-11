import React from "react";
import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { menus } from "./menus";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { authFeatures } from "../../Constant/constant";

const Sidebar = () => {
  const {
    authState: { isAuthenticated },
    dispatchAuth,
  } = useAuthContext();
  const navigate = useNavigate();
  const { CLEAR_AUTH } = authFeatures;

  const LogoutService = () => {
    dispatchAuth({
      type: CLEAR_AUTH,
    });

    localStorage.removeItem("isAuth");
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");

    navigate("/", { replace: true });
  };

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
        {isAuthenticated && (
          <li className="list-block-item">
            <button className="btn-logout" onClick={LogoutService}>
              <span className="sidemenu-title">Logout</span>
              <FaSignOutAlt />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;
