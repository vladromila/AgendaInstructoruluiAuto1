import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import {Platform} from 'react-native';
import LoginPage from './AuthenticationTab/LoginPage';
import SignUpPage from './AuthenticationTab/SignUpPage';
const AuthenticationTabComponent = createMaterialTopTabNavigator({

    LoginTab: {
        screen: LoginPage
    },
    SighUpTab: {
        screen: SignUpPage
    }
}, {
        animationEnabled: true,
        swipeEnabled: true,
        tabBarPosition: "bottom",
        tabBarOptions: {
            style: {
                ...Platform.select({
                    android: {
                        backgroundColor: 'white'
                    }
                })
            },
            indicatorStyle: {
                backgroundColor: '#1E6EC7'
            },
            activeTintColor: '#1E6EC7',
            inactiveTintColor: '#d1cece',
            pressColor: '#1E6EC7',
            showLabel: false,
            showIcon: true,

        }
    })
const AuthenticationTab = createAppContainer(AuthenticationTabComponent);
export default AuthenticationTab;