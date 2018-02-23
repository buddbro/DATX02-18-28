import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Menu, Container, Icon } from 'semantic-ui-react';

class TopMenu extends React.Component {
  state = { activeItem: 'pushapp' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

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
            <Menu.Item
              header
              name="pushapp"
              active={activeItem === 'pushapp'}
              onClick={this.handleItemClick}
            >
              <Icon name="home" inverted />
              PushApp
            </Menu.Item>
            <Menu.Item
              header
              name="download"
              active={activeItem === 'download'}
              onClick={this.handleItemClick}
              href="#download"
            >
              <Icon name="download" inverted />
              Download
            </Menu.Item>
            <Menu.Item
              header
              name="update"
              active={activeItem === 'update'}
              onClick={this.handleItemClick}
            >
              <Icon name="idea" inverted />
              Update
            </Menu.Item>
            <Menu.Item
              header
              name="feedback"
              active={activeItem === 'feedback'}
              onClick={this.handleItemClick}
            >
              <Icon name="mail outline" inverted />
              Feedback
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item
                name="signin"
                active={activeItem === 'signin'}
                onClick={this.handleItemClick}
              >
                <Icon name="sign in" />
                Sign In
              </Menu.Item>
              <Menu.Item
                name="signup"
                active={activeItem === 'signup'}
                onClick={this.handleItemClick}
              >
                <Icon name="signup" />
                Sign Up
              </Menu.Item>
            </Menu.Menu>
            {/* <Menu.Item as="a" to="/" active>
              Home
            </Menu.Item> */}
            {/* <Menu.Item as="a">Work</Menu.Item>
            <Menu.Item as="a">Company</Menu.Item>
            <Menu.Item as="a">Careers</Menu.Item>
            <Menu.Item position="right">
              <Button as="a" inverted>
                Log in
              </Button>
              <Button
                as="a"
                inverted
                primary
                style={{ marginLeft: '0.5em' }}
              >
                Sign Up
              </Button>
            </Menu.Item> */}
          </Container>
        </Menu>
      </Segment>
    );
  }
}

export default TopMenu;
