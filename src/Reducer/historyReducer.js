import { historyFeatures } from "../Constant/constant";

const { SET_HISTORY_LIST } = historyFeatures;

const historyReducer = (prevState, action) => {
  switch (action.type) {
    case SET_HISTORY_LIST:
      return { historyList: action.payload };

    default:
      return {
        historyList: [],
      };
  }
};

export { historyReducer };
