import { StackNavigator } from 'react-navigation';
import Main from '../components/Main';
import LoginMain from '../components/login/LoginMain';
import Workout from '../components/Dashboard/Workout.js';
import WorkoutList from '../components/TempDashboard/WorkoutList.js';

const AppRouteConfigs = {
  Main: {
    screen: Main,
    navigationOptions: {
      header: null
    }
  },
  LoginMain: {
    screen: LoginMain,
    navigationOptions: {
      header: null
    }
  },
  Workout: {
    screen: Workout,
    navigationOptions: {
      header: null
    }
  },
  WorkoutList: {
    screen: WorkoutList,
    navigationOptions: {
      header: null
    }
  }
};

export default (AppNavigator = StackNavigator(AppRouteConfigs));
