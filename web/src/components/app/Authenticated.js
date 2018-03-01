import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Header, Segment } from 'semantic-ui-react';

import Dashboard from './Dashboard';
import Exercises from './Exercises';

const Workouts = () => <div>Workout</div>;

class Authenticated extends React.Component {
  render() {
    if (!this.props.user.loggedIn && !this.props.user.loading) {
      return <Redirect to="/" />;
    }

    return (
      <Container>
        <Segment>
          <Route exact path="/app" component={Dashboard} />
          <Route path="/app/exercises" component={Exercises} />
          <Route path="/app/workouts" component={Workouts} />
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps)(Authenticated);
