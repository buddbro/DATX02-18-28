import { TabNavigator } from 'react-navigation';
import Workout from '../components/dashboard/Workout';
import ViewWorkout from '../components/dashboard/ViewWorkout';
import NewWorkout from '../components/dashboard/NewWorkout';

import LoginUser from '../components/login/existing/LoginUser';
import CreateAccount from '../components/login/create/CreateAccount';

import ExerciseList from '../components/dashboard/exercise/ExerciseList';

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
  ViewWorkout: {
    screen: ViewWorkout,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  NewWorkout: {
    screen: NewWorkout,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  ExerciseList: {
    screen: ExerciseList,
    navigationOptions: {
      tabBarVisible: false
    }
  }
};

export default (AppNavigator = TabNavigator(AppRouteConfigs));
