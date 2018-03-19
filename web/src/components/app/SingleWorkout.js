import React from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Segment,
  Modal,
  Table,
  Form,
  Message,
  Icon,
  Button
} from 'semantic-ui-react';

import './style.css';

class SingleWorkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: '', date: '' };
  }

  componentDidMount() {
    this.setState({ title: this.props.workout.title || '', date: this.props.workout.date || '' });
  }

  render() {
    const { workout } = this.props;

    return (
      <Table.Row
        style={{ borderColor: '#51C1AB' }}
        className="striped"
        key={workout.id}
      >
        <Table.Cell style={{ width: 150, borderColor: '#51C1AB' }}>
          <Header as="h4" textAlign="center" style={{ color: '#5A6175' }}>
            {workout.date}
          </Header>
        </Table.Cell>
        <Table.Cell
          style={{ width: 150, color: '#5A6175', borderColor: '#51C1AB' }}
          textAlign="center"
        >
          {workout.title}
        </Table.Cell>
        <Table.Cell
          style={{ width: 150, color: '#5A6175', borderColor: '#51C1AB' }}
          textAlign="center"
        >
          tba
        </Table.Cell>
        <Table.Cell
          style={{ width: 150, color: '#5A6175', borderColor: '#51C1AB' }}
          textAlign="center"
        >
          tba
        </Table.Cell>
        <Table.Cell
          style={{ width: 150, color: '#5A6175', borderColor: '#51C1AB' }}
          textAlign="center"
        >
          tba
        </Table.Cell>

      </Table.Row>
    );
  }
}

export default connect(null)(SingleWorkout);
