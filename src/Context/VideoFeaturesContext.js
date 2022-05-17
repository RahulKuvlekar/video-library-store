import { createContext, useReducer, useEffect } from "react";
import { videoFeaturesReducer } from "../Reducer/videoFeaturesReducer";
import { useAuthContext } from "../Hooks/useAuthContext";
import { getWatchLaterList } from "../Utils/watchlater";
import { getLikedVideos } from "../Utils/likes";

const VideoFeaturesContext = createContext({
  videoFeaturesState: {
    watchLaterList: Array,
    likedVideosList: Array,
    isLoading: Boolean,
  },
  dispatchVideoFeatures: Function,
});

const VideoFeaturesProvider = ({ children }) => {
  const INITIAL_STATE = {
    watchLaterList: [],
    likedVideosList: [],
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
