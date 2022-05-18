import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router";
import { GET_VIDEO } from "../../Constant/constant";
import { FaThumbsUp, FaFolderPlus, FaClock } from "react-icons/fa";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useVideoFeaturesContext } from "../../Hooks/useVideoFeaturesContext";
import { useNavigate, useLocation } from "react-router-dom";
import { deleteFromLikedVideos, addToLikedVideos } from "../../Utils/likes";
import {
  addToWatchLaterList,
  deleteFromWatchLaterList,
} from "../../Utils/watchlater";
import "./SingleVideo.css";
import axios from "axios";
import moment from "moment";
import Loader from "../../Components/Loader/Loader";
import Error from "../../Components/Error/Error";
import Modal from "../../Components/UI/Modal/Modal";
import AddPlaylistModal from "../../Components/AddPlaylistModal/AddPlaylistModal";

const SingleVideo = () => {
  const [videoData, setVideoData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [playlistModal, setplaylistModal] = useState(false);
  const { videoId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    authState: { token, isAuthenticated },
  } = useAuthContext();
  const {
    videoFeaturesState: { watchLaterList, likedVideosList, isLoading },
    dispatchVideoFeatures,
  } = useVideoFeaturesContext();

  const IsAlreadyWatch = useMemo(
    () => watchLaterList.find((video) => video?._id === videoData?._id),
    [watchLaterList, videoData]
  );
  const IsAlreadyLiked = useMemo(
    () => likedVideosList.find((video) => video?._id === videoData?._id),
    [likedVideosList, videoData]
  );

  const watchLaterHandler = () => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true, state: { from: location } });
      return;
    }

    if (IsAlreadyWatch) {
      deleteFromWatchLaterList(dispatchVideoFeatures, token, videoData._id);
    } else {
      addToWatchLaterList(dispatchVideoFeatures, token, videoData);
    }
  };

  const likeVideoHandler = () => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true, state: { from: location } });
      return;
    }

    if (IsAlreadyLiked) {
      deleteFromLikedVideos(dispatchVideoFeatures, token, videoData._id);
    } else {
      addToLikedVideos(dispatchVideoFeatures, token, videoData);
    }
  };

  const getVideo = async () => {
    try {
      setLoading(true);
      const {
        data: { video },
        status,
      } = await axios.get(`${GET_VIDEO}${videoId}`);

      if (status === 200) {
        setVideoData(video);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const openPlaylistModal = () => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true, state: { from: location } });
      return;
    }
    setplaylistModal(true);
  };
  const ClosePlaylistModal = () => setplaylistModal(false);

  useEffect(() => {
    getVideo();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="singleVideo-section">
      {(() => {
        if (loading === true) return <Loader />;
        else if (error) return <Error msg={error} />;
        else
          return (
            <>
              {videoData && (
                <>
                  <iframe
                    className="video-frame"
                    src={`https://www.youtube.com/embed/${videoData._id}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <div className="singleVideo-info">
                    <div>
                      <h1 className="singleVideo-title">{videoData.title}</h1>
                      <div className="singleVideo-details">
                        <h4>
                          {videoData.views} Views &nbsp; &nbsp; &nbsp;
                          <span>
                            {moment(videoData.timeStamp).format("Do MMMM YYYY")}
                          </span>
                        </h4>
                        <div className="singleVideo-buttons">
                          <button
                            disabled={isLoading}
                            onClick={likeVideoHandler}
                            className={`${IsAlreadyLiked ? "isActive" : ""}`}
                          >
                            <FaThumbsUp />
                            Like
                          </button>
                          <button onClick={openPlaylistModal}>
                            <FaFolderPlus />
                            Playlist
                          </button>
                          <button
                            disabled={isLoading}
                            onClick={watchLaterHandler}
                            className={`${IsAlreadyWatch ? "isActive" : ""}`}
                          >
                            <FaClock />
                            Watch Later
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="singleVideo-creator-info">
                      <img
                        src={videoData.creatorImg}
                        alt={videoData.creator}
                        className="singleVideo-creator-img avatar "
                      />
                      <h2>{videoData.creator}</h2>
                    </div>
                    <div className="singleVideo-description">
                      {videoData.description}
                    </div>
                  </div>
                  <Modal isOpen={playlistModal} onClose={ClosePlaylistModal}>
                    <AddPlaylistModal currentVideo={videoData} />
                  </Modal>
                </>
              )}
            </>
          );
      })()}
    </div>
  );
};

export default SingleVideo;
