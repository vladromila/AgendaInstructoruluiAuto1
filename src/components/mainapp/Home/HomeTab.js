import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeMainPage from './HomeMainPage';

const HomeTabComponent = createStackNavigator({
    HomeMainPage: {
        screen: HomeMainPage
    }
}, {
        initialRouteName: 'HomeMainPage'
    })
const HomeTab = createAppContainer(HomeTabComponent);
export default HomeTab;
