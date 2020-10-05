import React, {Component} from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import ChatScreen from './screens/ChatScreen';
const AppStack = createStackNavigator({ Home:HomeScreen, Chat:ChatScreen});
const AuthStack = createStackNavigator({ Login:LoginScreen});

export default createAppContainer (createStackNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App:AppStack,
    Auth:AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
  ));
