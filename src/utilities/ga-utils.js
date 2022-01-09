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

export const sendToGoogleAnalytics = ({name, delta, id}) => {
  // Assumes the global `ga()` function exists, see:
  // https://developers.google.com/analytics/devguides/collection/analyticsjs
  var ga = ReactGA.ga();
  ga('send', 'event', {
    eventCategory: 'Web Vitals',
    eventAction: name,
    // The `id` value will be unique to the current page load. When sending
    // multiple values from the same page (e.g. for CLS), Google Analytics can
    // compute a total by grouping on this ID (note: requires `eventLabel` to
    // be a dimension in your report).
    eventLabel: id,
    // Google Analytics metrics must be integers, so the value is rounded.
    // For CLS the value is first multiplied by 1000 for greater precision
    // (note: increase the multiplier for greater precision if needed).
    eventValue: Math.round(name === 'CLS' ? delta * 1000 : delta),
    // Use a non-interaction event to avoid affecting bounce rate.
    nonInteraction: true,
    // Use `sendBeacon()` if the browser supports it.
    transport: 'beacon',

    // OPTIONAL: any additional params or debug info here.
    // See: https://web.dev/debug-web-vitals-in-the-field/
    // dimension1: '...',
    // dimension2: '...',
    // ...
  });
}
