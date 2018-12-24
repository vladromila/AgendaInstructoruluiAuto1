import React, { Component } from 'react'
import { Text, View, FlatList, ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Icon } from 'native-base';
import { Header } from 'react-native-elements'
import Gradient from 'react-native-css-gradient'
import ListItemFC from '../reusable/ListItemsFC';
import { connect } from 'react-redux'
import { fetchData } from '../../../actions';

class HomeMainPage extends Component {
    constructor() {
        super();
        this.state = {
            classes: [],
            classesSchedule: [
                { hour: 8, minutes: 0 },
                { hour: 9, minutes: 30 },
                { hour: 11, minutes: 0 },
                { hour: 12, minutes: 30 },
                { hour: 14, minutes: 0 },
                { hour: 15, minutes: 30 },
                { hour: 17, minutes: 0 },
                { hour: 18, minutes: 30 },
                { hour: 20, minutes: 0 }
            ],
        }
    }
    static navigationOptions = {
        header: null
    }
    onClassCreatePress() {
        this.props.navigation.navigate('ClassCreate');
    }
    componentWillReceiveProps(nextProps) {
        let date = new Date();
        let classes = []
        nextProps.classes.forEach(classData => {
            if (classData.day === date.getDate() && classData.month === date.getMonth() && classData.year === date.getFullYear())
                classes.push(classData);
        });
        this.setState({ classes })
    }
    componentWillMount() {
        this.props.fetchData();
    }
    render() {
        return (<Gradient gradient={`linear-gradient(0deg ,white 0%, #1E6EC7 100% )`} style={{ width: '100%', height: '100%', zIndex: 2, position: 'absolute' }} >
            <Header
                innerContainerStyles={{ backgroundColor: '#1E6EC7' }}
                outerContainerStyles={{ borderBottomColor: 'black', backgroundColor: '#1E6EC7', borderBottomWidth: 1 }}
                centerComponent={<Text style={{ fontSize: 22, fontWeight: '900' }}>Programul Zilei</Text>}
                rightComponent={<Icon name="add" fontSize={40} onPress={() => this.props.navigation.navigate('ClassCreate')} />}
            />
            <ScrollView style={{ flex: 1, zIndex: 99 }}>
                <View style={{ zIndex: 99 }}>
                    <FlatList
                        keyExtractor={(item, i) => `${i}`}
                        data={this.state.classesSchedule}
                        extraData={[this.state, this.props]}
                        renderItem={({ item, index }) => {
                            let wantedClass = null;
                            this.state.classes.forEach(classData => {
                                if (classData.id === index) {
                                    wantedClass = classData;
                                }
                            })
                            if (wantedClass)
                                return <ListItemFC class={wantedClass} />
                            else
                                return <ListItemFC onClassCreatePress={() => this.onClassCreatePress()} scheduledClass={item} />
                        }}
                    /></View>
            </ScrollView>
        </Gradient>
        )
    }
}
mapStateToProps = (state) => {
    const { classes, exams } = state.FetchedData
    return { classes, exams };
}
export default connect(mapStateToProps, { fetchData })(HomeMainPage)