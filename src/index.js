import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/base/reset.css";
import "./styles/base/variables.css";
import "./styles/App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
