import { createStackNavigator, createAppContainer } from 'react-navigation';
import ProfileMainPage from './ProfileMainPage';

const ProfileTabComponent = createStackNavigator({
    ProfileMainPage: {
        screen: ProfileMainPage
    }
}, {
        initialRouteName: 'ProfileMainPage'
    })
const ProfileTab = createAppContainer(ProfileTabComponent);
export default ProfileTab;