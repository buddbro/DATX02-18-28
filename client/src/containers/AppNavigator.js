import { StackNavigator } from 'react-navigation';
import LoginMain from '../components/login/LoginMain';
import Workout from '../components/Dashboard/Workout.js';
import WorkoutList from '../components/TempDashboard/WorkoutList.js';
import LoginUser from '../components/login/existing/LoginUser';
import CreateAccount from '../components/login/create/CreateAccount';

const AppRouteConfigs = {
  LoginUser: {
    screen: LoginUser,
    navigationOptions: {
      header: null
    }
  },
  CreateAccount: {
    screen: CreateAccount,
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
