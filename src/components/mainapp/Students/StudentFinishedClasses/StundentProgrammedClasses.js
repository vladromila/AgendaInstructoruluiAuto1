import React from 'react';
import { View, Text, FlatList } from 'react-native';
import ListItemFFC from '../../reusable/ListItemFFC';
import { connect } from 'react-redux';

class StudentProgrammedClasses extends React.Component {
    constructor() {
        super();
        this.state = {
            classes: []
        }
    }
    static navigationOptions = {
        title: "Sed. Programate"
    }
    componentWillMount() {
        function compare(a, b) {
            if (a.year < b.year)
                return -1;
            if (a.year > b.year)
                return 1;
            if (a.year === b.year) {
                if (a.month < b.month)
                    return -1;
                if (a.month > b.month)
                    return 1;
                if (a.month === b.month) {
                    if (a.day < b.day)
                        return -1;
                    if (a.day > b.day)
                        return 1;
                    return 0;
                }
            }
        }
        let classes = [];
        this.props.classes.forEach(item => {
            if (this.props.navigation.state.params.uid === item.studentUid)
                classes.push(item);
        });
        classes.sort(compare);
        this.setState({ classes });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.classes}
                    keyExtractor={(item, i) => `${i}`}
                    extraData={this.state.classes}
                    renderItem={({ item }) => {
                        return <ListItemFFC class={item} isProgrammedClass={true} />
                    }}
                />
            </View>
        );
    }
}

mapStateToProps = state => {
    const { classes } = state.FetchedData;
    return { classes };
}

export default connect(mapStateToProps)(StudentProgrammedClasses);