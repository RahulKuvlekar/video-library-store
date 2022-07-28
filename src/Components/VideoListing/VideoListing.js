import React from "react";
import "./VideoListing.css";
import VideoCard from "../VideoCard/VideoCard";
import { useVideoContext } from "../../Hooks/useVideoContext";

const VideoListing = () => {
  const {
    videoState: { videoList, category, search },
  } = useVideoContext();

  const sortBySearchVideos =
    search.trim() === ""
      ? videoList
      : videoList.filter((video) =>
          video.title.toLowerCase().includes(search.toLowerCase())
        );

  const sortByCategoryVideos =
    category?.toLowerCase() === "all"
      ? sortBySearchVideos
      : sortBySearchVideos.filter(
          (video) =>
            video?.categoryName?.toLowerCase() === category?.toLowerCase()
        );

  return (
    <div className="videoListing-section">
      {sortByCategoryVideos?.length > 0 &&
        sortByCategoryVideos.map((videoInfo) => (
          <VideoCard videoInfo={videoInfo} key={`VideoCard-${videoInfo._id}`} />
        ))}
    </div>
  );
};

export default VideoListing;
