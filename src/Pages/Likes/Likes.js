import React from "react";
import VideoCard from "../../Components/VideoCard/VideoCard";
import { useVideoFeaturesContext } from "../../Hooks/useVideoFeaturesContext";

const Likes = () => {
  const {
    videoFeaturesState: { likedVideosList },
  } = useVideoFeaturesContext();
  return (
    <div className="mainpage-section">
      <div className="page-title page-title-space-btw">
        <h2>Liked Videos ({likedVideosList.length})</h2>
      </div>
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
