import React from 'react';
import { Segment, Container, Grid, Header, List } from 'semantic-ui-react';

class Footer extends React.Component {
  render() {
    return (
      <Segment inverted vertical style={{ padding: '5em 0em' }}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={6}>
                <Header inverted as="h4" content="&reg; 2018 PushApp" />
              </Grid.Column>
              <Grid.Column width={7}>
                <Header as="h4" inverted>
                  Quotes to live by
                </Header>
                <p>
                  “Everybody wants to be a bodybuilder, but nobody wants to lift no heavy-ass weights.”
                  ― Ronnie Coleman
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    );
  }
}

export default Footer;
