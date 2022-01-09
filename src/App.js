// TODO
// Write unit test cases.


import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import reportWebVitals from './reportWebVitals';
import { Console,Hook, Unhook } from 'console-feed'
import CookieConsent, { Cookies, getCookieConsentValue } from "react-cookie-consent";
import {initGA, GAPageView,sendToGoogleAnalytics} from "./utilities/ga-utils"

reportWebVitals(console.log);
function App() {
  const [logs, setLogs] = useState([])

  const handleAcceptCookie = () => {
    //Trigger Google Universal Analytics on Cookie Accept if set
    console.log("handleAcceptCookie triggered")
    if (process.env.REACT_APP_GOOGLE_ANALYTICS_UA_ID) {
      initGA(process.env.REACT_APP_GOOGLE_ANALYTICS_UA_ID);
    }
  };

  const handleDeclineCookie = () => {
    // Remove Google Analytics Cookies on decline
    Cookies.remove("_ga");
    Cookies.remove("_gat");
    Cookies.remove("_gid");
  };

  useEffect(() => {
    Hook(
      window.console,
      (log) => setLogs((currLogs) => [...currLogs, log]),
      false
    )
    console.log(`Hello world!`);
    console.log(`The analytics ID to use is `+process.env.REACT_APP_GOOGLE_ANALYTICS_UA_ID);
    console.log(`Checking if consent was already passed...`);
    const isConsent = getCookieConsentValue();
    console.log(`Consent was passed: `+isConsent);
    if (isConsent === "true") {
      handleAcceptCookie();
      console.log("Triggering ReactGA PageView");
      GAPageView("google-analytics-and-react/");
      reportWebVitals(sendToGoogleAnalytics);
    };
    return () => Unhook(window.console);
    
  }, []);


  return (            
    <div className="App container">
      <img className="App-logo" src={logo} alt="logo" />
      <h1><a href="https://thisnamewasnottaken.github.io/google-analytics-and-react/">Google Analytics Toy</a></h1>
      <p style={{textAlign: 'center'}} >Basic Toy to try out Google Analytics with React. Based on mostly boiler code from a number of sources.</p>
      <p>This includes basic Universal Analytics and Web Vitals reported to Google Analytics</p>
      <p>Imporant to note, Create-React-App (which is used here) includes a reportWebVitals.js file by default.</p>
      <p>See the code here: <a href="https://github.com/thisnamewasnottaken/google-analytics-and-react">https://github.com/thisnamewasnottaken/google-analytics-and-react</a></p>
      <div className="List-div">
      <h2>References</h2>
      <ul textAlign="left">
        <a>Node Libraries</a>
        <li><a href="https://www.npmjs.com/package/react-ga" target="_blank" rel="noreferrer">react-ga by react-ga</a></li>
        <li><a href="https://www.npmjs.com/package/web-vitals" target="_blank" rel="noreferrer">web-vitals by GoogleChrome</a></li>
        <li><a href="https://www.npmjs.com/package/console-feed" target="_blank" rel="noreferrer">console-feed by samdenty</a></li>
        <a>Blog</a>
        <li><a href="https://dev.to/ramonak/react-enable-google-analytics-after-a-user-grants-consent-5bg3" target="_blank" rel="noreferrer">Blog by Kate Lupachova</a></li>
      </ul>
      </div>
      <h2>Badges</h2>
        <img src="https://github.com/thisnamewasnottaken/google-analytics-and-react/actions/workflows/pages/pages-build-deployment/badge.svg?branch=gh-pages" alt="SVG as an image"/><a> </a>
        <img src="https://github.com/thisnamewasnottaken/google-analytics-and-react/actions/workflows/codeql-analysis.yml/badge.svg" alt="SVG as an image"/>
      <h2>From the console...</h2>
      <div className="App-console" style={{ backgroundColor: '#242424' }}>
        <Console logs={logs} variant="dark" />
      </div>
      <CookieConsent
        onAccept={handleAcceptCookie}
        //debug={true} //Uncomment during development.
        enableDeclineButton
        declineButtonText="Decline Optional Cookies"
        onDecline={handleDeclineCookie}          
      >This website uses cookies to enhance the user experience.</CookieConsent>

    </div>
  );
}
export default App;
