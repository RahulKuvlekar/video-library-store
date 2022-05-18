import React from "react";
import VideoCard from "../../Components/VideoCard/VideoCard";
import { useVideoFeaturesContext } from "../../Hooks/useVideoFeaturesContext";
import { Link } from "react-router-dom";

const Likes = () => {
  const {
    videoFeaturesState: { likedVideosList },
  } = useVideoFeaturesContext();
  return (
    <div className="mainpage-section">
      {likedVideosList.length === 0 && (
        <div className="not-available">
          <h1>There Is No Liked Video. Please Add 👻</h1>
          <Link to="/explore" className="btn btn-outline-primary">
            Let's Explore
          </Link>
        </div>
      )}
      {likedVideosList.length > 0 && (
        <div className="page-title page-title-space-btw">
          <h2>Liked Videos ({likedVideosList.length})</h2>
        </div>
      )}
      <div className="videoListing-section">
        {likedVideosList &&
          likedVideosList.map((video) => (
            <VideoCard
              key={`likedVideo-card-${video.title}`}
              videoInfo={video}
            />
          ))}
      </div>
    </div>
  );
};

export default Likes;
