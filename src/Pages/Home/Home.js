import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="main-section home-section">
      <div className="home-overlay-container">
        <h1>Lets explore the beautiful SPORTS through videos</h1>
        <div className="text-align-center">
          <Link to="/explore" className="btn btn-primary">
            Explore
          </Link>
        </div>
      </div>
      <img
        className="home-bg-image"
        src="/Images/bg-image.jpeg"
        alt="home-background"
      />
    </div>
  );
};

export default Home;
