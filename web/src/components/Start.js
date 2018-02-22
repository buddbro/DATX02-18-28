import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from 'semantic-ui-react';

import FeedbackForm from './FeedbackForm';

class Start extends React.Component {
  render() {
    return (
      <div>
        <Segment
          inverted
          textAlign="center"
          style={{ minHeight: 400, padding: '1em 0em' }}
          vertical
        >
          <Container text>
            <Header
              as="h1"
              content="PushApp"
              inverted
              style={{
                fontSize: '3em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: '2.5em'
              }}
            />
            <Header
              as="h2"
              content="The most amazing workout app. Currently in beta.."
              inverted
              style={{
                fontSize: '1.6em',
                fontWeight: 'normal',
                marginTop: '1em'
              }}
            />
          </Container>
        </Segment>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h3" style={{ fontSize: '2em' }}>
                  PushApp?
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  PushApp is created by a group of students at Chalmers
                  University of Technology as a part of their bachelor thesis
                  spring 2018. The application and this website will continue to
                  develop over time and our goal is to have a polished product
                  by the start of may 2018. If you find any bugs or would like
                  to recommend features or exercises then please contact us at
                  feedback@getpushapp.com
                </p>
              </Grid.Column>
              <Grid.Column floated="right" width={6}>
                <Image
                  bordered
                  rounded
                  size="large"
                  src="/assets/images/wireframe/white-image.png"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column>
              <Segment style={{ padding: '0em' }} vertical>
                <Grid celled="internally" columns="equal" stackable>
                  <Grid.Row textAlign="center">
                    <Grid.Column
                      style={{ paddingBottom: '5em', paddingTop: '5em' }}
                    >
                      <Header as="h3" style={{ fontSize: '2em' }}>
                        Step 1
                      </Header>
                      <p style={{ fontSize: '1.33em' }}>
                        <Image src="/help1.jpg" />
                        <br />
                        <b>Download Expo</b> We are mirroring PushApp in another
                        application called Expo during the developing in order
                        not to publishing through AppStore and Google Play Store
                        every iteration.
                      </p>
                    </Grid.Column>
                    <Grid.Column
                      style={{ paddingBottom: '5em', paddingTop: '5em' }}
                    >
                      <Header as="h3" style={{ fontSize: '2em' }}>
                        Step 2
                      </Header>
                      <p style={{ fontSize: '1.33em' }}>
                        <Image src="/help2.jpg" />
                        <br />
                        <b>Add a mirror</b> By pressing the plus-icon in the
                        upperright corner you will add another mirror
                      </p>
                    </Grid.Column>
                    <Grid.Column
                      style={{ paddingBottom: '5em', paddingTop: '5em' }}
                    >
                      <Header as="h3" style={{ fontSize: '2em' }}>
                        Step 3
                      </Header>
                      <p style={{ fontSize: '1.33em' }}>
                        <Image src="/help3.jpg" />
                        <br />
                        <b>Go to PushApp</b> In the input field you enter
                        '@PushApp/client' in order to reach our server. Once
                        you've pressed done you should be able to access the
                        application! Welcome!
                      </p>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container text>
            <Header as="h3" style={{ fontSize: '2em' }}>
              Send us feedback
            </Header>

            <FeedbackForm />
            {/* <p style={{ fontSize: '1.33em' }}>
              We really appreciate all feedback and you could either provide it
              to the person who invited you to test the application, or send us
              an email at{' '}
              <a href="maito: feedback@getpushapp.com">
                feedback@getpushapp.com
              </a>
            </p> */}
          </Container>
        </Segment>
      </div>
    );
  }
}

export default Start;
