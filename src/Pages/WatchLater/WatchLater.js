import React from "react";
import VideoCard from "../../Components/VideoCard/VideoCard";
import { useVideoFeaturesContext } from "../../Hooks/useVideoFeaturesContext";
import { Link } from "react-router-dom";

const WatchLater = () => {
  const {
    videoFeaturesState: { watchLaterList },
  } = useVideoFeaturesContext();
  return (
    <div className="mainpage-section">
      {watchLaterList.length === 0 && (
        <div className="not-available">
          <h1>There Is No Watch Later Video. Please Add 👻</h1>
          <Link to="/explore" className="btn btn-outline-primary">
            Let's Explore
          </Link>
        </div>
      )}
      {watchLaterList.length > 0 && (
        <div className="page-title page-title-space-btw">
          <h2>Watch Later ({watchLaterList.length})</h2>
        </div>
      )}
      <div className="videoListing-section">
        {watchLaterList &&
          watchLaterList.map((video) => (
            <VideoCard
              key={`watchlater-card-${video.title}`}
              videoInfo={video}
            />
          ))}
      </div>
    </div>
  );
};

export default WatchLater;
