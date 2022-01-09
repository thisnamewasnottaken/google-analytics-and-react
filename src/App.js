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
      <h1>Google Analytics Toy</h1>
      <p>Basic Toy to try out Google Analytics with React</p>
      <p>Based on mostly boiler code from a number of sources:</p>
      <p><a href="https://www.npmjs.com/package/react-ga" target="_blank" rel="noreferrer">react-ga NodeJS Library</a></p>
      <p><a href="https://www.npmjs.com/package/web-vitals" target="_blank" rel="noreferrer">web-vitals NodeJS Library</a></p>
      <p><a href="https://www.npmjs.com/package/console-feed" target="_blank" rel="noreferrer">console-feed NodeJS library</a></p>
      <p><a href="https://dev.to/ramonak/react-enable-google-analytics-after-a-user-grants-consent-5bg3" target="_blank" rel="noreferrer">Google Analytics with Cookie Consent Blog by Kate Lupachova</a></p>
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