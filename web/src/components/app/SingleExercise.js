import React from 'react';
import { connect } from 'react-redux';
import { Header, Table, Form, Message, Icon } from 'semantic-ui-react';

import { editExercise } from '../../actions';

import './style.css';

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
      <Table.Row style={{ borderColor: '#51C1AB' }} className="striped" key={exercise.id}>
        <Table.Cell style={{ width: 150, borderColor: '#51C1AB' }}>
          <Header as="h4" textAlign="center" style={{ color: '#5A6175' }}>
            {exercise.name}
          </Header>
        </Table.Cell>
        <Table.Cell style={{ width: 150, color: '#5A6175', borderColor: '#51C1AB' }} textAlign="center">
          {exercise.exercise_type}
        </Table.Cell>
        <Table.Cell style={{ borderColor: '#51C1AB' }}>
          <Form onSubmit={this.onSubmit.bind(this)} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'no-wrap', alignItems: 'center' }}>
            <Form.TextArea
              style={{ backgroundColor: '#F6FFFD', width: '35vw', marginTop: '0.8em', color: '#5A6175' }}
              onChange={input =>
                this.setState({
                  description: input.target.value,
                  saved: false
                })}
              value={this.state.description}
            />
            <Form.Button
              style={{ marginLeft: '1.3em', backgroundColor: '#2DB79B' }}
              primary
              disabled={
                this.props.exercise.description === this.state.description ||
                this.state.saved ||
                this.state.description === ''
              }
            >
              {this.state.saved ? 'Saved!' : 'Save'}
            </Form.Button>
          </Form>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default connect(null, { editExercise })(SingleExercise);
