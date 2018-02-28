import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { verifyToken } from './actions';

import PasswordReset from './components/PasswordReset';
import Start from './components/Start';
import LoggedInMenu from './components/LoggedInMenu';
import LoggedOutMenu from './components/LoggedOutMenu';
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
          {this.props.loggedIn ? <LoggedInMenu /> : <LoggedOutMenu />}
          <Route exact path="/" component={Start} />
          <Route path="/app" component={Authenticated} />
          <Route path="/reset/:id/:token" component={PasswordReset} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { loggedIn: user.loggedIn };
};

export default connect(mapStateToProps, { verifyToken })(App);
