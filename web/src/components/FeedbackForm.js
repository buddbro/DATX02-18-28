import React from 'react';
import { Form, Icon, Message, Label } from 'semantic-ui-react';
import axios from 'axios';

class FeedbackForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { name: '', feedback: '', sent: false };
  }

  onSubmit(event) {
    event.preventDefault();

    axios
      .post('https://getpushapp.com/api/feedback', {
        name: this.state.name,
        feedback: this.state.feedback
      })
      .then(() => {
        this.setState({ name: '', feedback: '', sent: true });
      });
  }

  render() {
    if (this.state.sent) {
      return (
        <Message
          icon="inbox"
          header="Thank you for your feedback! &hearts;"
          content="We read all feedback and try to implement suggested features as soon as possible."
        />

      );
    }

    return (
      <Form onSubmit={this.onSubmit.bind(this)} style={{ fontSize: '1.33em' }}>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Name"
            placeholder="Name"
            value={this.state.name}
            onChange={input => this.setState({ name: input.target.value })}
          />
        </Form.Group>
        <Form.TextArea
          label="Feedback"
          placeholder="Tell us what to improve..."
          value={this.state.feedback}
          onChange={input => this.setState({ feedback: input.target.value })}
        />
        <Form.Button style= {{ fontSize: '1.33em' }}>Submit</Form.Button>
      </Form>
    );
  }
}

export default FeedbackForm;
