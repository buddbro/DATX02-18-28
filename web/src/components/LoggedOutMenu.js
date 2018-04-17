import React from 'react';
import { Link } from 'react-router-dom';
import {
  Segment,
  Dropdown,
  Menu,
  Container,
  Modal,
  Image,
  Header,
  Button,
  Form,
  Icon,
  Message
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';
import sha256 from 'sha256';

import { login, register } from '../actions';

class LoggedOutMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: 'pushapp',
      login: { email: '', password: '' },
      register: { name: '', email: '', passwordone: '', passwordtwo: '' }
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  login(event) {
    event.preventDefault();
    this.props.login(this.state.login.email, sha256(this.state.login.password));
  }

  register(event) {
    event.preventDefault();
    this.props.register(
      this.state.register.name,
      this.state.register.email,
      this.state.register.passwordone,
      this.state.register.passwordtwo
    );

    this.setState({
      register: { name: '', email: '', passwordone: '', passwordtwo: '' }
    });
  }

  renderEmailWarning() {
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\“]+(\.[^<>()\[\]\.,;:\s@\“]+)*)|(\“.+\“))@(([^<>()[\]\.,;:\s@\“]+\.)+[^<>()[\]\.,;:\s@\“]{2,})$/i;

    if (
      this.state.register.email.length > 10 &&
      !emailRegex.test(this.state.register.email)
    ) {
      return (
        <Message
          warning
          header="Error:"
          list={['Please enter a valid email.']}
        />
      );
    }
  }

  render() {
    return (
      <Segment inverted>
        <Menu
          fixed="top"
          inverted
          pointing
          secondary
          size="large"
          style={{ backgroundColor: '#000' }}
        >
          <Container>
            <Menu.Item
              header
              name="pushapp"
              active={this.state.activeItem === 'pushapp'}
              onClick={this.handleItemClick}
              href="#top"
            >
              <Icon name="home" inverted />
              PushApp
            </Menu.Item>
            <Menu.Item
              header
              name="download"
              active={this.state.activeItem === 'download'}
              onClick={this.handleItemClick}
              href="#download"
            >
              <Icon name="download" inverted />
              Download
            </Menu.Item>
            <Menu.Item
              header
              name="update"
              active={this.state.activeItem === 'update'}
              onClick={this.handleItemClick}
              href="#policy"
            >
              <Icon name="idea" inverted />
              Policy
            </Menu.Item>
            <Menu.Item
              header
              name="feedback"
              active={this.state.activeItem === 'feedback'}
              onClick={this.handleItemClick}
              href="#feedback"
            >
              <Icon name="mail outline" inverted />
              Feedback
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item header name="feedback" disabled>
                <Icon
                  name="sign in"
                  inverted
                  style={{ marginRight: -140, paddingTop: 2 }}
                />
              </Menu.Item>
              <Dropdown
                item
                text="Sign In"
                closeOnChange={false}
                closeOnBlur={false}
              >
                <Dropdown.Menu>
                  <Dropdown style={{ padding: 10, cursor: 'default' }}>
                    <Form onSubmit={this.login.bind(this)}>
                      <Form.Field>
                        <label>Email</label>
                        <input
                          placeholder="example@gmail.com"
                          style={{ width: '250px' }}
                          value={this.state.login.email}
                          onChange={input =>
                            this.setState({
                              login: {
                                ...this.state.login,
                                email: input.target.value.toLowerCase()
                              }
                            })}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Password</label>
                        <input
                          placeholder="********"
                          type="password"
                          value={this.state.login.password}
                          onChange={input =>
                            this.setState({
                              login: {
                                ...this.state.login,
                                password: input.target.value
                              }
                            })}
                        />
                      </Form.Field>
                      <Form.Button>Submit</Form.Button>
                    </Form>
                  </Dropdown>
                </Dropdown.Menu>
              </Dropdown>

              <Modal
                trigger={
                  <Menu.Item
                    name="signup"
                    active={this.state.activeItem === 'register'}
                    onClick={this.handleItemClick}
                  >
                    <Icon name="signup" />
                    Sign Up
                  </Menu.Item>
                }
                size="mini"
              >
                <Modal.Header>Sign Up</Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    <Form warning onSubmit={this.register.bind(this)}>
                      <Form.Field>
                        <label>Name</label>
                        <input
                          placeholder="ex. Emilia"
                          onChange={input =>
                            this.setState({
                              register: {
                                ...this.state.register,
                                name: input.target.value
                              }
                            })}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Email</label>
                        <input
                          placeholder="example@gmail.com"
                          onChange={input =>
                            this.setState({
                              register: {
                                ...this.state.register,
                                email: input.target.value
                              }
                            })}
                        />
                        {this.renderEmailWarning()}
                      </Form.Field>
                      <Form.Field>
                        <label>Password</label>
                        <input
                          placeholder="********"
                          type="password"
                          onChange={input =>
                            this.setState({
                              register: {
                                ...this.state.register,
                                passwordone: input.target.value
                              }
                            })}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Confirm Password</label>
                        <input
                          placeholder="********"
                          type="password"
                          onChange={input =>
                            this.setState({
                              register: {
                                ...this.state.register,
                                passwordtwo: input.target.value
                              }
                            })}
                        />
                      </Form.Field>
                      <Button type="Sign In">Create User</Button>
                    </Form>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            </Menu.Menu>
          </Container>
        </Menu>
      </Segment>
    );
  }
}

export default connect(null, { login, register })(LoggedOutMenu);
