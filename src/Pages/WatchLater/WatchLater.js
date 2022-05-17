import React from "react";
import VideoCard from "../../Components/VideoCard/VideoCard";
import { useVideoFeaturesContext } from "../../Hooks/useVideoFeaturesContext";

const WatchLater = () => {
  const {
    videoFeaturesState: { watchLaterList },
  } = useVideoFeaturesContext();
  return (
    <div className="mainpage-section">
      <div className="page-title page-title-space-btw">
        <h2>Watch Later ({watchLaterList.length})</h2>
      </div>
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
