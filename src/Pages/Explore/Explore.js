import React from "react";
import VideoFilters from "../../Components/VideoFilters/VideoFilters";
import VideoListing from "../../Components/VideoListing/VideoListing";
import "./Explore.css";

const Explore = () => {
  return (
    <div className="explore-section">
      <VideoFilters />
      <VideoListing />
    </div>
  );
};

export default Explore;
