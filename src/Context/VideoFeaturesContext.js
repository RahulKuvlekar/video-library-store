import { createContext, useReducer, useEffect } from "react";
import { videoFeaturesReducer } from "../Reducer/videoFeaturesReducer";
import { useAuthContext } from "../Hooks/useAuthContext";
import { getWatchLaterList } from "../Utils/watchlater";
import { getLikedVideos } from "../Utils/likes";
import { getAllPlaylist } from "../Utils/playlist";

const VideoFeaturesContext = createContext({
  videoFeaturesState: {
    watchLaterList: Array,
    likedVideosList: Array,
    playlist: Array,
    isLoading: Boolean,
  },
  dispatchVideoFeatures: Function,
});

const VideoFeaturesProvider = ({ children }) => {
  const INITIAL_STATE = {
    watchLaterList: [],
    likedVideosList: [],
    playlist: [],
    isLoading: false,
  };

  const {
    authState: { isAuthenticated, token },
  } = useAuthContext();

  const [videoFeaturesState, dispatchVideoFeatures] = useReducer(
    videoFeaturesReducer,
    INITIAL_STATE
  );

  useEffect(() => {
    if (isAuthenticated) {
      getWatchLaterList(dispatchVideoFeatures, token);
      getLikedVideos(dispatchVideoFeatures, token);
      getAllPlaylist(dispatchVideoFeatures, token);
    }
  }, [isAuthenticated, token]);

  return (
    <VideoFeaturesContext.Provider
      value={{ videoFeaturesState, dispatchVideoFeatures }}
    >
      {children}
    </VideoFeaturesContext.Provider>
  );
};

export { VideoFeaturesContext, VideoFeaturesProvider };
