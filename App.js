import React from 'react'
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from './src/screens/HomeScreen'
import ArticleDetailsScreen from './src/screens/ArticleDetailsScreen'
import NewArticleScreen from './src/screens/NewArticleScreen'
import LoginScreen from './src/screens/LoginScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import SettingsScreen from './src/screens/SettingsScreen'

const RootStack = createStackNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        ArticleDetails: {
            screen: ArticleDetailsScreen
        },
        NewArticle: {
            screen: NewArticleScreen
        },
        Login: {
            screen: LoginScreen
        },
        SignUp: {
            screen: SignUpScreen
        },
        Settings: {
            screen: SettingsScreen
        }
    },
    {
        initialRouteName: 'Home',
    }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
