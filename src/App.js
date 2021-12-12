import logo from './logo.svg';
import './App.css';
import ReactGA from 'react-ga';
import React, { Component } from "react";
import reportWebVitals from './reportWebVitals';
import { Hook, Console, Decode } from 'console-feed'
//ReactGA.initialize('UA-215064440-1');
//ReactGA.pageview('test-init-pageview');

reportWebVitals(console.log)
class App extends Component {
  state = {
    logs: []
  }

  initReactGA = () => {
    ReactGA.initialize('UA-215064440-1',
    {
      debug: true,
    });
    ReactGA.pageview('test-init-pageview');
  };

  componentDidMount(){
    this.initReactGA();
    Hook(window.console, log => {
      this.setState(({ logs }) => ({ logs: [...logs, Decode(log)] }))
    })
    console.log(`Hello world!!!!`)
    ReactGA.pageview('/I/am/alive');
    reportWebVitals();
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
        <div className="App-console" style={{ backgroundColor: '#242424' }}>
          <Console logs={this.state.logs} variant="dark" />
        </div>

      </div>
    );
  }
}
export default App;