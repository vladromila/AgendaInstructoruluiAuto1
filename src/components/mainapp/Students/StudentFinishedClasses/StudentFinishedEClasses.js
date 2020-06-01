import React from 'react';
import { View, Text, FlatList } from 'react-native';
import ListItemFFC from '../../reusable/ListItemFFC';

class StudentFinishedEClasses extends React.Component {
    static navigationOptions = {
        title: "Sed. Perfectionare"
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.props.navigation.state.params.finishedEClasses}
                    keyExtractor={(item, i) => `${i}`}
                    renderItem={({ item }) => {
                        return <ListItemFFC class={item} isCanceled={false} />
                    }}
                />
            </View>
        );
    }
}
export default StudentFinishedEClasses;