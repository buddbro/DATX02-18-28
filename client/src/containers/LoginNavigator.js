import { TabNavigator } from 'react-navigation';
import CreateAccount from '../components/login/create/CreateAccount';
import LoginUser from '../components/login/existing/LoginUser';
import Workout from '../components/Dashboard/Workout';

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
  }
};

export default (LoginNavigator = TabNavigator(AppRouteConfigs));
