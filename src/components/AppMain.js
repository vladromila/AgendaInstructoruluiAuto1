import React from 'react';
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createSwitchNavigator, FadeTransition, withTransition, withFadeTransition } from 'react-navigation-switch-transitioner'
import MainTab from './mainapp/MainTab';
import AuthenticationTab from './auth/AuthenticationTab';
import SplashScreen from './splashscreen/SplashScreen';

const AppComponent = createSwitchNavigator({
    Main: {
        screen: withFadeTransition(MainTab)
    },
    Authentication: {
        screen: withFadeTransition(AuthenticationTab)
    },
    SplashScreen: {
        screen: withFadeTransition(SplashScreen)
    }
},
    {
        initialRouteName: 'SplashScreen'
    }
)
const App = createAppContainer(AppComponent)
export default App;