import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';
import ExerciseCard from '../exercise/ExerciseCard';
import { connect } from 'react-redux';
import NavigationActions from 'react-navigation';
import { chooseWorkout } from '../../actions';
import Categories from './Categories';
import RatingWrapper from '../utilities/RatingWrapper';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

class LatestWorkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = { toggled: false, loading: true };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.workout && nextProps.workout.id >= 0 && this.state.loading) {
      this.props.chooseWorkout(nextProps.workout.id);
      this.setState({ loading: false });
    }
  }

  convertTimeStamp() {
    if (!this.props.workout.stop || !this.props.workout.start) {
      return null;
    }

    const start = new Date(`2000-01-01T${this.props.workout.start}:00`);
    const stop = new Date(`2000-01-01T${this.props.workout.stop}:00`);

    return (stop.getTime() - start.getTime()) / 1000 / 60;
  }

  renderTime() {
    const duration = this.convertTimeStamp();

    if (duration) {
      return (
        <View style={styles.rectangle}>
          <Image
            source={require('../../../assets/time.png')}
            style={styles.icons}
          />
          <View style={styles.innerRectangle}>
            <Text style={styles.timeStamp}>{duration}</Text>
            <Text style={styles.smallText}>minutes</Text>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.rectangle}>
        <Text style={styles.timeStamp}>In progress...</Text>
      </View>
    );
  }

  renderDifficulty() {
    const tintColors = ['#94F5E2', '#00EFC0', '#51C1AB', '#FFE319', '#FF5858'];

    return (
      <AnimatedCircularProgress
        size={60}
        width={15}
        fill={this.props.workout.difficulty * 20}
        tintColor={tintColors[this.props.workout.difficulty - 1]}
        backgroundColor="#3d5875"
      />
    );
  }

  render() {
    if (!this.props.workout) {
      return null;
    } else {
      return (
        <TouchableOpacity
          style={styles.accordionBody}
          onPress={() => {
            this.props.chooseWorkout(this.props.workout.id);
            this.props.navigation.dispatch(
              NavigationActions.NavigationActions.navigate({
                routeName: 'ViewWorkout'
              })
            );
          }}
        >
          <View style={styles.workoutOuter}>
            <View style={styles.workoutHeader}>
              <Text style={styles.workoutTitle}>
                {this.props.workout.title}
              </Text>
              <Text style={styles.tinder}>
                {this.props.workout.date.substring(0, 10)}
              </Text>
            </View>
            <Image
              source={require('../../../assets/arrow-right-green.png')}
              style={(styles.icons, { flex: 1, width: 20, height: 20 })}
            />
          </View>
          <View style={styles.rectangleParent}>
            {this.renderTime()}
            <View style={styles.rectangle}>
              <Image
                source={require('../../../assets/flash.png')}
                style={styles.iconsSpecial}
              />
              {this.renderDifficulty()}
            </View>
          </View>

          <View style={styles.rectangle}>
            <Categories workoutId={this.props.workout.id} />
          </View>
        </TouchableOpacity>
      );
    }
  }
}
const mapStateToProps = ({ workout }) => {
  const { exercises } = workout;
  return {
    exercises
  };
};

export default connect(mapStateToProps, { chooseWorkout })(LatestWorkout);

const styles = StyleSheet.create({
  workoutOuter: {
    backgroundColor: '#98E0D2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  innerRectangle: {
    flexDirection: 'column',
    marginLeft: 20
  },
  iconsSpecial: {
    width: 25,
    height: 25,
    zIndex: 999,
    marginRight: 10
  },
  icons: {
    marginLeft: -30,
    width: 25,
    height: 25
  },
  smallText: {
    fontSize: 12,
    fontWeight: '200',
    color: 'gray'
  },
  rectangleParent: {
    flexDirection: 'row',
    marginBottom: 15
  },
  rectangle: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#98e0d2',
    paddingTop: 10,
    paddingBottom: 10
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  timeStamp: {
    color: 'gray',
    fontSize: 24,
    fontWeight: '200',
    marginLeft: 5,
    marginRight: 5
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20
  },
  addWorkout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: '100%',
    borderWidth: 1,
    borderColor: '#b9baf1',
    backgroundColor: 'white'
  },
  menuItem: {
    color: '#b9baf1',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  container: {
    marginBottom: 10,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 80,
    borderRadius: 5
  },
  accordionBody: {
    flexDirection: 'column',
    width: '100%',
    borderColor: '#b9baf1',
    marginBottom: 20,
    backgroundColor: '#E2FBF6'
  },
  accordionTitle: {
    fontWeight: 'bold',
    fontSize: 42,
    color: 'white',
    textAlign: 'center'
  },
  workoutHeader: {
    paddingBottom: 5,
    paddingTop: 5,
    flex: 7,
    marginRight: -30
  },
  workoutTitle: {
    fontWeight: 'bold',
    fontSize: 36,
    textAlign: 'center',
    color: 'white'
  },
  tinder: {
    fontWeight: '200',
    textAlign: 'center',
    color: 'white',
    fontSize: 20
  },
  exercises: {
    padding: 5
  },
  continueButton: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    marginTop: 5,
    backgroundColor: '#53F2D3'
  },
  continueText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    fontWeight: '200',
    paddingBottom: 10
  },
  workoutTraitText: {
    fontSize: 18,
    color: 'gray'
  },
  difficultyStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20
  }
});
