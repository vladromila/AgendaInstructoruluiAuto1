import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'
import StudentFinishedNClasses from './StudentFinishedClasses/StundentFinishedNClasses';
import StudentFinishedEClasses from './StudentFinishedClasses/StudentFinishedEClasses';
import StundentProgrammedClasses from './StudentFinishedClasses/StundentProgrammedClasses';

const StudentFinishedClasses = createAppContainer(createMaterialTopTabNavigator({
    StundetProgrammedClasses: {
        screen: StundentProgrammedClasses
    },
    StudentFinishedNClassesTab: {
        screen: StudentFinishedNClasses
    },
    StudentFinishedEClassesTab: {
        screen: StudentFinishedEClasses
    },
},
    {
        animationEnabled: false,
        swipeEnabled: false,
        tabBarPosition: "bottom",
        tabBarOptions: {
            style: {
                backgroundColor: 'white'
            },
            indicatorStyle: {
                backgroundColor: '#1E6EC7'
            },
            activeTintColor: '#1E6EC7',
            inactiveTintColor: '#d1cece',
            showLabel: true,
            showIcon: false,
            labelStyle: {
                color: '#1E6EC7',
                fontWeight: 'bold'
            },
            pressColor: '#1E6EC7'
        }
    }))
StudentFinishedClasses.navigationOptions = ({ navigation }) => {
    return {
        headerStyle: {
            backgroundColor: '#1E6EC7'
        },
        title: `Ore Completate: ${navigation.state.params.nume}`,
        headerTitleStyle: {
            color: 'white'
        }
    }
}
export default StudentFinishedClasses;