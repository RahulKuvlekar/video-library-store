import { useMemo } from "react";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useVideoFeaturesContext } from "../../Hooks/useVideoFeaturesContext";
import { addtoPlaylist, deletefromPlaylist } from "../../Utils/playlist";
import { useToastContext } from "../../Hooks/useToastContext";

const PlaylistCheckbox = ({ currentPlaylist, currentVideo }) => {
  const { _id, title } = currentPlaylist;
  const {
    authState: { token },
  } = useAuthContext();
  const {
    videoFeaturesState: { playlist },
    dispatchVideoFeatures,
  } = useVideoFeaturesContext();

  const { dispatchToast } = useToastContext();

  const isAlreadyPresent = useMemo(
    () =>
      currentPlaylist?.videos.find((video) => video?._id === currentVideo?._id),
    // eslint-disable-next-line
    [playlist]
  );

  const AddToPlaylistHandler = (event) => {
    const isChecked = event.target.checked;
    if (isChecked === true) {
      addtoPlaylist(
        dispatchVideoFeatures,
        token,
        currentPlaylist,
        currentVideo,
        dispatchToast
      );
    } else if (isChecked === false) {
      deletefromPlaylist(
        dispatchVideoFeatures,
        token,
        currentPlaylist._id,
        currentVideo._id,
        dispatchToast
      );
    }
  };

  return (
    <li className="playlist-checkbox">
      <input
        type="checkbox"
        name=""
        id={_id}
        checked={isAlreadyPresent ? true : false}
        onChange={AddToPlaylistHandler}
      />
      <label htmlFor={_id}>{title}</label>
    </li>
  );
};

export default PlaylistCheckbox;
