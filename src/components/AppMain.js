import React from 'react';
import { View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainTab from './mainapp/MainTab';
import AuthenticationTab from './auth/AuthenticationTab';
import SplashScreen from './splashscreen/SplashScreen';

const AppComponent = createSwitchNavigator({
    Main: {
        screen: MainTab
    },
    Authentication: {
        screen: AuthenticationTab
    },
    SplashScreen: {
        screen: SplashScreen
    }
},
    {
        initialRouteName: 'SplashScreen'
    }
)
const App = createAppContainer(AppComponent)
export default App;