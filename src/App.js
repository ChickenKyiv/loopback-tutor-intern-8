import React, { Component } from 'react';
import Main from './Components/Main/Main.js'
//import Navbar from './Components/Navbar'
import './styles/App.css';
import Header from './Components/Header/Header.js';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header / >
        <Main />
      </div>
    );
  }
}

export default App;