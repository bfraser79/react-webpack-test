import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import CounterContainer from './Components/Counter-Container';
// import store from './store';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      // <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
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
}

export default App;
