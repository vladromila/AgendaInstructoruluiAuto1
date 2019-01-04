import { createAppContainer, createStackNavigator } from 'react-navigation';
import ChatMainPage from './ChatMainPage';

const ChatTab = createAppContainer(
    createStackNavigator({
        ChatMainPage: {
            screen: ChatMainPage
        }
    },
        {
            initialRouteName: 'ChatMainPage'
        }
    )
)
export default ChatTab;