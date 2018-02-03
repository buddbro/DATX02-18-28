import React from 'react';
import axios from 'axios';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import '../css/style.css';


class FeedbackForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      feedback: ''
    };
  }

  submitForm(event) {
    event.preventDefault();

    axios
      .post('http://www.getpushapp.com/api/feedback', {
        name: this.state.name,
        feedback: this.state.feedback
      })
      .then(result => {
        console.log(result);
        this.setState({
          name: '',
          feedback: ''
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="content-body">
        <h3>Feedback Form</h3>
        <form
          onSubmit={this.submitForm.bind(this)}
          noValidate
          autoComplete="off"
        >
          <TextField
            onChange={event => this.setState({ name: event.target.value })}
            value={this.state.name}
            placeholder="Name"
          />
          <br />
          <TextField
            multiline
            rows="4"
            placeholder="Give us feedback..."
            onChange={event => this.setState({ feedback: event.target.value })}
          />
          <br />
          <Button
            style={{ marginTop: 20 }}
            raised
            color="primary"
            type="submit"
          >
            Send
          </Button>
        </form>
      </div>
    );
  }
}

export default FeedbackForm;
