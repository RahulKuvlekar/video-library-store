import React from "react";
import "./PlaylistContainer.css";
import { FaTrashAlt } from "react-icons/fa";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useVideoFeaturesContext } from "../../Hooks/useVideoFeaturesContext";
import { deletePlaylist } from "../../Utils/playlist";
import { useNavigate } from "react-router-dom";

const PlaylistContainer = ({ playlist: { _id, title, videos } }) => {
  const DEFAULT_IMG = "/Images/bg-image.jpeg";
  const navigate = useNavigate();
  const {
    authState: { token },
  } = useAuthContext();

  const { dispatchVideoFeatures } = useVideoFeaturesContext();

  const deleteBtnHandler = (event) => {
    event.stopPropagation();
    deletePlaylist(dispatchVideoFeatures, token, _id);
  };

  const viewPlaylist = () => {
    navigate(`/playlist/${_id}`);
  };
  return (
    <article className="PlaylistContainer-card" onClick={viewPlaylist}>
      <div className="PlaylistContainer-overlay">
        <h1>
          {title} {videos?.length > 0 ? `( ${videos?.length} )` : null}
        </h1>
        <FaTrashAlt className="delete-icon" onClick={deleteBtnHandler} />
      </div>
      <img
        className="PlaylistContainer-thumbnail"
        src={videos?.length > 0 ? videos[0]?.thumbnail : DEFAULT_IMG}
        alt="playlist preview"
      />
    </article>
  );
};

export default PlaylistContainer;
