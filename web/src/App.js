import React from 'react';
import MenuBar from './components/MenuBar';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./App";
import Feedback from "./components/FeedbackForm";

const styles = {
  header: {
    width: '100%',
  },
  body: {
    width: '80%',
  }
};


function App(props) {
  const { classes } = props;

  return (
    <HashRouter>
      <div className={classes.header}>
        <MenuBar />
      </div>
      <div className={classes.body}>
        <Route path="/" component={Home} />
        <Route path="/Feedback" component={Feedback} />
      </div>
    </HashRouter>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
