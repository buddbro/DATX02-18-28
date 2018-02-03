import React from 'react';
import MenuBar from './components/MenuBar';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./components/Home";
import Feedback from "./components/FeedbackForm";


const styles = {
  header: {
    width: '100%',
  },
  body: {
    width: '80%',
  }
};

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <div className="header">
            <MenuBar />
          </div>
          <div className="body">
            <Route path="/" component={Home} />
            <Route path="/Feedback" component={Feedback} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
