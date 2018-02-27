import React from 'react';
import { connect } from 'react-redux';
import { Header, Table, Form, Message, Icon } from 'semantic-ui-react';

import { editExercise } from '../../actions';

class SingleExercise extends React.Component {
  constructor(props) {
    super(props);

    this.state = { description: '', saved: false };
  }

  componentDidMount() {
    this.setState({ description: this.props.exercise.description || '' });
  }
  onSubmit(event) {
    event.preventDefault;

    this.props.editExercise(this.props.exercise.id, this.state.description);
    this.setState({ saved: true });
  }

  render() {
    const { exercise } = this.props;

    return (
      <Table.Row key={exercise.id}>
        <Table.Cell style={{ width: 200 }}>
          <Header as="h4" textAlign="center">
            {exercise.name}
          </Header>
        </Table.Cell>
        <Table.Cell style={{ width: 140 }} textAlign="center">
          {exercise.exercise_type}
        </Table.Cell>
        <Table.Cell>
          <Form onSubmit={this.onSubmit.bind(this)}>
            <Form.TextArea
              onChange={input =>
                this.setState({
                  description: input.target.value,
                  saved: false
                })}
              value={this.state.description}
            />
            <Form.Button
              primary
              disabled={
                this.props.exercise.description === this.state.description ||
                this.state.saved
              }
            >
              {this.state.saved ? 'Saved!' : 'Save'}
            </Form.Button>
          </Form>
          {/* <Message success>
            <Icon name="help" />
            Already signed up?&nbsp;<a href="#">Login here</a>&nbsp;instead.
          </Message> */}
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default connect(null, { editExercise })(SingleExercise);
