import React from "react";
import { useVideoFeaturesContext } from "../../Hooks/useVideoFeaturesContext";
import AddPlaylist from "./AddPlaylist";
import PlaylistCheckbox from "./PlaylistCheckbox";

const AddPlaylistModal = ({ currentVideo }) => {
  const {
    videoFeaturesState: { playlist },
  } = useVideoFeaturesContext();
  return (
    <>
      <h1 className="modal-header">Add To Playlist</h1>
      <ul className="modal-body AddPlaylistModal">
        {playlist &&
          playlist.map((currentPlaylist) => (
            <PlaylistCheckbox
              key={`Add-To-Playlist-checkbox-${currentPlaylist._id}`}
              currentVideo={currentVideo}
              currentPlaylist={currentPlaylist}
            />
          ))}
      </ul>
      <AddPlaylist />
    </>
  );
};

export default AddPlaylistModal;
