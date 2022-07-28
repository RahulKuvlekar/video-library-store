import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./NavigationBar.css";
import { menus } from "./menus";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useVideoContext } from "../../Hooks/useVideoContext";
import { videoFeatures } from "../../Constant/constant";

const NavigationBar = () => {
  const {
    authState: { isAuthenticated },
  } = useAuthContext();

  const {
    videoState: { search },
    dispatchVideo,
  } = useVideoContext();
  const { SORT_BY_SEARCH } = videoFeatures;

  const { pathname } = useLocation();

  const isVisible = pathname === "/" ? false : true;

  const navigate = useNavigate();
  const searchHandler = (event) => {
    navigate("/explore");
    dispatchVideo({
      type: SORT_BY_SEARCH,
      payload: event.target.value,
    });
  };
  return (
    <header className="navigation-bar">
      <div className="nav-logo-title">
        <Link className="link-no-style" to="/explore">
          V-Store
        </Link>
      </div>
      {isVisible && (
        <div className="search-section">
          <label className="search-bar">
            <span className="search-bar-btn" type="submit">
              <i className="fa fa-search"> </i>
            </span>
            <input
              className="search-bar-input"
              type="text"
              placeholder="Type to search"
              name="search"
              value={search}
              onChange={searchHandler}
            />
          </label>
        </div>
      )}
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
