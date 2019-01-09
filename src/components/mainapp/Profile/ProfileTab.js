import { View, Text, Platform } from 'react-native';
import React from 'react';
import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation'
import ProfileMainPageTab from './ProfileMainPageTab';
import VehicleDocumentsTab from './VehicleDocumentsTab';
import PersonalDocuments from './PersonalDocuments';

const ProfileTopBar = createAppContainer(
    createMaterialTopTabNavigator({
        ProfileMainPage: {
            screen: ProfileMainPageTab
        },
        PersonalDocuments: {
            screen: PersonalDocuments
        },
        VehicleDocumentsTab: {
            screen: VehicleDocumentsTab
        }
    },
        {
            tabBarPosition: 'bottom',
            animationEnabled: false,
            swipeEnabled: false,
            tabBarOptions: {
                style: {
                    ...Platform.select({
                        android: {
                            backgroundColor: '#1E6EC7'
                        }
                    })
                },
                indicatorStyle: {
                    backgroundColor: 'white'
                },
                activeTintColor: 'white',
                inactiveTintColor: '#d1cece',
                pressColor: 'white',
                showLabel: true,
                showIcon: false,

            }
        })
)

export default ProfileTopBar;