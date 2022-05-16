import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import {
  GET_ALL_VIDEOS,
  GET_ALL_CATEGORIES,
  videoFeatures,
} from "../Constant/constant";
import { videoReducer } from "../Reducer/videoReducer";

const { SET_VIDEOLIST, SET_CATEGORY_LIST } = videoFeatures;

const VideoContext = createContext({
  videoState: { videoList: Array, categoryList: Array, category: String },
  dispatchVideo: Function,
});

const VideoProvider = ({ children }) => {
  const initialValue = {
    videoList: [],
    categoryList: [],
    category: "All",
  };
  const [videoState, dispatchVideo] = useReducer(videoReducer, initialValue);

  useEffect(() => {
    // Get All Videos
    (async () => {
      try {
        const { data, status } = await axios.get(GET_ALL_VIDEOS);
        if (status === 200) {
          const { videos } = data;

          dispatchVideo({
            type: SET_VIDEOLIST,
            payload: videos,
          });
        }
      } catch (error) {
        console.log("error ", error.message);
      }
    })();

    // Get All Categories
    (async () => {
      try {
        const { data, status } = await axios.get(GET_ALL_CATEGORIES);
        if (status === 200) {
          const { categories } = data;

          dispatchVideo({
            type: SET_CATEGORY_LIST,
            payload: categories,
          });
        }
      } catch (error) {
        console.log("error ", error.message);
      }
    })();
  }, []);
  return (
    <VideoContext.Provider value={{ videoState, dispatchVideo }}>
      {children}
    </VideoContext.Provider>
  );
};

export { VideoContext, VideoProvider };
