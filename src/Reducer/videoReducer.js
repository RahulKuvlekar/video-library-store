import { videoFeatures } from "../Constant/constant";

const { SET_CATEGORY_LIST, SET_VIDEOLIST, SORT_BY_CATEGORY, CLEAR_ALL } =
  videoFeatures;

const videoReducer = (prevState, action) => {
  switch (action.type) {
    case SET_VIDEOLIST:
      return { ...prevState, videoList: action.payload };

    case SET_CATEGORY_LIST:
      return { ...prevState, categoryList: action.payload };

    case SORT_BY_CATEGORY:
      return { ...prevState, category: action.payload };

    case CLEAR_ALL:
      return { videoList: [], categoryList: [], category: "All" };

    default:
      return { ...prevState };
  }
};

export { videoReducer };
