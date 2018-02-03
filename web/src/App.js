import React from 'react';
import MenuBar from './components/MenuBar';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';

import { Route, NavLink, HashRouter } from 'react-router-dom';
import Home from './components/Home';
import Feedback from './components/FeedbackForm';

const styles = {
  header: {
    width: '100%'
  },
  body: {
    width: '80%'
  }
};

class App extends React.Component {
  componentDidMount() {
    configureAnchors({ offset: -100 });
  }

  render() {
    return (
      <div>
        <ScrollableAnchor id={'home'}>
          <div className="header">
            <MenuBar />
          </div>
        </ScrollableAnchor>
        <div className="body" style={{ marginTop: 100 }}>
          <Home />
          <div style={{ height: 1000 }} />
          <ScrollableAnchor id={'feedback'}>
            <Feedback />
          </ScrollableAnchor>
          <div style={{ height: 1000 }} />
        </div>
      </div>
    );
  }
}

export default App;
