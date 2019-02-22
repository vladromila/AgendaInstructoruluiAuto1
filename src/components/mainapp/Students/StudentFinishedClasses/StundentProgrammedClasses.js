import React from 'react';
import { View, Text, FlatList } from 'react-native';
import Gradient from 'react-native-css-gradient'
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
            <Gradient gradient={`linear-gradient(0deg ,white 0%, #1E6EC7 100% )`} style={{ width: '100%', height: '100%', zIndex: 2, position: 'absolute' }} >
                <FlatList
                    data={this.state.classes}
                    keyExtractor={(item, i) => `${i}`}
                    extraData={this.state.classes}
                    renderItem={({ item }) => {
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