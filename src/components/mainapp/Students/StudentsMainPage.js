import React, { Component } from 'react'
import { Text, View, FlatList, ScrollView } from 'react-native'
import { Icon } from 'native-base';
import { Header } from 'react-native-elements'
import Gradient from 'react-native-css-gradient'

class StudentsMainPage extends Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (<Gradient gradient={`linear-gradient(0deg ,white 0%,#1E6EC7 90%,#1E6EC7 100% )`} style={{ width: '100%', height: '100%', zIndex: 2, position: 'absolute' }} >
            <ScrollView style={{ flex: 1, zIndex: 99 }}>

                <View style={{ zIndex: 99 }}>
                    <Header
                        innerContainerStyles={{ backgroundColor: '#1E6EC7' }}
                        outerContainerStyles={{ borderBottomColor: 'black', backgroundColor: '#1E6EC7', borderBottomWidth: 1 }}
                        centerComponent={<Text style={{ fontSize: 22, fontWeight: '900' }}>Elevi</Text>}
                        rightComponent={<Icon name="add" fontSize={40} onPress={() => this.props.navigation.navigate('StudentCreate')} />}
                    />
                </View>
            </ScrollView>
        </Gradient>
        )
    }
}
mapStateToProps = (state) => {
    const { classes, exams } = state.FetchedData
    return { classes, exams };
}
export default StudentsMainPage