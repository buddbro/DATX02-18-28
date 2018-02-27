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
  Icon
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';
import sha256 from 'sha256';

import { login, logout } from '../actions';

class TopMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: 'pushapp',
      login: { email: '', password: '' },
      signup: { email: '', name: '', passwordone: '', passwordtwo: '' }
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  login(event) {
    event.preventDefault();
    this.props.login(this.state.login.email, sha256(this.state.login.password));
  }

  signup(event) {
    event.preventDefault();
  }

  renderMenu() {
    if (this.props.user.loggedIn) {
      return (
        <Menu inverted style={{ background: '#000' }}>
          <Link to="/app">
            <Menu.Item
              header
              as="span"
              name="pushapp"
              active={this.state.activeItem === 'pushapp'}
              onClick={this.handleItemClick}
            >
              <Icon name="home" inverted />
              PushApp
            </Menu.Item>
          </Link>
          <Link to="/app/exercises">
            <Menu.Item
              header
              as="span"
              name="exercises"
              active={this.state.activeItem === 'exercises'}
              onClick={this.handleItemClick}
            >
              <Icon name="calendar check" inverted />
              Exercises
            </Menu.Item>
          </Link>
        </Menu>
      );
    } else {
      return (
        <Menu inverted style={{ background: '#000' }}>
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
            href="#update"
          >
            <Icon name="idea" inverted />
            Update
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
        </Menu>
      );
    }
  }

  renderLogin() {
    const { activeItem } = this.state;

    if (this.props.user.loggedIn) {
      return (
        <Menu.Menu position="right">
          <Menu.Item>
            Logged in as {this.props.user.name}
          </Menu.Item>
          <Menu.Item header onClick={() => this.props.logout()} href="#top">
            <Icon name="sign out" inverted />
            Sign Out
          </Menu.Item>
        </Menu.Menu>
      );
    }
    return (
      <Menu.Menu position="right">
        <Menu.Item header name="feedback" disabled>
          <Icon
            name="sign in"
            inverted
            style={{ marginRight: -140, paddingTop: 2 }}
          />
        </Menu.Item>
        <Dropdown item text="Sign In" closeOnChange={false} closeOnBlur={false}>
          <Dropdown.Menu>
            <Dropdown style={{ padding: 10, cursor: 'default' }}>
              <Form onSubmit={this.login.bind(this)}>
                <Form.Field>
                  <label>Email</label>
                  <input
                    placeholder="example@gmail.com"
                    style={{ width: '250px' }}
                    onChange={input =>
                      this.setState({
                        login: {
                          ...this.state.login,
                          email: input.target.value
                        }
                      })}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input
                    placeholder="********"
                    onChange={input =>
                      this.setState({
                        login: {
                          ...this.state.login,
                          password: input.target.value
                        }
                      })}
                  />
                </Form.Field>
                <Button type="Sign In">Submit</Button>
              </Form>
            </Dropdown>
          </Dropdown.Menu>
        </Dropdown>

        <Modal
          trigger={
            <Menu.Item
              name="signup"
              active={activeItem === 'signup'}
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
              <Form>
                <Form.Field>
                  <label>Name</label>
                  <input
                    placeholder="ex. Emilia"
                    onChange={input =>
                      this.setState({
                        signup: {
                          ...this.state.signup,
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
                        signup: {
                          ...this.state.signup,
                          email: input.target.value
                        }
                      })}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input
                    placeholder="********"
                    onChange={input =>
                      this.setState({
                        signup: {
                          ...this.state.signup,
                          passwordone: input.target.value
                        }
                      })}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Confirm Password</label>
                  <input
                    placeholder="********"
                    onChange={input =>
                      this.setState({
                        signup: {
                          ...this.state.signup,
                          passwordtwo: input.target.value
                        }
                      })}
                  />
                </Form.Field>
                <Button type="Sign In">Submit</Button>
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </Menu.Menu>
    );
  }

  render() {
    const { activeItem } = this.state;

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
            {this.renderMenu()}
            {this.renderLogin()}
          </Container>
        </Menu>
      </Segment>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps, { login, logout })(TopMenu);
