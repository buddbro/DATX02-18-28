import React from 'react';
import Button from 'material-ui/Button';
import FeedbackForm from './components/FeedbackForm';

class App extends React.Component {
  render() {
    return (
      <div>
        <Button raised color="primary">
          Get PushApp
        </Button>
        <FeedbackForm />
      </div>
    );
  }
}

export default App;
