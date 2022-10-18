import React from "react";
import ReactDOM from "react-dom/client";
import ReactModal from "react-modal";
import App from "./App";
import { DataProvider } from "./context/DataContext";
import "./index.css";
ReactModal.setAppElement(document.getElementById("root"));
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>
);
