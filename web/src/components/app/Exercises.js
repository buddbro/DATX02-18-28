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
        <Header as="h2">Exercises</Header>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>Name</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
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
