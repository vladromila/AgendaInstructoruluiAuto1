import { createStackNavigator, createAppContainer } from 'react-navigation'
import ExamsMainPage from './ExamMainPage';

const ExamsTabComponent = createStackNavigator({
    ExamsMainPage: {
        screen: ExamsMainPage
    },
}, {
        initialRouteName: 'ExamsMainPage'
    })
const ExamsTab = createAppContainer(ExamsTabComponent);
export default ExamsTab;
