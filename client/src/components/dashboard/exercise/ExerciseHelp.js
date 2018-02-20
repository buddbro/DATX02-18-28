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
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{this.props.description.name}</Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.dispatch(
                  NavigationActions.NavigationActions.navigate({
                    routeName: 'ViewExercise'
                  })
                );
              }}>
              <Text>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <Text>{this.props.description.description}</Text>
          </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    height: '100%',
    zIndex: -999,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 3,
    marginTop: '25%',
    marginBottom: '25%',
    marginRight: '10%',
    marginLeft: '10%',
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  body: {
    flex: 4,
    flexDirection: 'column',
  },
});
