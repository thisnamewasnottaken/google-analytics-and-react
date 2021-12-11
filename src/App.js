import logo from './logo.svg';
import './App.css';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-215064440-1');
//ReactGA.pageview('test-init-pageview');


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Testing out Google Analytics.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
