import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Card,
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
      <a name="top">
        <Segment
          inverted
          textAlign="center"
          style={{
            minHeight: 600,
            padding: '1em 0em',
            backgroundImage: 'url(/intro-bg.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '100vh',
            backgroundPosition: 'center center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          vertical
        >
          <Container text style={{ alignSelf: 'center' }}>
            <Header
              as="h1"
              content="PushApp"
              inverted
              style={{
                fontSize: '3em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: 0
              }}
            />
            <Header.Subheader
              as="h2"
              content="The most amazing workout app. Currently in beta.."
              style={{
                fontSize: '1.6em',
                fontWeight: 'normal',
                marginTop: '1em'
              }}
            />
            <a href="#welcome" style={{ color: '#FFFFFF' }}><Icon link name="chevron circle down" size="huge"/></a>
          </Container>
        </Segment>
        </a>
        <a name="welcome" />
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <Header
                  as="h3"
                  style={{ fontSize: '2em', textAlign: 'center' }}
                >
                  Welcome
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  PushApp is created by a group of students at Chalmers
                  University of Technology as a part of their bachelor thesis
                  spring 2018.
                </p>{' '}
                <p style={{ fontSize: '1.33em' }}>
                  {' '}The application and this website will continue to develop
                  over time and our goal is to have a polished product by the
                  start of may 2018. If you find any bugs or would like to
                  recommend features or exercises then please contact us at
                </p>
                <p style={{ fontSize: '1.33em', textAlign: 'center' }}>
                  <a href="maito: feedback@getpushapp.com">
                    feedback@getpushapp.com
                  </a>
                </p>
              </Grid.Column>
              <Grid.Column floated="right" width={6}>
                <Icon name="hand spock" size="massive" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <a name="download" />
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column>
              <Header as="h1" style={{ fontSize: '3em', textAlign: 'center', marginTop: '1em' }}>
                Download
              </Header>
              <Segment basic  vertical>
                <Header.Subheader as="h3" style={{ fontSize: '2em', textAlign: 'center' }}>
                  iOS instructions
                </Header.Subheader>
                <Grid celled="internally" columns="equal" stackable>

                  <Grid.Row textAlign="center" style={{ justifyContent: 'space-around', alignItems: 'stretch', marginTop: 0 }}>

                    <Card
                      image='/help1-ios.jpg'
                      header='Step 1'
                      style={{ marginTop: '1em', fontSize: '1.33em', textAlign: 'center' }}
                      meta='Download Expo'
                      description='We are mirroring PushApp in another
                      application called Expo during the developing in order
                      not to publishing through AppStore and Google Play Store
                      every iteration. The finalized version of the
                      application will be available in the app stores later
                      this spring. In the picture above you will see how Expo
                      looks like in AppStore.'
                    />

                    <Card
                      image='/help2-ios.jpg'
                      header='Step 2'
                      meta='Add a mirror'
                      style={{ fontSize: '1.33em', textAlign: 'center' }}
                      description='By pressing the plus-icon in the
                      upperright corner you will add another mirror.'
                    />

                    <Card
                      image='/help3-ios.jpg'
                      header='Step 3'
                      meta='Go to PushApp'
                      style={{ marginBottom: '1em', fontSize: '1.33em', textAlign: 'center' }}
                      description='In the input field you enter @PushApp/client in order to reach our server. Once you have pressed done you should be able to access the application! Welcome!'
                    />

                  </Grid.Row>
                </Grid>
                <Header.Subheader as="h3" style={{ fontSize: '2em', textAlign: 'center' }}>
                  Android instructions
                </Header.Subheader>
                <Grid celled="internally" columns="equal" stackable>

                  <Grid.Row textAlign="center" style={{ justifyContent: 'space-around', alignItems: 'stretch', marginTop: 0 }}>

                    <Card
                      image='/help1-android.png'
                      header='Step 1'
                      style={{ marginTop: '1em', fontSize: '1.33em', textAlign: 'center' }}
                      meta='Download Expo'
                      description='We are mirroring PushApp in another
                      application called Expo during the developing in order
                      not to publishing through AppStore and Google Play Store
                      every iteration. The finalized version of the
                      application will be available in the app stores later
                      this spring. In the picture above you will see how Expo
                      looks like in Google Play Store.'
                    />

                    <Card
                      image='/help2-android.png'
                      header='Step 2'
                      meta='Add a mirror'
                      style={{ fontSize: '1.33em', textAlign: 'center' }}
                      description='To add another mirror, navigate to
                      "Explore" in the bottom-menu.'
                    />

                    <Card
                      image='/help3-android.png'
                      header='Step 3'
                      meta='Go to PushApp'
                      style={{ marginBottom: '1em', fontSize: '1.33em', textAlign: 'center' }}
                      description='Press the search-icon. In the input field you enter @PushApp/client in order to reach our server. Tap the search result (as seen in the picture above). You should now be able to access the application. Welcome!'
                    />

                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <a name="update" />
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column>
              <Header as="h1" style={{ fontSize: '3em', textAlign: 'center', marginTop: '1em' }}>
                Update
              </Header>
              <Segment basic  vertical>
                <Grid celled="internally" columns="equal" stackable>
                  <Grid.Row textAlign="center" style={{ justifyContent: 'space-around', alignItems: 'stretch', marginTop: 0 }}>

                    <Card
                      image='/update-ios.png'
                      header='iOS'
                      style={{ marginTop: '1em', fontSize: '1.33em' }}
                      meta='Update'
                      description='If you have an iOS phone, simply shake your device
                      to navigate to the screen in the picture above. Once there, tap
                      "Refresh". Your app is now updated!'
                    />

                      <Card
                        image='/update-android.png'
                        header='Android'
                        meta='Update'
                        style={{ marginBottom: '1em', fontSize: '1.33em' }}
                        description='If you have an android phone, navigate to the
                        quick settings menu in android by swiping down from the top
                        of your phone. Once there, tap the refresh-button. Your app
                        is now updated!'
                      />

                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <a name="feedback" />
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
