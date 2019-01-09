import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import FinishedStudentsList from './FinishedStudentsList';
import RStudentsList from './RStudentsList';
import ProfileMainPage from './ProfileMainPage';

const ProfileTabComponent = createStackNavigator({
    ProfileMainPage: {
        screen: ProfileMainPage
    },
    FinishedStudentsList: {
        screen: FinishedStudentsList
    },
    RStudentsList: {
        screen: RStudentsList
    }
}, {
        initialRouteName: 'ProfileMainPage'
    })
const ProfileTabRN = createAppContainer(ProfileTabComponent);

class ProfileTab extends React.Component {
    static navigationOptions = {
        header: null,
        title: "Promovab. Examene"
    }
    render() {
        return (
            <ProfileTabRN />
        )
    }
}
export default ProfileTab;