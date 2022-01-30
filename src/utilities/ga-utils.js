import ReactGA from "react-ga";

export const initGA = () => {
  ReactGA.initialize(
    [
      {
        trackingId: process.env.REACT_APP_GOOGLE_ANALYTICS_UA_ID,
        gaOptions: { siteSpeedSampleRate: 100 },
      },
      {
        trackingId: "G-57Q396C1V0",
        gaOptions: { siteSpeedSampleRate: 100 },
      },
    ],
    { debug: true, alwaysSendToDefaultTracker: false }
  );
};

export const sendToGoogleAnalytics = ({ id, name, value }) => {
  // Assumes ID is a string and valid google analytics ID.
  ReactGA.ga("send", "event", {
    eventCategory: "Web Vitals",
    eventAction: name,
    eventValue: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
    eventLabel: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate
  });
};
