import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";

// Find the root element in the DOM
const rootElement = document.getElementById("root");

// Check if the root element exists
if (rootElement) {
  // Create the root element and render the App component
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
  console.log("Root element not found");
}
