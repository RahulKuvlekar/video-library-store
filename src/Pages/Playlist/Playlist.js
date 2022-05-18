import React from "react";
import PlaylistContainer from "../../Components/PlaylistContainer/PlaylistContainer";
import { useVideoFeaturesContext } from "../../Hooks/useVideoFeaturesContext";

const Playlist = () => {
  const {
    videoFeaturesState: { playlist },
  } = useVideoFeaturesContext();

  return (
    <div className="mainpage-section">
      <div className="page-title page-title-space-btw">
        <h2>Playlist ({playlist.length})</h2>
      </div>
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
