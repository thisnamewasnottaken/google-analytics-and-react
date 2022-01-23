import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';

const rootElement = document.getElementById("root"); 
//Stripping this out to a constant to make the render more readable

ReactDOM.render(
  
  <React.StrictMode>
    <BrowserRouter> 
    {/*
    Browser Router is required for react-router-dom.
    Wrapping App with this is required for routing to work. 
    */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  
  rootElement
);