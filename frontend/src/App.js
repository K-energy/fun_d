import React, { Component } from 'react';
import './App.css';
import { Navbar } from './components';

class App extends Component {
  render() {
    return (
      <>
        <Navbar></Navbar>
        <section>
          <h1>This is Fun D</h1>
        </section>
      </>
    );
  }
}

export default App;
