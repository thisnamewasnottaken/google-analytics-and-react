// TODO
// Figure out why HandleAcceptCookie isn't triggered in app component r56


import logo from './logo.svg';
import './App.css';
import ReactGA from 'react-ga';
import React, { Component } from "react";
import reportWebVitals from './reportWebVitals';
import { Hook, Console, Decode } from 'console-feed'
import CookieConsent, { Cookies } from "react-cookie-consent";
import {initGA} from "./utilities/ga-utils"


//reportWebVitals(console.log)
class App extends Component {
  state = {
    logs: []
  }

  handleAcceptCookie = () => {
    if (process.env.REACT_APP_GOOGLE_ANALYTICS_UA_ID) {
      initGA(process.env.REACT_APP_GOOGLE_ANALYTICS_UA_ID);
      console.log("Initialised analytics with handleAcceptCookie")
    };
    console.log("Initialised analytics with handleAcceptCookie")
  }

  initReactGA = () => {
    ReactGA.initialize('UA-215064440-1',
    {
      debug: true,
    });
    ReactGA.pageview('test-init-pageview');
  } 

  componentDidMount(){
    this.handleAcceptCookie();
    //    this.initReactGA();
    Hook(window.console, log => {
      this.setState(({ logs }) => ({ logs: [...logs, Decode(log)] }))
    })
    console.log(`Hello world!!!!`)
    console.log(process.env.REACT_APP_GOOGLE_ANALYTICS_UA_ID)
//    ReactGA.pageview('/I/am/alive');  
//    reportWebVitals();
  }



  render() {
    return (            
      <div className="App container">
        <img className="App-logo" src={logo} alt="logo" />
        <h1>Google Analytics Toy</h1>
        <p>Basic Toy to try out Google Analytics with React</p>
        <p>Based on mostly boiler code from a number of sources:</p>
        <p><a href="https://www.npmjs.com/package/react-ga">react-ga NodeJS Library</a></p>
        <p><a href="https://www.npmjs.com/package/console-feed">console-feed NodeJS library</a></p>
        <CookieConsent
          onAccept={() => {
            console.log("Analytics Tracking Accepted!")
          }}
          debug={true}
          enableDeclineButton
          declineButtonText="Decline Optional Cookies"
          onDecline={() => {
            alert("CookieDeclined!");
          }}          
        >This website uses cookies to enhance the user experience.</CookieConsent>
        <div className="App-console" style={{ backgroundColor: '#242424' }}>
          <Console logs={this.state.logs} variant="dark" />
        </div>
      </div>
    );
  }
}
export default App;