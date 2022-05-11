import {
  FaHome,
  FaCompass,
  FaFolderPlus,
  FaThumbsUp,
  FaClock,
  FaHistory,
} from "react-icons/fa";

export const menus = [
  {
    name: "Home",
    pathname: "/",
    icons: <FaHome />,
  },
  {
    name: "Explore",
    pathname: "/explore",
    icons: <FaCompass />,
  },
  {
    name: "Playlist",
    pathname: "/playlist",
    icons: <FaFolderPlus />,
  },
  {
    name: "Likes",
    pathname: "/likes",
    icons: <FaThumbsUp />,
  },
  {
    name: "Watch Later",
    pathname: "/watchlater",
    icons: <FaClock />,
  },
  {
    name: "History",
    pathname: "/history",
    icons: <FaHistory />,
  },
];
