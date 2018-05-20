import React, { Component } from 'react';
//import Navbar from './Components/Navbar'
import './styles/App.css';
import Header from './Components/Header/Header.js';

import Main   from './Components/Main/Main.js'
// import { logException } from './ravenconfig';

class App extends Component {

  render() {
    // logException('123');


    return (
      <div className="App">
        <Header / >
        <Main />
      </div>
    );
  }
}

export default App;
