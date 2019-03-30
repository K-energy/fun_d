import React, { Component } from 'react';
import './App.css';
import { Navbar,Footer } from './components';
import { Home, Detail, CompanyProfile } from "./pages"
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
        </BrowserRouter>
        <Footer/>
      </>
    );
  }
}

export default App;
