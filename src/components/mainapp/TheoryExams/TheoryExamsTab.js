import { createStackNavigator, createAppContainer } from 'react-navigation'
import TheoryExamsMainPage from './TheoryExamsMainPage';
import TheoryExamEdit from '../Home/TheoryExamActionsComponents/TheoryExamEdit';

const TheoryExamsTabComponent = createStackNavigator({
    TheoryExamsMainPage: {
        screen: TheoryExamsMainPage
    },
    TheoryExamEdit: {
        screen: TheoryExamEdit
    }
}, {
    initialRouteName: 'TheoryExamsMainPage'
})
const TheoryExamsTab = createAppContainer(TheoryExamsTabComponent);
export default TheoryExamsTab;
