import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeMainPage from './HomeMainPage';
import ClassCreate from './ClassActionsComponents/ClassCreate';
import ExamCreate from './ExamActionsComponents/ExamCreate';
import ClassEdit from './ClassActionsComponents/ClassEdit';
import ExamEdit from './ExamActionsComponents/ExamEdit';
import TheoryExamCreate from './TheoryExamActionsComponents/TheoryExamCreate';
import TheoryExamEdit from './TheoryExamActionsComponents/TheoryExamEdit';

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
    },
    TheoryExamCreate: {
        screen: TheoryExamCreate
    },
    TheoryExamEdit: {
        screen: TheoryExamEdit
    },
}, {
    initialRouteName: 'HomeMainPage'
})
const HomeTab = createAppContainer(HomeTabComponent);
export default HomeTab;