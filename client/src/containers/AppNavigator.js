import { TabNavigator } from 'react-navigation';

import Dashboard from '../components/dashboard/Dashboard';

import WorkoutSchedules from '../components/schedule/WorkoutSchedules';

import WorkoutHistory from '../components/workout/WorkoutHistory';
import ViewWorkout from '../components/workout/ViewWorkout';
import ViewExercise from '../components/exercise/ViewExercise';

import Achievements from '../components/achievements/Achievements';

import LoginUser from '../components/login/existing/LoginUser';
import ForgotPassword from '../components/login/existing/ForgotPassword';
import CreateAccount from '../components/login/create/CreateAccount';

import ExerciseListForSchedule from '../components/schedule/ExerciseListForSchedule';

import ExerciseList from '../components/exercise/ExerciseList';
import ExerciseHelp from '../components/exercise/ExerciseHelp';

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
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  Achievements: {
    screen: Achievements,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  WorkoutSchedules: {
    screen: WorkoutSchedules,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  WorkoutHistory: {
    screen: WorkoutHistory,
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
  ExerciseListForSchedule: {
    screen: ExerciseListForSchedule,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  ExerciseHelp: {
    screen: ExerciseHelp,
    navigationOptions: {
      tabBarVisible: false
    }
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      tabBarVisible: false
    }
  }
};

export default (AppNavigator = TabNavigator(AppRouteConfigs, {
  swipeEnabled: false,
  animationEnabled: false
}));
