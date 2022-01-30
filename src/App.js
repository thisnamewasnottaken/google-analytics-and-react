// TODO
// Write unit test cases.

import "./App.css";
import React, { useEffect } from "react";
import reportWebVitals from "./reportWebVitals";
import ReactGA from "react-ga";
import CookieConsent, {
  Cookies,
  getCookieConsentValue,
} from "react-cookie-consent";
import { initGA, pageViewGA } from "./utilities/ga-utils";
import { Routes, Route, Link } from "react-router-dom";

const handleAcceptCookie = () => {
  //Trigger Google Universal Analytics on Cookie Accept if set
  console.log("handleAcceptCookie triggered");
  initGA();
  // const page = window.location.pathname;
  // console.log(`handlePageView for ` + page);
  // pageViewGA(page);
  // reportWebVitals(({ id, name, value }) =>
  //   ReactGA.event({
  //     action: name,
  //     category: "Web Vitals",
  //     label: id,
  //     nonInteraction: true,
  //     value: Math.round(name === "CLS" ? value * 1000 : value),
  //   })
  // );
};

const handleDeclineCookie = () => {
  // Remove Google Analytics Cookies on decline
  console.log("handleDeclineCookie");
  Cookies.remove("_ga");
  Cookies.remove("_gat");
  Cookies.remove("_gid");
};

// Handles pageview reporting
const handlePageView = () => {
  const isConsent = getCookieConsentValue() ?? false;
  if (isConsent === false) {
    handleDeclineCookie();
  } else {
    const page = window.location.pathname;
    console.log(`handlePageView for ` + page);
    pageViewGA(page);
    reportWebVitals(({ id, name, value }) =>
      ReactGA.event({
        action: name,
        category: "Web Vitals",
        label: id,
        nonInteraction: true,
        value: Math.round(name === "CLS" ? value * 1000 : value),
      })
    );
  }
};

// Main body for the app
// Featured at `/` and `/home`
function HomeComponent() {
  console.log(`Home Component is Rendering`);
  handlePageView();

  return (
    <div className="AppContainer">
      <div className="App-header-logo-box">
        <img
          src="https://github.com/thisnamewasnottaken/google-analytics-and-react/actions/workflows/pages/pages-build-deployment/badge.svg?branch=gh-pages"
          alt="Github Pages Workflow Status badge"
        />
        <img
          src="https://github.com/thisnamewasnottaken/google-analytics-and-react/actions/workflows/codeql-analysis.yml/badge.svg"
          alt="Github CodeQL Status badge"
        />
      </div>

      <p style={{ textalign: "center" }}>
        Basic Toy to try out Google Analytics with React. Based on mostly boiler
        code from a number of sources.
      </p>
      <p>
        This includes basic Universal Analytics and Web Vitals reported to
        Google Analytics
      </p>
      <p>
        Imporant to note, Create-React-App (which is used here) includes a
        reportWebVitals.js file by default.
      </p>
      <p>
        Source code at:{" "}
        <a
          href="https://github.com/thisnamewasnottaken/google-analytics-and-react"
          target="_blank"
          rel="noreferrer"
        >
          github {">"} thisnamewasnottaken {">"} google-analytics-and-react
        </a>
      </p>
    </div>
  );
}

// Body for the /references page
// Uses a console-feed component
function ReferencesComponent() {
  console.log(`Reference Component is Selected`);
  handlePageView();
  return (
    <div>
      <h2>References</h2>
      <div className="List-div">
        <ul textalign="left">
          <p>Node Libraries</p>
          <li>
            <a
              href="https://www.npmjs.com/package/react-ga"
              target="_blank"
              rel="noreferrer"
            >
              react-ga by react-ga
            </a>
          </li>
          <li>
            <a
              href="https://www.npmjs.com/package/web-vitals"
              target="_blank"
              rel="noreferrer"
            >
              web-vitals by GoogleChrome
            </a>
          </li>
          <p>Blog</p>
          <li>
            <a
              href="https://dev.to/ramonak/react-enable-google-analytics-after-a-user-grants-consent-5bg3"
              target="_blank"
              rel="noreferrer"
            >
              Blog by Kate Lupachova
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

// Body for the Logo Box
function LogoBox() {
  return (
    <div className="App-header-logo-box">
      {/* Fun Fact: Anything in the public folder can be referenced using the process env. 
        Reduces 404 fun. */}
      <img
        className="App-logo"
        src={process.env.PUBLIC_URL + "/Assets/google_analytics-icon.svg"}
        alt="Google Analytics Logo"
      />
      <img
        className="App-logo-spin"
        src={process.env.PUBLIC_URL + "/Assets/logo.svg"}
        alt="React Logo"
      />
      <img
        className="App-logo"
        src={process.env.PUBLIC_URL + "/Assets/google-lighthouse.svg"}
        alt="Google Lighthouse Logo"
      />
      <img
        className="App-logo"
        src={process.env.PUBLIC_URL + "/Assets/github-icon.svg"}
        alt="Github Logo"
      />
    </div>
  );
}

function App() {
  const startupactions = () => {
    console.log(
      `startUpActions: The analytics ID to use is ` +
        process.env.REACT_APP_GOOGLE_ANALYTICS_UA_ID +
        `Checking if consent was already passed.`
    );
  };

  useEffect(() => {
    startupactions();
    const isConsent = getCookieConsentValue() ?? false;
    console.log(`App_UseEffect: Consent ` + isConsent);
    if (isConsent === false) {
      handleDeclineCookie();
    } else {
      handleAcceptCookie();
    }
  }, []);

  return (
    <div className="App container">
      <h1>Google Analytics and React Toy</h1>
      <h2>
        <i>It forgets you on purpose...</i>
      </h2>

      <nav style={{ padding: "1rem 0" }}>
        <Link to="/google-analytics-and-react/home">Home</Link> | {""}
        <Link to="/google-analytics-and-react/references">References</Link>
      </nav>
      <p></p>
      <LogoBox />
      <p></p>
      <Routes>
        <Route path="/" element={<HomeComponent />}></Route>
        <Route
          path="/google-analytics-and-react"
          element={<HomeComponent />}
        ></Route>
        <Route
          path="/google-analytics-and-react/home"
          element={<HomeComponent />}
        />
        <Route
          path="/google-analytics-and-react/references"
          element={<ReferencesComponent />}
        />
      </Routes>
      <CookieConsent
        onAccept={handleAcceptCookie}
        debug={true} //Uncomment during development or constant cookie presence.
        enableDeclineButton
        declineButtonText="Decline Optional Cookies"
        onDecline={handleDeclineCookie}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </div>
  );
}
export default App;
