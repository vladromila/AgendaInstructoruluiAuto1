import React from 'react';
import { View, Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import _ from 'lodash';
class ListItemForE extends React.Component {
    render() {
        console.log(this.props.exam);
        return (
            <View>
                {this.props.exam ?
                    <View>
                        <ListItem
                            underlayColor={'rgba(244, 146, 66, 0.75)'}
                            containerStyle={{ backgroundColor: 'rgba(244, 146, 66, 0.8)', borderRadius: 6, margin: 4, borderBottomColor: 'rgba(0,0,0,0)', zIndex: 99 }}
                            title={<Text style={{ fontSize: 21, fontWeight: "bold" }}>Examen: {Object.keys(this.props.exam.examedStudents).length} elevi</Text>}
                            onLongPress={this.props.onLongPress}
                            onPress={this.props.onPress}
                            hideChevron
                        />
                    </View>
                    :
                    <ListItem
                        containerStyle={{ backgroundColor: 'rgba(255, 247, 35, 0.8)', borderRadius: 6, margin: 4, borderBottomColor: 'rgba(0,0,0,0)', zIndex: 99 }}
                        title={<Text style={{ fontSize: 21, fontWeight: "bold" }}>Nici-un examen programat</Text>}
                        rightIcon={<Icon name="add" size={40} color="black" onPress={this.props.onCreateExamPress} />}
                    />}
            </View>
        );
    }
}
export default ListItemForE