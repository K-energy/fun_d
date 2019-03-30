import React, { Component } from 'react';
import './App.css';
import { Navbar } from './components';

import { BrowserRouter, Route } from 'react-router-dom';
import CompanyProfile from './pages/company-profile';

class App extends Component {
  render() {
    return (
      <>
        <Navbar></Navbar>
        <BrowserRouter>
          <Route exact path="/" component={() => (
            <section>
              <h1>This is Fun D</h1>
              <i className="fa fa-bars" />
            </section>
          )} />
          <Route path="/profile" component={CompanyProfile} />
        </BrowserRouter>
      </>
    );
  }
}

export default App;
