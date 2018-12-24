import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation'
import StudentsMainPage from './StudentsMainTab/StudentsMainPage';
import InStudentsMainPage from './StudentsMainTab/InStudentsMainPage';

const StudentsMainPageTab = createAppContainer(
    createMaterialTopTabNavigator({
        StudentsMainPage: {
            screen: StudentsMainPage
        },
        InStudentsMainPage: {
            screen: InStudentsMainPage
        }
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
        })
)
StudentsMainPageTab.navigationOptions={
    header:null
}
export default StudentsMainPageTab;

