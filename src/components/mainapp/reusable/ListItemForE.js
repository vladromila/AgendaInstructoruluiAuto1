import React from 'react';
import { View, Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
class ListItemForE extends React.Component {
    render() {
        return (
            <View>
                {this.props.exam ?
                    <ListItem
                        containerStyle={{ backgroundColor: 'rgba(245, 15, 15, 0.5)', borderRadius: 6, margin: 4, borderBottomColor: 'rgba(0,0,0,0)', zIndex: 99 }}
                        title={<Text>Examen</Text>}
                        hideChevron
                    />
                    :
                    <ListItem
                        containerStyle={{ backgroundColor: 'rgba(255, 247, 35, 0.8)', borderRadius: 6, margin: 4, borderBottomColor: 'rgba(0,0,0,0)', zIndex: 99 }}
                        title={<Text style={{ fontSize: 21, fontWeight: "bold" }}>Nici-un examen programat</Text>}
                        rightIcon={<Icon name="add" size={40} color="black" onPress={this.props.onCreateExamPress } />}
                    />}
            </View>
        );
    }
}
export default ListItemForE