import React from 'react';
import { Link } from 'react-router-dom';

import { Segment, Menu, Container, Icon } from 'semantic-ui-react';

class TopMenu extends React.Component {
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
            <Menu.Item as={Link} to="/" header>
              <Icon name="hand spock" inverted />
              PushApp
            </Menu.Item>
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
