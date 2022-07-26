import React from "react";
import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { menus } from "./menus";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { ADD_TOAST, authFeatures, SUCCESS } from "../../Constant/constant";
import { useToastContext } from "../../Hooks/useToastContext";
import { createToast } from "../../Utils/toast";

const Sidebar = () => {
  const {
    authState: { isAuthenticated, userInfo },
    dispatchAuth,
  } = useAuthContext();
  const { dispatchToast } = useToastContext();
  const navigate = useNavigate();
  const { CLEAR_AUTH } = authFeatures;

  const LogoutService = () => {
    const username = userInfo.firstName + " " + userInfo.lastName;
    dispatchAuth({
      type: CLEAR_AUTH,
    });

    dispatchToast({
      type: ADD_TOAST,
      payload: createToast(SUCCESS, `${username} Logout Successfully 🎉`),
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
                {icons}
                <span className="sidemenu-title">{name}</span>
              </NavLink>
            </li>
          ))}
        {isAuthenticated && (
          <li className="list-block-item">
            <button className="btn-logout" onClick={LogoutService}>
              <FaSignOutAlt />
              <span className="sidemenu-title">Logout</span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;
