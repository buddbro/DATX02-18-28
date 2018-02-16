import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  List,
  FlatList,
  ListItem,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import NavigationActions from 'react-navigation';
import { connect } from 'react-redux';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.title
    });
  }

  render(){
    return(
      <View>
        <Text>hej</Text>
      </View>
    );
  }
}

const mapStateToProps = ({ }) => {
  return {

  };
};

export default connect (mapStateToProps)(Settings);
