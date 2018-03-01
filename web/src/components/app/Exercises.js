import React from 'react';
import { connect } from 'react-redux';
import { Header, Button, Table, Modal, Form } from 'semantic-ui-react';
import { fetchExercises } from '../../actions';
import axios from 'axios';

import SingleExercise from './SingleExercise';

const options = [
  { key: 'a', text: 'Arms', value: 'arms' },
  { key: 'b', text: 'Back', value: 'back' },
  { key: 'c', text: 'Chest', value: 'chest' },
  { key: 'l', text: 'Legs', value: 'legs' },
  { key: 's', text: 'Shoulders', value: 'shoulders' },
]

class Exercises extends React.Component {

  constructor(props) {
    super(props);

    this.state = { name: '', category: '', description: '' };
  }

  componentDidMount() {
    this.props.fetchExercises();
  }

  onSubmit(event) {
    event.preventDefault();

    axios
      .post('https://getpushapp.com/api/exercises', {
        name: this.state.name,
        category: this.state.category,
        description: this.state.description
      })
      .then(() => {
        this.setState({ name: '', category: '', description: '' });
      });
  }

  renderExercises() {
    return this.props.exercises.list.map(exercise => {
      return <SingleExercise key={exercise.id} exercise={exercise} />;
    });
  }

  render() {
    return (
      <div>
        <Header as="h1" style={{ marginTop: '0.5em', marginBottom: '1em', color: '#5A6175' }}>
          Exercises
          <Modal trigger={<Button size='large' style={{ width: '10em', float: 'right', backgroundColor: '#2DB79B', fontSize: '18px', marginRight: 0 }} primary>
            ADD EXERCISE
          </Button>}>
            <Modal.Header>Add an exercise</Modal.Header>
            <Modal.Content>
              <Modal.Description>
              <Form onSubmit={this.onSubmit.bind(this)} style={{ fontSize: '1.33em' }}>
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="Name"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={input => this.setState({ name: input.target.value })}
                  />
                  <Form.Select
                    fluid
                    label='Category'
                    options={options}
                    placeholder='Category'
                    onChange={input => this.setState({ category: input.target.value })}
                  />
                </Form.Group>
                <Form.TextArea
                  label="Description"
                  placeholder="Explanation of exercise.."
                  value={this.state.description}
                  onChange={input => this.setState({ description: input.target.value })}
                />
                <Form.Button style= {{ fontSize: '1.33em' }}>Add</Form.Button>
              </Form>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </Header>

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
