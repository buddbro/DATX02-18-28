import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import PasswordReset from './components/PasswordReset';
import Start from './components/Start';
import TopMenu from './components/TopMenu';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <a name="top" />
          <TopMenu />
          <Route exact path="/" component={Start} />
          <Route path="/reset/:id/:token" component={PasswordReset} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
