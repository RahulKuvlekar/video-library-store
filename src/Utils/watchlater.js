import axios from "axios";
import {
  GET_WATCHLATER,
  POST_WATCHLATER,
  DELETE_WATCHLATER,
  videoFeatures,
} from "../Constant/constant";

const { SET_WATCHLATER_LIST, SET_ISLOADING } = videoFeatures;

export const getWatchLaterList = async (dispatchWatchLater, encodedToken) => {
  try {
    dispatchWatchLater({
      type: SET_ISLOADING,
      payload: true,
    });

    const { data, status } = await axios.get(GET_WATCHLATER, {
      headers: { authorization: encodedToken },
    });

    if (status === 200) {
      const { watchlater } = data;

      dispatchWatchLater({
        type: SET_WATCHLATER_LIST,
        payload: watchlater,
      });
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    dispatchWatchLater({
      type: SET_ISLOADING,
      payload: false,
    });
  }
};

export const addToWatchLaterList = async (
  dispatchWatchLater,
  encodedToken,
  videoInfo
) => {
  try {
    dispatchWatchLater({
      type: SET_ISLOADING,
      payload: true,
    });

    const { data, status } = await axios.post(
      POST_WATCHLATER,
      {
        video: videoInfo,
      },
      {
        headers: { authorization: encodedToken },
      }
    );

    if (status === 201) {
      const { watchlater } = data;

      dispatchWatchLater({
        type: SET_WATCHLATER_LIST,
        payload: watchlater,
      });
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    dispatchWatchLater({
      type: SET_ISLOADING,
      payload: false,
    });
  }
};

export const deleteFromWatchLaterList = async (
  dispatchWatchLater,
  encodedToken,
  videoID
) => {
  try {
    dispatchWatchLater({
      type: SET_ISLOADING,
      payload: true,
    });

    const { data, status } = await axios.delete(
      `${DELETE_WATCHLATER}${videoID}`,
      {
        headers: { authorization: encodedToken },
      }
    );

    if (status === 200) {
      const { watchlater } = data;

      dispatchWatchLater({
        type: SET_WATCHLATER_LIST,
        payload: watchlater,
      });
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    dispatchWatchLater({
      type: SET_ISLOADING,
      payload: false,
    });
  }
};
