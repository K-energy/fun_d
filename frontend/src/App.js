import React, { Component } from 'react';
import './App.css';
import { Home, Detail, CompanyProfile, NotImplemented } from "./pages"
import TemplateWrapper from "./helpers/TemplateWrapper";
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <>
        { /* <Navbar /> */ }
        <BrowserRouter>
          <Route exact path="/" component={TemplateWrapper(Home)}/>
          <Route exact path="/detail" component={TemplateWrapper(Detail)}/>
          <Route exact path="/profile" component={TemplateWrapper(CompanyProfile)}/>
          <Route component={TemplateWrapper(NotImplemented)} />
        </BrowserRouter>
      </>
    );
  }
}

export default App;
