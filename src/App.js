import logo from './logo.svg';
import './App.css';
import ReactGA from 'react-ga';
import { Component } from "react";

//ReactGA.initialize('UA-215064440-1');
//ReactGA.pageview('test-init-pageview');



class App extends Component {

  componentDidMount(){
    ReactGA.initialize(`UA-215064440-1`);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    return (
      <div className="App container">
        <img src={logo} alt="logo" />
        <h2>Herewegoagain</h2>
      </div>
    );
  }
}
export default App;