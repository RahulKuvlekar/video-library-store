import { useContext } from "react";
import { VideoFeaturesContext } from "../Context/VideoFeaturesContext";

const useVideoFeaturesContext = () => useContext(VideoFeaturesContext);

export { useVideoFeaturesContext };
