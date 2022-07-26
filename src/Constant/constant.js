export const GET_SIGNUP = `/api/auth/signup`;
export const GET_LOGIN = `/api/auth/login`;

export const GET_ALL_CATEGORIES = `/api/categories`;
export const GET_ALL_VIDEOS = `/api/videos`;
export const GET_VIDEO = `/api/video/`;

export const GET_LIKED_VIDEO = `/api/user/likes`;
export const POST_LIKED_VIDEO = `/api/user/likes`;
export const DELETE_LIKED_VIDEO = `/api/user/likes/`;

export const GET_WATCHLATER = `/api/user/watchlater`;
export const POST_WATCHLATER = `/api/user/watchlater`;
export const DELETE_WATCHLATER = `/api/user/watchlater/`;

export const GET_HISTORY = `/api/user/history`;
export const POST_HISTORY = `/api/user/history`;
export const DELETE_FROM_HISTORY = `/api/user/history/`;
export const DELETE_ALL_HISTORY = `/api/user/history/all`;

export const GET_PLAYLIST = `/api/user/playlists`;
export const CREATE_PLAYLIST = `/api/user/playlists`;
export const DELETE_PLAYLIST = `/api/user/playlists/`;
export const GET_SPECIFIC_PLAYLIST = `/api/user/playlists/`;
export const POST_TO_SPECIFIC_PLAYLIST = `/api/user/playlists/`;
export const DELETE_FROM_SPECIFIC_PLAYLIST = `/api/user/playlists/`;

export const ADD_TOAST = "ADD_TOAST";
export const DELETE_TOAST = "DELETE_TOAST";
export const SUCCESS = "SUCCESS";
export const INFO = "INFO";
export const WARNING = "WARNING";
export const DANGER = "DANGER";

export const authFeatures = {
  SET_AUTH: "SET_AUTH",
  CLEAR_AUTH: "CLEAR_AUTH",
};

export const videoFeatures = {
  SET_VIDEOLIST: "SET_VIDEOLIST",
  SET_CATEGORY_LIST: "SET_CATEGORY_LIST",
  SORT_BY_CATEGORY: "SORT_BY_CATEGORY",
  CLEAR_ALL: "CLEAR_ALL",
  SET_WATCHLATER_LIST: "SET_WATCHLATER_LIST",
  SET_LIKEVIDEOS_LIST: "SET_LIKEVIDEOS_LIST",
  SET_PLAYLIST: "SET_PLAYLIST",
  UPDATE_PLAYLIST: "UPDATE_PLAYLIST",
  SET_ISLOADING: "SET_ISLOADING",
};

export const historyFeatures = {
  SET_HISTORY_LIST: "SET_HISTORY_LIST",
};
