import React, { Component } from 'react';
import './App.css';
import Navbar from './components/navbar';

import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <>
        <Navbar></Navbar>
        <BrowserRouter>
          <Route exact path="/" component={() => (
            <section>
              <h1>This is Fun D</h1>
            </section>
          )}/>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
