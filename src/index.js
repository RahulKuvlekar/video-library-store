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
import { ToastProvider } from "./Context/ToastContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider>
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
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
