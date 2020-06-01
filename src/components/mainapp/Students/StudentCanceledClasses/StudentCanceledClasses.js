import React from 'react';
import { View, Text, FlatList } from 'react-native';
import ListItemFFC from '../../reusable/ListItemFFC';

class StudentCanceledClasses extends React.Component {
    static navigationOptions = ({ navigation }) => {
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
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.props.navigation.state.params.canceledClasses}
                    keyExtractor={(item, i) => `${i}`}
                    renderItem={({ item }) => {
                        return <ListItemFFC class={item} isCanceled={true} />
                    }}
                />
            </View>
        );
    }
}
export default StudentCanceledClasses;