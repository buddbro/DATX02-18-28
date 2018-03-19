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

  translateDifficulty() {
    if (this.props.latestWorkout.difficulty == 1) {
      return (
        <AnimatedCircularProgress
          size={60}
          width={15}
          fill={20}
          tintColor="#94F5E2"
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="#3d5875"
        />
      );
    } else if (this.props.latestWorkout.difficulty == 2) {
      return (
        <AnimatedCircularProgress
          size={60}
          width={15}
          fill={40}
          tintColor="#00EFC0"
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="#3d5875"
        />
      );
    } else if (this.props.latestWorkout.difficulty == 3) {
      return (
        <AnimatedCircularProgress
          size={60}
          width={15}
          fill={60}
          tintColor="#51C1AB"
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="#3d5875"
        />
      );
    } else if (this.props.latestWorkout.difficulty == 4) {
      return (
        <AnimatedCircularProgress
          size={60}
          width={15}
          fill={80}
          tintColor="#FFE319"
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="#3d5875"
        />
      );
    } else if (this.props.latestWorkout.difficulty == 5) {
      return (
        <AnimatedCircularProgress
          size={60}
          width={15}
          fill={100}
          tintColor="#FF5858"
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="#3d5875"
        />
      );
    }
  }

  convertTimeStamp() {
    if (!this.props.latestWorkout.stop || !this.props.latestWorkout.start) {
      return null;
    }
    var hours =
      parseInt(this.props.latestWorkout.stop.slice(0, 2)) -
      parseInt(this.props.latestWorkout.start.slice(0, 2));
    var minutes =
      parseInt(this.props.latestWorkout.stop.slice(3, 5)) -
      parseInt(this.props.latestWorkout.start.slice(3, 5));
    return hours * 60 + minutes;
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.latestWorkout &&
      nextProps.latestWorkout.id >= 0 &&
      this.state.loading
    ) {
      this.props.chooseWorkout(nextProps.latestWorkout.id);
      this.setState({ loading: false });
    }
  }

  render() {
    if (!this.props.latestWorkout) {
      return null;
    } else {
      return (
        <TouchableOpacity
          style={styles.accordionBody}
          onPress={() => {
            this.props.chooseWorkout(this.props.latestWorkout.id);
            this.props.navigation.dispatch(
              NavigationActions.NavigationActions.navigate({
                routeName: 'ViewWorkout'
              })
            );
          }}
        >
          <View style={styles.workoutHeader}>
            <Text style={styles.workoutTitle}>
              {this.props.latestWorkout.title}
            </Text>
            <Text style={styles.tinder}>
              {this.props.latestWorkout.date.substring(0, 10)}
            </Text>
          </View>
          <View style={styles.rectangleParent}>
            <View style={styles.rectangle}>
              <Image
                source={require('../../../assets/time.png')}
                style={styles.icons}
              />
              <View style={styles.innerRectangle}>
                <Text style={styles.timeStamp}>
                  {this.convertTimeStamp()}
                </Text>
                <Text style={styles.smallText}>minutes</Text>
              </View>
            </View>
            <View style={styles.rectangle}>
              <Image
                source={require('../../../assets/flash.png')}
                style={styles.iconsSpecial}
              />
              {this.translateDifficulty()}
            </View>
          </View>

          <View style={styles.difficultyStyle}>
            <Categories workoutId={this.props.latestWorkout.id} />
          </View>
          <Text style={styles.continueText}>Press to continue workout</Text>
        </TouchableOpacity>
      );
    }
  }
}
const mapStateToProps = ({ workout }) => {
  const latestWorkout = workout.workouts[0];
  const { exercises } = workout;
  return {
    latestWorkout,
    exercises
  };
};

export default connect(mapStateToProps, { chooseWorkout })(LatestWorkout);

const styles = StyleSheet.create({
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
    backgroundColor: '#98E0D2',
    paddingBottom: 5,
    paddingTop: 5
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
