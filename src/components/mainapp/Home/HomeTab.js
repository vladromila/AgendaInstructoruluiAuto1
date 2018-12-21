import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeMainPage from './HomeMainPage';
import ClassCreate from './ClassActionsComponents/ClassCreate';

const HomeTabComponent = createStackNavigator({
    HomeMainPage: {
        screen: HomeMainPage
    },
    ClassCreate:{
        screen:ClassCreate
    }
}, {
        initialRouteName: 'HomeMainPage'
    })
const HomeTab = createAppContainer(HomeTabComponent);
export default HomeTab;
