import { TabNavigator } from 'react-navigation';
import Workout from '../components/dashboard/Workout';
import ViewWorkout from '../components/dashboard/ViewWorkout';
import ViewExercise from '../components/dashboard/exercise/ViewExercise';
//import NewWorkout from '../components/dashboard/NewWorkout';

import LoginUser from '../components/login/existing/LoginUser';
import ForgotPassword from '../components/login/existing/ForgotPassword';
import CreateAccount from '../components/login/create/CreateAccount';

import ExerciseList from '../components/dashboard/exercise/ExerciseList';
import ExerciseHelp from '../components/dashboard/exercise/ExerciseHelp';


import Settings from '../components/dashboard/Settings';

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
  ViewExercise: {
    screen: ViewExercise,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  ExerciseList: {
    screen: ExerciseList,
    navigationOptions: {
      tabBarVisible: false
    }
  },
<<<<<<< HEAD
  Settings: {
    screen: Settings,
=======
  ExerciseHelp: {
    screen: ExerciseHelp,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  ForgotPassword: {
    screen: ForgotPassword,
>>>>>>> 221ebd3657b8ed2eb70fd64bd50624e638d22eb7
    navigationOptions: {
      tabBarVisible: false
    }
  }
};

export default (AppNavigator = TabNavigator(AppRouteConfigs));
