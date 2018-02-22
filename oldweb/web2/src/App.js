import React from 'react';
import ResetPassword from './components/ResetPassword';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/:id/:token" component={ResetPassword} />
      </Router>
    );
  }
}

export default App;
