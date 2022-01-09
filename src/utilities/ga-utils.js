// Just hope and pray ID is a string

import * as ReactGA from "react-ga";

export const initGA = (id) => {
  console.log("initGA Triggered ... ID is " + id)
  console.log("Node env is " + process.env.NODE_ENV)
  if (process.env.NODE_ENV === "production") {
    ReactGA.initialize(id);
    console.log("initGA initialized");
  }
  if (process.env.NODE_ENV === "development") {
    ReactGA.initialize(id);
    console.log("initGA initialized");
  }

};

export const GAPageView = (GA_message) => {
  console.log("GAPageView initialized");
  console.log("Node env is " + process.env.NODE_ENV)
  if (process.env.NODE_ENV === "production") {
    ReactGA.pageview(GA_message);
  }
  if (process.env.NODE_ENV === "development") {
    ReactGA.pageview(`DEV_`+GA_message);
  }

};

export const sendToGoogleAnalytics = ({ id, name, value }) => {
    ReactGA.ga('send', 'event', {
      eventCategory: 'Web Vitals',
      eventAction: name,
      eventValue: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
      eventLabel: id, // id unique to current page load
      nonInteraction: true, // avoids affecting bounce rate
    });
  }