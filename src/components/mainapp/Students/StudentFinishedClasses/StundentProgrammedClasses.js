import React from 'react';
import { View, Text, FlatList } from 'react-native';
import Gradient from 'react-native-css-gradient'
import ListItemFFC from '../../reusable/ListItemFFC';
import { connect } from 'react-redux';

class StudentProgrammedClasses extends React.Component {
    static navigationOptions = {
        title: "Sed. Programate"
    }
    render() {
        return (
            <Gradient gradient={`linear-gradient(0deg ,white 0%, #1E6EC7 100% )`} style={{ width: '100%', height: '100%', zIndex: 2, position: 'absolute' }} >
                <FlatList
                    data={this.props.classes}
                    keyExtractor={(item, i) => `${i}`}
                    renderItem={({ item }) => {
                        if (this.props.navigation.state.params.uid === item.studentUid)
                            return <ListItemFFC class={item} isProgrammedClass={true} />
                    }}
                />
            </Gradient>
        );
    }
}

mapStateToProps = state => {
    const { classes } = state.FetchedData;
    return { classes };
}

export default connect(mapStateToProps)(StudentProgrammedClasses);