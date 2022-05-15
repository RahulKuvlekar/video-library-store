import { useContext } from "react";
import { VideoContext } from "../Context/VideoContext";

const useVideoContext = () => useContext(VideoContext);

export { useVideoContext };
