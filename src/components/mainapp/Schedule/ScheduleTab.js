import { createStackNavigator, createAppContainer } from 'react-navigation';
import ScheduleMainPage from './ScheduleMainPage';
const ScheduleTabComponent = createStackNavigator({
    ScheduleMainPage: {
        screen: ScheduleMainPage
    }
}, {
        initialRouteName: 'ScheduleMainPage'
    })

const ScheduleTab = createAppContainer(ScheduleTabComponent);
export default ScheduleTab;