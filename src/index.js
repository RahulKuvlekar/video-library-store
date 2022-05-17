import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import { VideoProvider } from "./Context/VideoContext";
import { HistoryProvider } from "./Context/HistoryContext";
import { VideoFeaturesProvider } from "./Context/VideoFeaturesContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <VideoProvider>
          <VideoFeaturesProvider>
            <HistoryProvider>
              <App />
            </HistoryProvider>
          </VideoFeaturesProvider>
        </VideoProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
