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

    return this.props.description.description
      .split('|')
      .map((string, index) => (
        <View style={styles.descrList} key={`description${index}`}>
          <Text style={{ fontWeight: 'bold' }}>{index + 1}: </Text>
          <Text>{string}</Text>
        </View>
      ));
  }
  render() {
    return (
      <View style={styles.background}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.dispatch(
                NavigationActions.NavigationActions.navigate({
                  routeName: 'ViewExercise'
                })
              );
            }}
          >
            <Image
              source={require('../../../assets/back_arrow.png')}
              style={{
                width: 35,
                height: 35,
                marginTop: 10,
                marginLeft: 5
              }}
            />
          </TouchableOpacity>
          <View style={styles.headertop}>
            <Text style={styles.title}>{this.props.description.name}</Text>
          </View>
          {/*<View style={styles.headerMenu}>
              <Text>Tips</Text>
              <Text>Personal Records</Text></View>*/}
        </View>
        <View style={styles.body}>
          {/*<View style={styles.video}>
              <Text>Insert Video here pls</Text>
            </View>*/}
          <View style={styles.menu}>
            <Text style={styles.chosenTabTitle}>INSTRUCTIONS</Text>
          </View>
          <ScrollView>
            <View>{this.renderDescription()}</View>
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
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    zIndex: -999
  },
  header: {
    backgroundColor: '#51C1AB',
    height: 100,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20
  },
  headertop: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  backarrow: {
    color: '#fff',
    marginLeft: 5
  },
  title: {
    marginTop: 10,
    color: '#fff',
    //fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginLeft: '25%'
  },
  headerMenu: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  body: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    flex: 4,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 5,
    marginRight: 5
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
