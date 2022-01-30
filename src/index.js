import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom"; //only get what you need
import "./index.css";
import App from "./App";

// Keep your root element a constant to improve readability
const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {" "}
      {/*react-router-dom requires wrapping App with this for routing*/}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
