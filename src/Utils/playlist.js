import axios from "axios";
import {
  GET_PLAYLIST,
  CREATE_PLAYLIST,
  DELETE_PLAYLIST,
  POST_TO_SPECIFIC_PLAYLIST,
  DELETE_FROM_SPECIFIC_PLAYLIST,
  videoFeatures,
} from "../Constant/constant";

const { SET_PLAYLIST, UPDATE_PLAYLIST, SET_ISLOADING } = videoFeatures;

export const getAllPlaylist = async (dispatchPlaylist, encodedToken) => {
  try {
    dispatchPlaylist({
      type: SET_ISLOADING,
      payload: true,
    });

    const { data, status } = await axios.get(GET_PLAYLIST, {
      headers: { authorization: encodedToken },
    });

    if (status === 200) {
      const { playlists } = data;

      dispatchPlaylist({
        type: SET_PLAYLIST,
        payload: playlists,
      });
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    dispatchPlaylist({
      type: SET_ISLOADING,
      payload: false,
    });
  }
};

export const createPlaylist = async (dispatchPlaylist, encodedToken, title) => {
  try {
    dispatchPlaylist({
      type: SET_ISLOADING,
      payload: true,
    });

    const { data, status } = await axios.post(
      CREATE_PLAYLIST,
      {
        playlist: { title: title },
      },
      {
        headers: { authorization: encodedToken },
      }
    );

    if (status === 201) {
      const { playlists } = data;

      dispatchPlaylist({
        type: SET_PLAYLIST,
        payload: playlists,
      });
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    dispatchPlaylist({
      type: SET_ISLOADING,
      payload: false,
    });
  }
};

export const deletePlaylist = async (
  dispatchPlaylist,
  encodedToken,
  playlistID
) => {
  try {
    dispatchPlaylist({
      type: SET_ISLOADING,
      payload: true,
    });

    const { data, status } = await axios.delete(
      `${DELETE_PLAYLIST}${playlistID}`,
      {
        headers: { authorization: encodedToken },
      }
    );

    if (status === 200) {
      const { playlists } = data;

      dispatchPlaylist({
        type: SET_PLAYLIST,
        payload: playlists,
      });
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    dispatchPlaylist({
      type: SET_ISLOADING,
      payload: false,
    });
  }
};

export const addtoPlaylist = async (
  dispatchPlaylist,
  encodedToken,
  playlistID,
  video
) => {
  try {
    dispatchPlaylist({
      type: SET_ISLOADING,
      payload: true,
    });
    const { data, status } = await axios.post(
      `${POST_TO_SPECIFIC_PLAYLIST}${playlistID}`,
      {
        video: video,
      },
      {
        headers: { authorization: encodedToken },
      }
    );

    if (status === 201) {
      const { playlist } = data;

      dispatchPlaylist({
        type: UPDATE_PLAYLIST,
        payload: playlist,
      });
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    dispatchPlaylist({
      type: SET_ISLOADING,
      payload: false,
    });
  }
};

export const deletefromPlaylist = async (
  dispatchPlaylist,
  encodedToken,
  playlistID,
  videoID
) => {
  try {
    dispatchPlaylist({
      type: SET_ISLOADING,
      payload: true,
    });

    const { data, status } = await axios.delete(
      `${DELETE_FROM_SPECIFIC_PLAYLIST}${playlistID}/${videoID}`,
      {
        headers: { authorization: encodedToken },
      }
    );

    if (status === 200) {
      const { playlist } = data;

      dispatchPlaylist({
        type: UPDATE_PLAYLIST,
        payload: playlist,
      });
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    dispatchPlaylist({
      type: SET_ISLOADING,
      payload: false,
    });
  }
};
