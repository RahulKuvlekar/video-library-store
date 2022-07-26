import { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useVideoFeaturesContext } from "../../Hooks/useVideoFeaturesContext";
import { useParams } from "react-router";
import { GET_SPECIFIC_PLAYLIST } from "../../Constant/constant";
import { deletePlaylist, deletefromPlaylist } from "../../Utils/playlist";
import { Link, useNavigate } from "react-router-dom";
import HorizontalCard from "../../Components/HorizontalCard/HorizontalCard";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import Error from "../../Components/Error/Error";
import "./ViewPlaylist.css";
import { useToastContext } from "../../Hooks/useToastContext";

const ViewPlaylist = () => {
  const [playlistData, setPlaylistData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const { playlistID } = useParams();
  const navigate = useNavigate();

  const {
    videoFeaturesState: { playlist },
    dispatchVideoFeatures,
  } = useVideoFeaturesContext();
  const {
    authState: { token },
  } = useAuthContext();

  const { dispatchToast } = useToastContext();

  const deleteCompletePlaylist = () => {
    deletePlaylist(dispatchVideoFeatures, token, playlistID, dispatchToast);
    navigate(`/playlist`);
  };

  const deleteVideoFromPlaylist = (event, videoID) => {
    event.stopPropagation();
    deletefromPlaylist(
      dispatchVideoFeatures,
      token,
      playlistID,
      videoID,
      dispatchToast
    );
  };

  const getSpecificPlaylist = async (encodedToken, playlistID) => {
    try {
      setLoading(true);

      const { data, status } = await axios.get(
        `${GET_SPECIFIC_PLAYLIST}${playlistID}`,
        {
          headers: { authorization: encodedToken },
        }
      );

      if (status === 200) {
        const { playlist } = data;
        setPlaylistData(playlist);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSpecificPlaylist(token, playlistID);
    // eslint-disable-next-line
  }, [playlist]);

  return (
    <div className="view-playlist">
      {(() => {
        if (loading === true) return <Loader />;
        else if (error && error !== "") return <Error msg={error} />;
        return (
          <>
            <div className="page-title page-title-space-btw">
              <h2>
                {playlistData?.title}{" "}
                {playlistData?.videos?.length > 0
                  ? `( ${playlistData?.videos?.length} )`
                  : null}
              </h2>
              {playlistData?.title && (
                <button
                  className="btn btn-primary"
                  onClick={deleteCompletePlaylist}
                >
                  <FaTrashAlt />
                  &nbsp; Delete Playlist
                </button>
              )}
            </div>
            {playlistData?.videos?.length === 0 && (
              <div className="not-available">
                <h1>There are No videos in this playlist. Please Add 👻</h1>
                <Link to="/explore" className="btn btn-outline-primary">
                  Let's Explore
                </Link>
              </div>
            )}
            <div className="view-playlist-videolisting">
              {playlistData?.videos?.length > 0 &&
                playlistData?.videos?.map((video) => (
                  <HorizontalCard
                    key={`playlist-video-Card-${video._id}`}
                    videoInfo={video}
                    onDelete={(event) =>
                      deleteVideoFromPlaylist(event, video._id)
                    }
                  />
                ))}
            </div>
          </>
        );
      })()}
    </div>
  );
};
export default ViewPlaylist;
