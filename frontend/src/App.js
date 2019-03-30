import React, { Component } from 'react';
import './App.css';
import { Home, Detail, CompanyProfile, NotImplemented } from "./pages"
import TemplateWrapper from "./helpers/TemplateWrapper";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <>
        { /* <Navbar /> */ }
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={TemplateWrapper(Home)}/>
            <Route exact path="/detail" component={TemplateWrapper(Detail)}/>
            <Route exact path="/profile" component={TemplateWrapper(CompanyProfile)}/>
            <Route component={TemplateWrapper(NotImplemented)} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
