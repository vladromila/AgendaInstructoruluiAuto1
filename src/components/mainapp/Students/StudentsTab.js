import { createStackNavigator, createAppContainer } from 'react-navigation'
import StudentsMainPageTab from './StudentsMainPageTab';
import StudentsCreate from './StudentsCreate';
import StudentsEdit from './StudentsEdit';
import StudentProfile from './StudentProfile';
import StudentFinishedClasses from './StundentFinishedClasses';
import StudentCanceledClasses from './StudentCanceledClasses/StudentCanceledClasses';

const StudentsTabComponent = createStackNavigator({
    StudentsMainPage: {
        screen: StudentsMainPageTab
    },
    StudentCreate: {
        screen: StudentsCreate
    },
    StudentEdit: {
        screen: StudentsEdit
    },
    StudentProfile: {
        screen: StudentProfile
    },
    StudentFinishedClasses: {
        screen: StudentFinishedClasses
    },
    StudentCanceledClasses:{
        screen:StudentCanceledClasses
    }
}, {
        initialRouteName: 'StudentsMainPage'
    })
const StudentsTab = createAppContainer(StudentsTabComponent);

export default StudentsTab;