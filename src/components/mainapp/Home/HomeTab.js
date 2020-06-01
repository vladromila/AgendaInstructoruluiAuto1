import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeMainPage from './HomeMainPage';
import ClassCreate from './ClassActionsComponents/ClassCreate';
import ExamCreate from './ExamActionsComponents/ExamCreate';
import ClassEdit from './ClassActionsComponents/ClassEdit';
import ExamEdit from './ExamActionsComponents/ExamEdit';

const HomeTabComponent = createStackNavigator({
    HomeMainPage: {
        screen: HomeMainPage
    },
    ClassCreate: {
        screen: ClassCreate
    },
    ExamCreate: {
        screen: ExamCreate
    },
    ClassEdit: {
        screen: ClassEdit
    },
    ExamEdit: {
        screen: ExamEdit
    }
}, {
    initialRouteName: 'HomeMainPage'
})
const HomeTab = createAppContainer(HomeTabComponent);
export default HomeTab;