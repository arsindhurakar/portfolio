import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/main.scss"; // <-- Import SCSS with Tailwind and your variables

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
