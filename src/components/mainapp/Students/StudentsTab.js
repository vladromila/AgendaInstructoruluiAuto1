import { createStackNavigator, createAppContainer } from 'react-navigation'
import StudentsMainPage from './StudentsMainPage';
import StudentCreate from './StudentCreate';

const StudentsTabComponent = createStackNavigator({
    StudentsMainPage: {
        screen: StudentsMainPage
    },
    StudentCreate: {
        screen: StudentCreate
    }
}, {
        initialRouteName: 'StudentsMainPage'
    })
const StudentsTab = createAppContainer(StudentsTabComponent);

export default StudentsTab;