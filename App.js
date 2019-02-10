import React from 'react'
import { Provider } from 'react-redux'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/lib/integration/react'
import thunk from 'redux-thunk'
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import HomeScreen from './src/screens/HomeScreen'
import ArticleDetailsScreen from './src/screens/ArticleDetailsScreen'
import NewArticleScreen from './src/screens/NewArticleScreen'
import LoginScreen from './src/screens/LoginScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import SettingsScreen from './src/screens/SettingsScreen'
import AppReducer from './src/redux/store'

const persistentStoreBlacklist = []

const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: persistentStoreBlacklist,
    stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, AppReducer)

const getMiddleware = () => {
    if (__DEV__) {
        return applyMiddleware(thunk, createLogger())
    } else {
        // Enable additional logging in non-production environments.
        return applyMiddleware(thunk)
    }
};

const store = createStore(
    persistedReducer,
    composeWithDevTools(getMiddleware())
)

const persistor = persistStore(store)

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
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <AppContainer/>
                </PersistGate>
            </Provider>
        )
    }
}
