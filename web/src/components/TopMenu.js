import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Dropdown, Menu, Container, Modal, Image, Header, Button, Form, Icon } from 'semantic-ui-react';

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
              href="#top"
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
              href="#update"
            >
              <Icon name="idea" inverted />
              Update
            </Menu.Item>
            <Menu.Item
              header
              name="feedback"
              active={activeItem === 'feedback'}
              onClick={this.handleItemClick}
              href="#feedback"
            >
              <Icon name="mail outline" inverted />
              Feedback
            </Menu.Item>
            <Menu.Menu position="right">
              <Dropdown item text={<span><Icon name='sign in'/>Sign In</span>}>
                <Dropdown.Menu>
                  <Dropdown.Item>
                  <Form>
                    <Form.Field>
                      <label>Email</label>
                      <input placeholder='example@gmail.com' style={{ width: '250px' }}/>
                    </Form.Field>
                    <Form.Field>
                      <label>Password</label>
                      <input placeholder='********' />
                    </Form.Field>
                    <Button type='Sign In'>Submit</Button>
                  </Form>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Modal trigger={
                <Menu.Item
                  name="signup"
                  active={activeItem === 'signup'}
                  onClick={this.handleItemClick}
                >
                <Icon name="signup" />
                  Sign Up
                </Menu.Item>
              } size="mini">
                <Modal.Header>Sign Up</Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    <Form>
                      <Form.Field>
                        <label>Name</label>
                        <input placeholder='ex. Emilia' />
                      </Form.Field>
                      <Form.Field>
                        <label>Display name</label>
                        <input placeholder='ex. theTerminator93' />
                      </Form.Field>
                      <Form.Field>
                        <label>Email</label>
                        <input placeholder='example@gmail.com' />
                      </Form.Field>
                      <Form.Field>
                        <label>Password</label>
                        <input placeholder='********' />
                      </Form.Field>
                      <Form.Field>
                        <label>Confirm Password</label>
                        <input placeholder='********' />
                      </Form.Field>
                      <Button type='Sign In'>Submit</Button>
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

export default TopMenu;
