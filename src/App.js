import logo from './logo.svg';
import './App.css';
import ReactGA from 'react-ga';
import { Component } from "react";

//ReactGA.initialize('UA-215064440-1');
//ReactGA.pageview('test-init-pageview');



class App extends Component {

  initReactGA = () => {
    ReactGA.initialize('UA-215064440-1');
    ReactGA.pageview('test-init-pageview');
  };

  componentDidMount(){
    this.initReactGA();
  }

  render() {
    return (
      <div className="App container">
        <img src={logo} alt="logo" />
        <h2>Testing Out GA For Funzies</h2>
      </div>
    );
  }
}
export default App;