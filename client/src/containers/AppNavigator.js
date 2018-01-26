import { StackNavigator } from 'react-navigation';
import Main from '../components/Main';
import LoginMain from '../components/login/LoginMain';

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
  }
};

export default (AppNavigator = StackNavigator(AppRouteConfigs));
