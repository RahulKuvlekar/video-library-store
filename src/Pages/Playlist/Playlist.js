import React from "react";
import PlaylistContainer from "../../Components/PlaylistContainer/PlaylistContainer";
import { useVideoFeaturesContext } from "../../Hooks/useVideoFeaturesContext";
import { Link } from "react-router-dom";

const Playlist = () => {
  const {
    videoFeaturesState: { playlist },
  } = useVideoFeaturesContext();

  return (
    <div className="mainpage-section">
      {playlist.length === 0 && (
        <div className="not-available">
          <h1>There Is No Playlist. Please Add 👻 </h1>
          <Link to="/explore" className="btn btn-outline-primary">
            Let's Explore
          </Link>
        </div>
      )}
      {playlist.length > 0 && (
        <div className="page-title page-title-space-btw">
          <h2>Playlist ({playlist.length})</h2>
        </div>
      )}
      <div className="videoListing-section">
        {playlist &&
          playlist.map((playlist) => (
            <PlaylistContainer
              key={`playlist-card-${playlist._id}`}
              playlist={playlist}
            />
          ))}
      </div>
    </div>
  );
};

export default Playlist;
