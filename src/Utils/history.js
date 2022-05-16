import axios from "axios";
import {
  GET_HISTORY,
  DELETE_FROM_HISTORY,
  POST_HISTORY,
  DELETE_ALL_HISTORY,
  historyFeatures,
} from "../Constant/constant";

const { SET_HISTORY_LIST } = historyFeatures;

export const getHistoryList = async (dispatchHistory, encodedToken) => {
  try {
    const { status, data } = await axios.get(GET_HISTORY, {
      headers: { authorization: encodedToken },
    });
    if (status === 200) {
      const { history } = data;
      dispatchHistory({
        type: SET_HISTORY_LIST,
        payload: history,
      });
    }
  } catch (error) {
    console.log(error?.message);
  }
};
export const addToHistoryList = async (
  dispatchHistory,
  encodedToken,
  videoInfo
) => {
  try {
    const { status, data } = await axios.post(
      POST_HISTORY,
      {
        video: videoInfo,
      },
      {
        headers: { authorization: encodedToken },
      }
    );

    if (status === 201) {
      const { history } = data;
      dispatchHistory({
        type: SET_HISTORY_LIST,
        payload: history,
      });
    }
  } catch (error) {
    console.log(error?.message);
  }
};

export const deleteFromHistoryList = async (
  dispatchHistory,
  encodedToken,
  videoID
) => {
  try {
    const { status, data } = await axios.delete(
      `${DELETE_FROM_HISTORY}${videoID}`,
      {
        headers: { authorization: encodedToken },
      }
    );

    if (status === 200) {
      const { history } = data;
      dispatchHistory({
        type: SET_HISTORY_LIST,
        payload: history,
      });
    }
  } catch (error) {
    console.log(error?.message);
  }
};

export const deleteAllHistoryList = async (dispatchHistory, encodedToken) => {
  try {
    const { status, data } = await axios.delete(DELETE_ALL_HISTORY, {
      headers: { authorization: encodedToken },
    });

    if (status === 200) {
      const { history } = data;
      dispatchHistory({
        type: SET_HISTORY_LIST,
        payload: history,
      });
    }
  } catch (error) {
    console.log(error?.message);
  }
};
