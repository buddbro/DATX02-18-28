import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import { NavLink } from 'react-router-dom';
import Home from './Home';
import Feedback from './FeedbackForm';

const styles = {
  header: {
    width: '100%'
  },
  flex: {
    flex: 1
  },
  menuItems: {
    marginLeft: 50
  }
};

function MenuBar(props) {
  const { classes } = props;
  return (
    <div className={classes.header}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            type="title"
            color="inherit"
            className={classes.menuItems}
          >
            <a href="#home">Home</a>
          </Typography>
          <Typography
            type="title"
            color="inherit"
            className={classes.menuItems}
          >
            <a href="#feedback">Send feedback</a>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

MenuBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuBar);
