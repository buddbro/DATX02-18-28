import React from 'react';
import { connect } from 'react-redux';
import { Header, Table, Form } from 'semantic-ui-react';
import { fetchExercises } from '../../actions';

import SingleExercise from './SingleExercise';

class Exercises extends React.Component {
  componentDidMount() {
    this.props.fetchExercises();
  }

  renderExercises() {
    return this.props.exercises.list.map(exercise => {
      return <SingleExercise key={exercise.id} exercise={exercise} />;
    });
  }

  render() {
    return (
      <div>
        <Header as="h1" style={{ textAlign: 'center', marginTop: '0.5em', marginBottom: '1em', color: '#5A6175' }}>Exercises</Header>
        <Table celled padded style={{ borderColor: '#51C1AB' }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine style={{textAlign: 'center', backgroundColor: '#51C1AB', color: 'white' }}>NAME</Table.HeaderCell>
              <Table.HeaderCell style={{textAlign: 'center', backgroundColor: '#51C1AB', color: 'white' }}>CATEGORY</Table.HeaderCell>
              <Table.HeaderCell style={{textAlign: 'center', backgroundColor: '#51C1AB', color: 'white' }}>DESCRIPTION</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.renderExercises()}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = ({ exercises }) => {
  return { exercises };
};

export default connect(mapStateToProps, { fetchExercises })(Exercises);
