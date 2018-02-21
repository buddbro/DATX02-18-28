import React from 'react';
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react';
import axios from 'axios';
import sha256 from 'sha256';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // id: '',
      // token: '',
      email: '',
      newPasswordOne: '',
      newPasswordTwo: '',
      success: false
    };
  }

  componentDidMount() {
    const { id, token } = this.props.match.params;

    axios
      .get(`https://getpushapp.com/api/resetpassword/${id}/${token}`)
      .then(({ data }) => this.setState({ email: data[0].email }));
  }

  onSubmit(event) {
    event.preventDefault();

    const { id, token } = this.props.match.params;

    axios
      .post(`https://getpushapp.com/api/resetpassword/${id}/${token}`, {
        passwordOne: sha256(this.state.newPasswordOne),
        passwordTwo: sha256(this.state.newPasswordTwo)
      })
      .then(() =>
        this.setState({ success: true, newPasswordOne: '', newPasswordTwo: '' })
      );
  }

  render() {
    return (
      <div className="login-form">
        <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
      `}</style>
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <h2 style={{ color: '#484BB4' }}>Reset password for PushApp</h2>
            {!this.state.success
              ? <Form size="large" onSubmit={this.onSubmit.bind(this)}>
                  <Segment stacked>
                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="Email"
                      value={this.state.email}
                    />
                    <Form.Input
                      fluid
                      icon="lock"
                      iconPosition="left"
                      placeholder="New password"
                      onChange={input =>
                        this.setState({ newPasswordOne: input.target.value })}
                      value={this.state.newPasswordOne}
                      type="password"
                    />
                    <Form.Input
                      fluid
                      icon="lock"
                      iconPosition="left"
                      placeholder="New password again"
                      onChange={input =>
                        this.setState({ newPasswordTwo: input.target.value })}
                      value={this.state.newPasswordTwo}
                      type="password"
                    />

                    <Button color="teal" fluid size="large">
                      Reset Password
                    </Button>
                  </Segment>
                </Form>
              : <Message success>Password reset successful!</Message>}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default ResetPassword;
