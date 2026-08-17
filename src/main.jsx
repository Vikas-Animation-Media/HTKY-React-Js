/**
 * @file src/main.jsx
 * @description Absolute entry point of the React application.
 * Initializes the app with React.StrictMode for highlighting potential problems in an application.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Tailwind and global styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
