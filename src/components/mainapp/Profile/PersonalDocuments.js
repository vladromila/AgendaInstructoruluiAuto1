import React from 'react';
import { Text, View, AsyncStorage, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase'
import DateTimePicker from 'react-native-modal-datetime-picker';

class PersonalDocuments extends React.Component {
    constructor() {
        super();
        this.state = {
            isDateTimePickerVisible: false,
            selectedType: '',
            dva: {},
            ep: {},
            fm: {}
        }
    }
    static navigationOptions = {
        header: null,
        title: "Acte Instructor"
    }
    componentWillMount() {
        this.retrieveData();
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
    retrieveData() {
        let arr = ['dva', 'ep', 'fm'];
        arr.forEach(pr => {
            AsyncStorage.getItem(pr).then((value) => {
                if (value === null) {
                    AsyncStorage.setItem(`${pr}u`, JSON.stringify(false))
                        .then(() => {
                            firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/info/personalDocuments/${pr}`)
                                .on('value', snapshot => {
                                    if (snapshot.val() !== null) {
                                        this.setState({ [pr]: snapshot.val() })
                                        AsyncStorage.setItem(pr, JSON.stringify(snapshot.val()))
                                            .then(() => {
                                                AsyncStorage.setItem(pr, JSON.stringify(true))
                                            })
                                    }
                                })
                        })
                }
                else {
                    this.setState({ [pr]: JSON.parse(value) })
                    AsyncStorage.getItem(`${pr}u`)
                        .then((b) => {
                            if (JSON.parse(b) === false)
                                firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/info/personalDocuments/${pr}`)
                                    .set({ ...JSON.parse(value) })
                                    .then(() => {
                                        AsyncStorage.setItem(`${pr}u`, JSON.stringify(true))
                                    })
                        })
                }
            })
        })
    }
    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
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
        )
    }
}

export default PersonalDocuments;