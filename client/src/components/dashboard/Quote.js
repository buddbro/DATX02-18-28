import React from 'react';
import { View, Text } from 'react-redux';
import { getQuote } from '../../actions';

class Quote extends React.Component {
  render() {
    return (
      <View>
        <Text>Quote :D</Text>
      </View>
    );
  }
}

export default connect;
