import React from 'react';
import { View, Text, FlatList } from 'react-native';
import Gradient from 'react-native-css-gradient'
import ListItemFFC from '../../reusable/ListItemFFC';

class StudentCanceledClasses extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerStyle: {
                backgroundColor: '#1E6EC7'
            },
            title: `Sedinte Anulate: ${navigation.state.params.nume}`,
            headerTitleStyle: {
                color: 'white'
            }
        }
    }
    render() {
        return (
            <Gradient gradient={`linear-gradient(0deg ,white 0%, #1E6EC7 100% )`} style={{ width: '100%', height: '100%', zIndex: 2, position: 'absolute' }} >
                <FlatList
                    data={this.props.navigation.state.params.canceledClasses}
                    keyExtractor={(item, i) => `${i}`}
                    renderItem={({ item }) => {
                        return <ListItemFFC class={item} isCanceled={true} />
                    }}
                />
            </Gradient>
        );
    }
}
export default StudentCanceledClasses;