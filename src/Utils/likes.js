import axios from "axios";
import { DANGER, INFO } from "../Constant/constant";
import {
  GET_LIKED_VIDEO,
  POST_LIKED_VIDEO,
  DELETE_LIKED_VIDEO,
  videoFeatures,
  ADD_TOAST,
} from "../Constant/constant";
import { createToast } from "./toast";

const { SET_LIKEVIDEOS_LIST, SET_ISLOADING } = videoFeatures;

export const getLikedVideos = async (dispatchLikedVideo, encodedToken) => {
  try {
    dispatchLikedVideo({
      type: SET_ISLOADING,
      payload: true,
    });

    const { data, status } = await axios.get(GET_LIKED_VIDEO, {
      headers: { authorization: encodedToken },
    });

    if (status === 200) {
      const { likes } = data;

      dispatchLikedVideo({
        type: SET_LIKEVIDEOS_LIST,
        payload: likes,
      });
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    dispatchLikedVideo({
      type: SET_ISLOADING,
      payload: false,
    });
  }
};

export const addToLikedVideos = async (
  dispatchLikedVideo,
  encodedToken,
  videoInfo,
  dispatchToast
) => {
  try {
    dispatchLikedVideo({
      type: SET_ISLOADING,
      payload: true,
    });

    const { data, status } = await axios.post(
      POST_LIKED_VIDEO,
      {
        video: videoInfo,
      },
      {
        headers: { authorization: encodedToken },
      }
    );

    if (status === 201) {
      const { likes } = data;

      dispatchLikedVideo({
        type: SET_LIKEVIDEOS_LIST,
        payload: likes,
      });

      dispatchToast({
        type: ADD_TOAST,
        payload: createToast(INFO, "You Liked the video"),
      });
    }
  } catch (error) {
    dispatchToast({
      type: ADD_TOAST,
      payload: createToast(DANGER, error.message),
    });
  } finally {
    dispatchLikedVideo({
      type: SET_ISLOADING,
      payload: false,
    });
  }
};

export const deleteFromLikedVideos = async (
  dispatchLikedVideo,
  encodedToken,
  videoID,
  dispatchToast
) => {
  try {
    dispatchLikedVideo({
      type: SET_ISLOADING,
      payload: true,
    });

    const { data, status } = await axios.delete(
      `${DELETE_LIKED_VIDEO}${videoID}`,
      {
        headers: { authorization: encodedToken },
      }
    );

    if (status === 200) {
      const { likes } = data;

      dispatchLikedVideo({
        type: SET_LIKEVIDEOS_LIST,
        payload: likes,
      });

      dispatchToast({
        type: ADD_TOAST,
        payload: createToast(INFO, "You Unliked the video"),
      });
    }
  } catch (error) {
    dispatchToast({
      type: ADD_TOAST,
      payload: createToast(DANGER, error.message),
    });
  } finally {
    dispatchLikedVideo({
      type: SET_ISLOADING,
      payload: false,
    });
  }
};
