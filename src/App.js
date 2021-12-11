//import logo from './logo.svg';
import './App.css';
import ReactGA from 'react-ga';
import React,{useEffect} from "react";

//ReactGA.initialize('UA-215064440-1');
//ReactGA.pageview('test-init-pageview');



export default function App() {

  useEffect(() => {
    ReactGA.initialize('UA-215064440-1');
    ReactGA.pageview(window.location.pathname);
  })

  return (
    <div className="App">
      <h1>GRMFPF</h1>
    </div>
  );
}