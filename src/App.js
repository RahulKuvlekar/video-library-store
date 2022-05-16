import "./App.css";
import Home from "./Pages/Home/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import NavigationBar from "./Components/Navigationbar/NavigationBar";
import Sidebar from "./Components/Sidebar/Sidebar";
import Mockman from "mockman-js";
import Login from "./Pages/Authentication/Login";
import Signup from "./Pages/Authentication/Signup";
import Explore from "./Pages/Explore/Explore";
import SingleVideo from "./Pages/SingleVideo/SingleVideo";
import History from "./Pages/History/History";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

function App() {
  const { pathname } = useLocation();

  return (
    <div className="App">
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
          path="/history"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
