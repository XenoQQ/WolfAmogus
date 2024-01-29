import React from "react";
import ReactDOM from "react-dom/client";
import "./components/index.css";
import App from "./components/App";
import { Normalize } from "styled-normalize";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Normalize />
        <App />
    </React.StrictMode>
);
