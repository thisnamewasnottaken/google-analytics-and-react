import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import {getLCP, getFID, getCLS} from 'web-vitals';

import reportWebVitals from './reportWebVitals';

reportWebVitals(sendToAnalytics);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);



