import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import NavigationActions from 'react-navigation';

class ExerciseHelp extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return(
      <View style={styles.background}>
          <View style={styles.header}>
            <View style={styles.headertop}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.dispatch(
                    NavigationActions.NavigationActions.navigate({
                      routeName: 'ViewExercise'
                    })
                  );
                }}>
                <Text style={styles.backarrow}>Back</Text>
              </TouchableOpacity>
              <Text style={styles.title}>{this.props.description.name}</Text>
            </View>
            <View style={styles.menu}>
              <Text>Instructions</Text>
              <Text>Tips</Text>
              <Text>Personal Records</Text>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.video}>
              <Text>Insert Video here pls</Text>
            </View>
            <Text>{this.props.description.description}</Text>
          </View>
      </View>
    );
  }
}
const mapStateToProps = ({app}) => {
  return {description: app.exerciseHelp}
}

export default connect(mapStateToProps, {
})(ExerciseHelp);

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    zIndex: -999,
  },
  header: {
    marginTop: '6%',
    backgroundColor: '#18957C',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  headertop:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  backarrow: {
    color: '#fff',
    marginLeft: '10%',
  },
  title: {
    color: '#616A69',
    fontWeight: 'bold',
    fontSize: 24,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  body: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    flex: 4,
    justifyContent: 'space-around',
    alignItems: 'center'
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
});
