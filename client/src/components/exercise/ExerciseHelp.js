import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import NavigationActions from 'react-navigation';

class ExerciseHelp extends React.Component {
  constructor(props) {
    super(props);
  }
  renderDescription() {
    if (!this.props.description.description) {
      return null;
    }

    return this.props.description.description.split('|').map((string, index) =>
      <View style={styles.descrList} key={`description${index}`}>
        <Text style={{ color: '#505050', fontWeight: 'bold' }}>
          {index + 1}:{' '}
        </Text>
        <Text style={{color: '#505050'}}>
          {string}
        </Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.background}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {this.props.description.name}
          </Text>
        </View>
        <View style={styles.body}>
          <View style={styles.menu}>
            <Text style={styles.chosenTabTitle}>INSTRUCTIONS</Text>
          </View>
          <ScrollView>
            <View>
              {this.renderDescription()}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
const mapStateToProps = ({ app }) => {
  return { description: app.exerciseHelp };
};

export default connect(mapStateToProps, {})(ExerciseHelp);

const styles = StyleSheet.create({
  background: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999
  },
  header: {
    backgroundColor: '#51C1AB',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  title: {
    marginTop: 10,
    color: '#fff',
    fontSize: 32,
    textAlign: 'center'
  },
  body: {
    paddingTop: 15,
    backgroundColor: '#fff',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    padding: 10
  },
  video: {
    width: 250,
    height: 250,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5
  },
  chosenTabTitle: {
    color: '#6669CB',
    fontSize: 22,
    marginLeft: 5,
    marginBottom: 20
  },
  descrList: {
    marginLeft: 5,
    marginBottom: 4
  }
});
