import { createStackNavigator, createAppContainer } from 'react-navigation'
import StudentsMainPage from './StudentsMainPage';

const StudentsTabComponent = createStackNavigator({
    StudentsMainPage: {
        screen: StudentsMainPage
    }
}, {
        initialRouteName: 'StudentsMainPage'
    })
const StudentsTab = createAppContainer(StudentsTabComponent);

export default StudentsTab;