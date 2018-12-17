import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform
} from "react-native";
import HomeTab from './Home/HomeTab';
import ScheduleTab from './Schedule/ScheduleTab';
import ExamsTab from './Exams/ExamsTab';
import StudentsTab from './Students/StudentsTab';
import ProfileTab from './Profile/ProfileTab';
import { createMaterialTopTabNavigator,createAppContainer} from 'react-navigation'
import {Icon} from 'native-base';

HomeTab.navigationOptions={
    tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-home" style={{ color: tintColor }} />
    )
}

const MainTabComponent = createMaterialTopTabNavigator({

    HomeTab: {
        screen: HomeTab
    },
    SchedulTab: {
        screen: ScheduleTab
    },
    ExamsTab: {
        screen: ExamsTab
    },
    StudentsTab: {
        screen: StudentsTab
    },
    ProfileTab: {
        screen: ProfileTab
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
            indicatorStyle:{
                backgroundColor:'#1E6EC7'
            },
            activeTintColor: '#1E6EC7',
            inactiveTintColor: '#d1cece',
            pressColor:'#1E6EC7',
            showLabel: false,
            showIcon: true,

        }
    })

const MainTab=createAppContainer(MainTabComponent);
export default MainTab;