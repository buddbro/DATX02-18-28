import React from 'react';
import { connect } from 'react-redux';
import { Header, Button, Table, Modal, Form } from 'semantic-ui-react';
import {
  fetchExercises,
  fetchExerciseSections,
  addExercise
} from '../../actions';
import axios from 'axios';

import SingleExercise from './SingleExercise';

class Exercises extends React.Component {
  constructor(props) {
    super(props);

    this.state = { name: '', section: '', description: '' };
  }

  componentDidMount() {
    this.props.fetchExercises();
    this.props.fetchExerciseSections();
  }

  onSubmit(event) {
    event.preventDefault();
    const { name, section, description } = this.state;

    this.props.addExercise(name, section, description);

    this.setState({ name: '', section: '', description: '' });
  }

  renderExercises() {
    return this.props.exercises.list.map(exercise => {
      return <SingleExercise key={exercise.id} exercise={exercise} />;
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Header
          as="h1"
          style={{ marginTop: '0.5em', marginBottom: '1em', color: '#5A6175' }}
        >
          Exercises
          <Modal
            trigger={
              <Button
                size="large"
                style={{
                  width: '10em',
                  float: 'right',
                  backgroundColor: '#2DB79B',
                  fontSize: '18px',
                  marginRight: 0
                }}
                primary
              >
                ADD EXERCISE
              </Button>
            }
          >
            <Modal.Header>Add an exercise</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Form
                  onSubmit={this.onSubmit.bind(this)}
                  style={{ fontSize: '1.33em' }}
                >
                  <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      label="Name"
                      placeholder="Name"
                      value={this.state.name}
                      onChange={input =>
                        this.setState({ name: input.target.value })}
                    />
                    <Form.Select
                      fluid
                      label="Category"
                      options={this.props.exercises.sections.reduce(
                        (acc, next) => {
                          return [
                            ...acc,
                            {
                              key: `section${next.id}`,
                              text: next.title,
                              value: next.id
                            }
                          ];
                        },
                        []
                      )}
                      placeholder="Category"
                      onChange={(event, data) => {
                        this.setState({ section: data.value });
                      }}
                    />
                  </Form.Group>
                  <Form.TextArea
                    label="Description"
                    placeholder="Explanation of exercise.."
                    value={this.state.description}
                    onChange={input =>
                      this.setState({ description: input.target.value })}
                  />
                  <Form.Button style={{ fontSize: '1.33em' }}>Add</Form.Button>
                </Form>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </Header>

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
                NAME
              </Table.HeaderCell>
              <Table.HeaderCell
                style={{
                  textAlign: 'center',
                  backgroundColor: '#51C1AB',
                  color: 'white'
                }}
              >
                CATEGORY
              </Table.HeaderCell>
              <Table.HeaderCell
                style={{
                  textAlign: 'center',
                  backgroundColor: '#51C1AB',
                  color: 'white'
                }}
              >
                DESCRIPTION
              </Table.HeaderCell>
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

export default connect(mapStateToProps, {
  fetchExercises,
  fetchExerciseSections,
  addExercise
})(Exercises);
