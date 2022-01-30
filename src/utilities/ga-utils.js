// TODO

import ReactGA from "react-ga";

export const initGA = () => {
  ReactGA.initialize(
    [
      {
        trackingId: process.env.REACT_APP_GOOGLE_ANALYTICS_UA_ID,
        gaOptions: {
          cookieFlags: "SameSite=None;Secure",
        },
      },
    ],
    {
      // debug: true,
      alwaysSendToDefaultTracker: false,
    }
  );
};

export const pageViewGA = (page) => {
  console.log("pageViewGA: Starting with page " + page);
  ReactGA.set({ page });
  console.log("pageViewGA: reactGA.set complete ");
  ReactGA.pageview(page);
  console.log("pageViewGA: reactGA.pageview complete ");
  console.log("pageViewGA: exiting");
};
