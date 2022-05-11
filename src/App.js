import "./App.css";
import Home from "./Pages/Home/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import NavigationBar from "./Components/Navigationbar/NavigationBar";
import Sidebar from "./Components/Sidebar/Sidebar";
import Mockman from "mockman-js";
import Login from "./Pages/Authentication/Login";
import Signup from "./Pages/Authentication/Signup";

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
      </Routes>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
