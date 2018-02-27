import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { verifyToken } from './actions';

import PasswordReset from './components/PasswordReset';
import Start from './components/Start';
import TopMenu from './components/TopMenu';
import Footer from './components/Footer';

import Authenticated from './components/app/Authenticated';

class App extends Component {
  componentDidMount() {
    this.props.verifyToken();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <TopMenu />
          <Route exact path="/" component={Start} />
          <Route path="/app" component={Authenticated} />
          <Route path="/reset/:id/:token" component={PasswordReset} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, { verifyToken })(App);
