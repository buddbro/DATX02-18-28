import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
import { connect } from 'react-redux';

import FeedbackForm from './FeedbackForm';

class Start extends React.Component {
  render() {
    if (this.props.user.loading) {
      return <div />;
    }

    if (this.props.user.loggedIn) {
      return <Redirect to="/app/exercises" />;
    }

    return (
      <div>
        <a name="top" />
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
            <a href="#welcome" style={{ color: '#FFFFFF' }}>
              <Icon link name="chevron circle down" size="huge" />
            </a>
          </Container>
        </Segment>
        <a name="welcome" />
        <Container style={{ padding: '8em 0em' }} vertical>
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
        </Container>

        <a name="download" />
        <Container
          inverted
          textAlign="center"
          style={{
            minHeight: 600,
            padding: '1em 0em',
            backgroundImage: 'url(/banner.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            height: '100vh',
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
          vertical
        />
        <Container style={{ display: 'flex', justifyContent: 'center' }}>
          <a href="https://play.google.com/store/apps/details?id=com.getpushapp.v1" target="_blank"><Image src='/app-store.svg' style={{ width: '200px', paddingTop: '14px' }}/></a>
          <a href="https://play.google.com/store/apps/details?id=com.getpushapp.v1" target="_blank"><Image src='/google-play.png' style={{ width: '250px' }}/></a>
        </Container>

        <a name="policy" />
        <Container style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={12} style={{ marginRight: 'auto', marginLeft: 'auto' }}>
                <Header
                  as="h3"
                  style={{ fontSize: '2em', textAlign: 'center' }}
                >
                  Privacy policy
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  We at GetPushApp.com built the Get PushApp app as
                  a free app. This service is provided by
                  GetPushApp.com at no cost and is intended for use
                  as is.
                </p>{' '}
                <p style={{ fontSize: '1.33em' }}>
                  {' '}This page is used to inform website visitors
                  regarding our policies with the collection, use,
                  and disclosure of personal information if anyone
                  decided to use our service.
                </p>
                <p style={{ fontSize: '1.33em' }}>
                  {' '}If you choose to use our service, then you agree
                  to the collection and use of information in relation
                  to this policy. The personal Information that we
                  collect is used for providing and improving the
                  service. We will not use or share your information
                  with anyone except as described in this privacy policy.
                </p>
                <p style={{ fontSize: '1.33em' }}>
                  {' '}The terms used in this privacy policy have the same
                  meanings as in our terms and conditions, which is
                  accessible at Get PushApp unless otherwise defined in
                  this privacy policy.
                </p>
                <p style={{ fontSize: '1.33em' }}>
                  {' '}The terms used in this privacy policy have the same
                  meanings as in our terms and conditions, which is
                  accessible at Get PushApp unless otherwise defined in
                  this privacy policy.
                </p>
                <Header as='h3' style={{ marginBottom: 0 }}>
                  Information Collection and Use
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                {' '}For a better experience, while using our service,
                we require you to provide us with certain personally
                identifiable information, including but not limited
                to email, first name and your logged workouts. The
                information that we request will be retained by us
                and used as following:
                </p>
                <p style={{ fontSize: '1.33em' }}>
                {' '}The email is used by the app as a means of
                identifying the users and allow them to sign in to
                their accounts. The email may also be used to send
                information to you, such as if you have forgotten your
                password etc.The first name is used to greet the user
                upon signing in, and is in no way used otherwise.
                </p>
                <p style={{ fontSize: '1.33em' }}>
                {' '}The collection of logged workouts is used to allow
                you as a user to track your progress.
                </p>
                <p style={{ fontSize: '1.33em' }}>
                {' '}The app does use third party services that may
                collect information used to identify you.
                </p>
                <p style={{ fontSize: '1.33em' }}>
                {' '}Link to privacy policy of third party service
                providers used by the app:
                </p>
                <p style={{ fontSize: '1.33em' }}>
                {' '}<List bulleted>
                      <List.Item>Currently no third parties involved</List.Item>
                    </List>
                </p>
                <p style={{ fontSize: '1.33em' }}>
                {' '}The app does not share your personal information with
                any other third parties.
                </p>
                <Header as="h3" style={{ marginBottom: 0 }}>Security</Header>
                <p style={{ fontSize: '1.33em' }}>
                {' '}We value your trust in providing us your personal information,
                thus we are striving to use commercially acceptable means of
                protecting it. But remember that no method of transmission over the
                internet, or method of electronic storage is 100% secure and reliable,
                and we cannot guarantee its absolute security.
                </p>
                <p style={{ fontSize: '1.33em' }}>
                {' '}All data is transferred securely to the server side by using SSL.
                </p>
                <Header as='h3' style={{ marginBottom: 0 }}>Changes to This Privacy Policy</Header>
                <p style={{ fontSize: '1.33em' }}>
                {' '}We may update our privacy policy from time to time. Thus, you are
                advised to review this page periodically for any changes. We will notify
                you of any changes by posting the new privacy policy on this page.
                These changes are effective immediately after they are posted on this page.
                </p>
                <Header as='h3' style={{ marginBottom: 0 }}>Contact Us</Header>
                <p style={{ fontSize: '1.33em' }}>
                {' '}If you have any questions or suggestions about our privacy policy,
                do not hesitate to contact us.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>


        <a name="feedback" />
        <Container style={{ padding: '8em 0em' }} vertical>
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
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps)(Start);
