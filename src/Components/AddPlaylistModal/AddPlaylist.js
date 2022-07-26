import { useState } from "react";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useToastContext } from "../../Hooks/useToastContext";
import { useVideoFeaturesContext } from "../../Hooks/useVideoFeaturesContext";
import { createPlaylist } from "../../Utils/playlist";
import "./AddPlaylist.css";

const AddPlaylist = () => {
  const [playlistInput, setPlaylistInput] = useState("");

  const {
    authState: { token },
  } = useAuthContext();

  const { dispatchVideoFeatures } = useVideoFeaturesContext();

  const { dispatchToast } = useToastContext();

  const AddToPlaylist = (event) => {
    event.preventDefault();
    if (playlistInput === "") return;
    createPlaylist(dispatchVideoFeatures, token, playlistInput, dispatchToast);
    setPlaylistInput("");
  };
  return (
    <form onSubmit={AddToPlaylist} className="addPlaylist">
      <input
        type="text"
        className="playlist-input"
        value={playlistInput}
        onChange={(e) => setPlaylistInput(e.target.value)}
        placeholder="Create Playlist"
      />
      <button className="btn btn-primary" type="submit">
        Add
      </button>
    </form>
  );
};

export default AddPlaylist;
