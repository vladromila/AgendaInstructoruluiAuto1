import { View, Text, Platform } from 'react-native';
import React from 'react';
import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation'
import ProfileMainPage from './ProfileMainPage';
import { Header, Icon } from 'react-native-elements';
import VehicleDocumentsTab from './VehicleDocumentsTab';
import Gradient from 'react-native-css-gradient';
import PersonalDocuments from './PersonalDocuments';

const ProfileTopBarRN = createAppContainer(
    createMaterialTopTabNavigator({
        ProfileMainPage: {
            screen: ProfileMainPage
        },
        PersonalDocuments: {
            screen: PersonalDocuments
        },
        VehicleDocumentsTab: {
            screen: VehicleDocumentsTab
        }
    },
        {
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

class ProfileTopBar extends React.Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <View style={{ flex: 1, zIndex: 99 }}>
                <Gradient gradient={`linear-gradient(0deg ,white 0%,#1E6EC7 100% )`} style={{ width: '100%', height: '100%', zIndex: -1, position: 'absolute' }} >
                    <Header
                        leftComponent={<Icon name="people" size={30} color="white" onPress={() => {
                            this.props.navigation.navigate('FinishedStudentsList');
                        }} />}
                        rightComponent={<Icon name="perm-contact-calendar" size={30} color="white" onPress={() => {
                            this.props.navigation.navigate('RStudentsList');
                        }} />}
                        innerContainerStyles={{ backgroundColor: '#1E6EC7' }}
                        outerContainerStyles={{ borderBottomColor: 'black', backgroundColor: '#1E6EC7', borderBottomWidth: 1 }}
                        centerComponent={<Text style={{ fontSize: 22, fontWeight: '900' }}>Profil</Text>}
                    />
                    <ProfileTopBarRN />
                </Gradient>
            </View>
        )
    }
}
export default ProfileTopBar;