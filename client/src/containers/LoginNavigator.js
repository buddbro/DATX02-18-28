import { TabNavigator } from 'react-navigation';
import CreateAccount from '../components/login/create/CreateAccount';
import LoginUser from '../components/login/existing/LoginUser';

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
  }
};

export default (LoginNavigator = TabNavigator(AppRouteConfigs));
