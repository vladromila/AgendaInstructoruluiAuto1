import React from 'react';
import { Text, View, AsyncStorage, ScrollView } from 'react-native';
import { ListItem, Header, Icon } from 'react-native-elements';
import firebase from 'firebase'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux'
class PersonalDocuments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            selectedType: '',
            dva: props.info ? props.info.personalDocuments ? props.info.personalDocuments.dva ? { day: props.info.personalDocuments.dva.day, month: props.info.personalDocuments.dva.month, year: props.info.personalDocuments.dva.year } : {} : {} : {},
            ep: props.info ? props.info.personalDocuments ? props.info.personalDocuments.ep ? { day: props.info.personalDocuments.ep.day, month: props.info.personalDocuments.ep.month, year: props.info.personalDocuments.ep.year } : {} : {} : {},
            fm: props.info ? props.info.personalDocuments ? props.info.personalDocuments.fm ? { day: props.info.personalDocuments.fm.day, month: props.info.personalDocuments.fm.month, year: props.info.personalDocuments.fm.year } : {} : {} : {},
            caz: props.info ? props.info.personalDocuments ? props.info.personalDocuments.caz ? { day: props.info.personalDocuments.caz.day, month: props.info.personalDocuments.caz.month, year: props.info.personalDocuments.caz.year } : {} : {} : {}
        }
    }
    static navigationOptions = {
        header: null,
        title: "Acte Instructor"
    }
    onConfirmPress(date) {
        let data = {
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()
        }
        if (data !== this.state[this.state.selectedType]) {
            this.setState({ [this.state.selectedType]: data })
            AsyncStorage.setItem(`${this.state.selectedType}u`, JSON.stringify(false))
                .then(() => {
                    AsyncStorage.setItem(this.state.selectedType, JSON.stringify(this.state[this.state.selectedType]))
                        .then(() => {
                            firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/info/personalDocuments/${this.state.selectedType}`)
                                .set(data)
                                .then(() => {
                                    AsyncStorage.setItem(`${this.state.selectedType}u`, JSON.stringify(true))
                                })
                        })
                })

        }
        this.setState({ isDateTimePickerVisible: false })
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    innerContainerStyles={{ backgroundColor: '#1E6EC7' }}
                    outerContainerStyles={{ borderBottomColor: 'black', backgroundColor: '#1E6EC7', borderBottomWidth: 1 }}
                    centerComponent={<Text style={{ fontSize: 22, fontWeight: '900' }}>Acte Instructor</Text>}
                />
                <ScrollView style={{ flex: 1 }}>
                    <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: '500' }}>Cazier:</Text>
                    <ListItem
                        containerStyle={{ borderRadius: 25, marginTop: 4, marginLeft: 4, marginRight: 4, marginBottom: 4, borderColor: 'black', borderWidth: 1, zIndex: 99 }}
                        title={<Text style={{ alignSelf: 'center', fontSize: 18 }}>{Object.keys(this.state.caz).length === 0 ? 'Data valabilitatii nesetate' : `${this.state.caz.day}/${this.state.caz.month + 1}/${this.state.caz.year}`}</Text>}
                        onPress={() => {
                            this.setState({ selectedType: 'caz' })
                            this.setState({ isDateTimePickerVisible: true })
                        }}
                        underlayColor={`rgba(0,0,0,0.05)`}
                        hideChevron
                    />
                    <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: '500' }}>Atestat:</Text>
                    <ListItem
                        containerStyle={{ borderRadius: 25, marginTop: 4, marginLeft: 4, marginRight: 4, marginBottom: 4, borderColor: 'black', borderWidth: 1, zIndex: 99 }}
                        title={<Text style={{ alignSelf: 'center', fontSize: 18 }}>{Object.keys(this.state.dva).length === 0 ? 'Data valabilitatii nesetate' : `${this.state.dva.day}/${this.state.dva.month + 1}/${this.state.dva.year}`}</Text>}
                        onPress={() => {
                            this.setState({ selectedType: 'dva' })
                            this.setState({ isDateTimePickerVisible: true })
                        }}
                        underlayColor={`rgba(0,0,0,0.05)`}
                        hideChevron
                    />
                    <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: '500' }}>Aviz psihologic:</Text>
                    <ListItem
                        containerStyle={{ borderRadius: 25, marginTop: 4, marginLeft: 4, marginRight: 4, marginBottom: 4, borderColor: 'black', borderWidth: 1, zIndex: 99 }}
                        title={<Text style={{ alignSelf: 'center', fontSize: 18 }}>{Object.keys(this.state.ep).length === 0 ? 'Data valabilitatii nesetate' : `${this.state.ep.day}/${this.state.ep.month + 1}/${this.state.ep.year}`}</Text>}
                        onPress={() => {
                            this.setState({ selectedType: 'ep' })
                            this.setState({ isDateTimePickerVisible: true })
                        }}
                        underlayColor={`rgba(0,0,0,0.05)`}
                        hideChevron
                    />
                    <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: '500' }}>Fisa medicala:</Text>
                    <ListItem
                        containerStyle={{ borderRadius: 25, marginTop: 4, marginLeft: 4, marginRight: 4, marginBottom: 4, borderColor: 'black', borderWidth: 1, zIndex: 99 }}
                        title={<Text style={{ alignSelf: 'center', fontSize: 18 }}>{Object.keys(this.state.fm).length === 0 ? 'Data valabilitatii nesetate' : `${this.state.fm.day}/${this.state.fm.month + 1}/${this.state.fm.year}`}</Text>}
                        onPress={() => {
                            this.setState({ selectedType: 'fm' })
                            this.setState({ isDateTimePickerVisible: true })
                        }}
                        underlayColor={`rgba(0,0,0,0.05)`}
                        hideChevron
                    />
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        mode='date'
                        onCancel={() => this.setState({ isDateTimePickerVisible: false })}
                        onConfirm={(date) => {
                            this.onConfirmPress(date)
                        }}
                    />
                </ScrollView>
            </View>
        )
    }
}
mapStateToProps = state => {
    const { info } = state.FetchedData;
    return { info };
}
export default connect(mapStateToProps)(PersonalDocuments);