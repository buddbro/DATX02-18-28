import {
  TabNavigator,
  DrawerNavigator,
  StackNavigator
} from 'react-navigation';

import { Text } from 'react-native';

import React from 'react';

import Dashboard from '../components/dashboard/Dashboard';

import WorkoutSchedules from '../components/schedule/WorkoutSchedules';

import WorkoutHistory from '../components/workout/WorkoutHistory';
import ViewWorkout from '../components/workout/ViewWorkout';
import ViewExercise from '../components/exercise/ViewExercise';

import Achievements from '../components/achievements/Achievements';

import LoginUser from '../components/login/existing/LoginUser';
import ForgotPassword from '../components/login/existing/ForgotPassword';
import CreateAccount from '../components/login/create/CreateAccount';

import ExerciseList from '../components/exercise/ExerciseList';
import ExerciseHelp from '../components/exercise/ExerciseHelp';

import Settings from '../components/dashboard/Settings';

const DrawerStack = DrawerNavigator(
  {
    Dashboard: {
      screen: Dashboard
    },
    WorkoutHistory: { screen: WorkoutHistory },
    WorkoutSchedule: { screen: WorkoutSchedules },
    Achievements: { screen: Achievements },
    Settings: { screen: Settings }
  },
  {
    navigationOptions: {
      tabBarVisible: false
    }
  }
);

const MiscStack = TabNavigator(
  {
    ExerciseHelp: {
      screen: ExerciseHelp
    },
    ViewWorkout: {
      screen: ViewWorkout
    },
    ViewExercise: {
      screen: ViewExercise
    },
    ExerciseList: {
      screen: ExerciseList
    }
  },
  {
    navigationOptions: {
      tabBarVisible: false
    }
  }
);

const DrawerNavigation = TabNavigator(
  {
    DrawerStack: { screen: DrawerStack }
  },
  {
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: 'green' },
      tabBarVisible: false,
      headerLeft: (
        <Text onPress={() => navigation.navigate('DrawerOpen')}>Menu</Text>
      )
    })
  }
);

// login stack
const LoginStack = TabNavigator(
  {
    LoginUser: { screen: LoginUser },
    CreateAccount: { screen: CreateAccount },
    ForgotPassword: { screen: ForgotPassword }
  },
  {
    navigationOptions: {
      tabBarVisible: false
    }
  }
);

export default (AppNavigator = TabNavigator(
  {
    LoginStack: { screen: LoginStack },
    DrawerStack: { screen: DrawerNavigation },
    MiscStack: { screen: MiscStack }
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LoginStack',
    tabBarVisible: false
  }
));
