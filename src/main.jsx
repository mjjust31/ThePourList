import React from "react";
import "./styles/reset.css";
import './index.css';
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter

import { DrinkProvider } from './contexts/DrinkContext'; // Your context


// import "./styles/global.scss";
// import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap your app in BrowserRouter */}
      <DrinkProvider>
        <App />
      </DrinkProvider>
    </BrowserRouter>
  </React.StrictMode>
);
