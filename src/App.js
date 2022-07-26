import "./App.css";
import Home from "./Pages/Home/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import NavigationBar from "./Components/Navigationbar/NavigationBar";
import Sidebar from "./Components/Sidebar/Sidebar";
import Mockman from "mockman-js";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Login from "./Pages/Authentication/Login";
import Signup from "./Pages/Authentication/Signup";
import Explore from "./Pages/Explore/Explore";
import SingleVideo from "./Pages/SingleVideo/SingleVideo";
import History from "./Pages/History/History";
import WatchLater from "./Pages/WatchLater/WatchLater";
import Likes from "./Pages/Likes/Likes";
import Playlist from "./Pages/Playlist/Playlist";
import ViewPlaylist from "./Pages/ViewPlaylist/ViewPlaylist";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import Toast from "./Components/UI/Toast/Toast";

function App() {
  const { pathname } = useLocation();

  return (
    <div className="App">
      <Toast position={"top-left"} autoDeleteInterval={3000} />
      <NavigationBar />
      {!(
        pathname === "/" ||
        pathname === "/login" ||
        pathname === "/signup"
      ) && <Sidebar />}
      <Routes>
        <Route path="/mockman" element={<Mockman />} />
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/:videoId" element={<SingleVideo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/watchlater"
          element={
            <PrivateRoute>
              <WatchLater />
            </PrivateRoute>
          }
        />
        <Route
          path="/likes"
          element={
            <PrivateRoute>
              <Likes />
            </PrivateRoute>
          }
        />
        <Route
          path="/playlist"
          element={
            <PrivateRoute>
              <Playlist />
            </PrivateRoute>
          }
        />
        <Route
          path="/playlist/:playlistID"
          element={
            <PrivateRoute>
              <ViewPlaylist />
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
