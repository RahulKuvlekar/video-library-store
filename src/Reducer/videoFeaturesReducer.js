import { videoFeatures } from "../Constant/constant";

const {
  SET_WATCHLATER_LIST,
  SET_LIKEVIDEOS_LIST,
  SET_PLAYLIST,
  UPDATE_PLAYLIST,
  SET_ISLOADING,
} = videoFeatures;

const videoFeaturesReducer = (prevState, action) => {
  switch (action.type) {
    case SET_WATCHLATER_LIST:
      return { ...prevState, watchLaterList: action.payload };

    case SET_LIKEVIDEOS_LIST:
      return { ...prevState, likedVideosList: action.payload };

    case SET_ISLOADING:
      return { ...prevState, isLoading: action.payload };

    case SET_PLAYLIST:
      return { ...prevState, playlist: action.payload };
    case UPDATE_PLAYLIST:
      return {
        ...prevState,
        playlist: prevState?.playlist.map((item) =>
          item._id === action?.payload?._id ? action.payload : item
        ),
      };

    default:
      return {
        watchLaterList: [],
        likedVideosList: [],
        playlist: [],
        isLoading: false,
      };
  }
};
export { videoFeaturesReducer };
