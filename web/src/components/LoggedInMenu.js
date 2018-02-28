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

import { logout } from '../actions';

class LoggedInMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: 'exercises'
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

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
            <Menu.Menu position="right">
              <Menu.Item>
                Logged in as {this.props.user.name}
              </Menu.Item>
              <Menu.Item header onClick={() => this.props.logout()} href="#top">
                <Icon name="sign out" inverted />
                Sign Out
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
      </Segment>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps, { logout })(LoggedInMenu);
