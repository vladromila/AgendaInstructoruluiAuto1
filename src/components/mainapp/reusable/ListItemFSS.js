import React from 'react';
import { ScrollView, View, Text, Dimensions, TouchableHighlight } from 'react-native';
import { ListItem, Button } from 'react-native-elements';

class ListItemFSS extends React.Component {

    render() {
        return (
            <View style={{ justifyContent: 'center', alignContent: 'center' }}>
                <ListItem
                    underlayColor={'rgba(0,0,0,0.01)'}
                    onPress={this.props.onPress}
                    title={<Text style={{ color: '#1E6EC7', fontSize: 20, fontWeight: "bold" }}>{this.props.student.nume}</Text>}
                    containerStyle={{ backgroundColor: this.props.isSelected === true ? 'rgba(66, 244, 194,0.6)' : 'rgba(0,0,0,0)', borderRadius: 10, marginTop: 4, marginLeft: 4, marginRight: 4, marginBottom: 4, borderColor: '#1E6EC7', borderWidth: 1, zIndex: 99 }}
                    hideChevron
                />
            </View>
        );
    }
}
export default ListItemFSS; 