import { TabNavigator } from 'react-navigation';
//import LoginMain from '../components/login/LoginMain';
import Workout from '../components/Dashboard/Workout.js';
import WorkoutList from '../components/TempDashboard/WorkoutList';
import LoginUser from '../components/login/existing/LoginUser';
import CreateAccount from '../components/login/create/CreateAccount';

const AppRouteConfigs = {
  LoginUser: {
    screen: LoginUser,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  CreateAccount: {
    screen: CreateAccount,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  Workout: {
    screen: Workout,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  WorkoutList: {
    screen: WorkoutList,
    navigationOptions: {
      tabBarVisible: false
    }
  }
};

export default (AppNavigator = TabNavigator(AppRouteConfigs));
