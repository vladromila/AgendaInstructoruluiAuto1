import { createStackNavigator, createAppContainer } from 'react-navigation';
import ProfileMainPage from './ProfileMainPage';
import FinishedStudentsList from './FinishedStudentsList';
import RStudentsList from './RStudentsList';

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
const ProfileTab = createAppContainer(ProfileTabComponent);
export default ProfileTab;