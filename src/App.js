import "./App.css";
import Home from "./Pages/Home/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import NavigationBar from "./Components/Navigationbar/NavigationBar";
import Sidebar from "./Components/Sidebar/Sidebar";
import Mockman from "mockman-js";

function App() {
  const { pathname } = useLocation();

  return (
    <div className="App">
      <NavigationBar />
      {pathname !== "/" && <Sidebar />}
      <Routes>
        <Route path="/mockman" element={<Mockman />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
