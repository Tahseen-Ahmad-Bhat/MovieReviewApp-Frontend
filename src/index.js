import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import ContextProviders from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <ContextProviders>
        <App />
      </ContextProviders>
    </React.StrictMode>
  </BrowserRouter>
);
