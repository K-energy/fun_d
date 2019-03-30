import React, { Component } from 'react';
import './App.css';
import { Navbar } from './components';
import { Home, Detail, CompanyProfile } from "./pages"

import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <BrowserRouter>
          <Route exact path="/" component={Home}/>
          <Route exact path="/detail" component={Detail}/>
          <Route exact path="/profile" component={CompanyProfile}/>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
