import React from 'react';
import { Header, Table } from 'semantic-ui-react';
import { fetchWorkouts } from '../../actions';
import SingleWorkout from './SingleWorkout';
import { connect } from 'react-redux';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = { id: '', name: '', workouts: '' };
  }

  componentDidMount() {
    const { id, name, workouts } = this.state;
    this.props.fetchWorkouts();
  }

  renderWorkouts() {
    if (!this.props.workouts) {
      return null;
    }
    return this.props.workouts.list.map(workout => {
      return <SingleWorkout key={workout.id} workout={workout} />;
    });
  }

  render() {
    return (
      <div>
        <Header as="h1">Dashboard</Header>
        <div>
          <Header as="h2">Workouts</Header>
          <Table celled padded style={{ borderColor: '#51C1AB' }}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  singleLine
                  style={{
                    textAlign: 'center',
                    backgroundColor: '#51C1AB',
                    color: 'white'
                  }}
                >
                  DATE
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{
                    textAlign: 'center',
                    backgroundColor: '#51C1AB',
                    color: 'white'
                  }}
                >
                  NAME
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{
                    textAlign: 'center',
                    backgroundColor: '#51C1AB',
                    color: 'white'
                  }}
                >
                  RATING
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{
                    textAlign: 'center',
                    backgroundColor: '#51C1AB',
                    color: 'white'
                  }}
                >
                  TIME
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{
                    textAlign: 'center',
                    backgroundColor: '#51C1AB',
                    color: 'white'
                  }}
                >
                  COMMENTS
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.renderWorkouts()}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({ workouts }) => {
  return { workouts };
};

export default connect(mapStateToProps, {
  fetchWorkouts
})(Dashboard);
