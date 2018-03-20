import {
  TabNavigator,
  DrawerNavigator,
  StackNavigator,
  Image
} from 'react-navigation';

import { Text } from 'react-native';

import React from 'react';

import CustomDrawerNavigation from '../components/navigation/CustomDrawerNavigation';

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
    History: { screen: WorkoutHistory },
    Schedule: { screen: WorkoutSchedules },
    Achievements: { screen: Achievements },
    Settings: { screen: Settings }
  },
  {
    drawerBackgroundColor: '#E2FBF6',
    contentOptions: {
      activeTintColor: '#7ED1C1',
      labelStyle: { fontSize: 26, fontWeight: '200' }
    },
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
    headerMode: 'none',
    initialRouteName: 'LoginStack',
    tabBarVisible: false,
    swipeEnabled: false,
    animationEnabled: false
  }
));
