import { videoFeatures } from "../Constant/constant";

const { SET_WATCHLATER_LIST, SET_LIKEVIDEOS_LIST, SET_ISLOADING } =
  videoFeatures;

const videoFeaturesReducer = (prevState, action) => {
  switch (action.type) {
    case SET_WATCHLATER_LIST:
      return { ...prevState, watchLaterList: action.payload };

    case SET_LIKEVIDEOS_LIST:
      return { ...prevState, likedVideosList: action.payload };

    case SET_ISLOADING:
      return { ...prevState, isLoading: action.payload };

    default:
      return {
        watchLaterList: [],
        likedVideosList: [],
        isLoading: false,
      };
  }
};
export { videoFeaturesReducer };
