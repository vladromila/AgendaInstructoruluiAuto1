import { createStackNavigator, createAppContainer } from 'react-navigation';
import ProfileTopBar from './ProfileTopBar';
import FinishedStudentsList from './FinishedStudentsList';
import RStudentsList from './RStudentsList';

const ProfileTabComponent = createStackNavigator({
    ProfileMainPage: {
        screen: ProfileTopBar
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