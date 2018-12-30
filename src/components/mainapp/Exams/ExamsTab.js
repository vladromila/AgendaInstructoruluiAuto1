import { createStackNavigator, createAppContainer } from 'react-navigation'
import ExamsMainPage from './ExamMainPage';
import ExamEdit from '../Home/ExamActionsComponents/ExamEdit'

const ExamsTabComponent = createStackNavigator({
    ExamsMainPage: {
        screen: ExamsMainPage
    },
    ExamEdit: {
        screen: ExamEdit
    }
}, {
        initialRouteName: 'ExamsMainPage'
    })
const ExamsTab = createAppContainer(ExamsTabComponent);
export default ExamsTab;
