import React from 'react';
import { Text, View, AsyncStorage, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase'
import DateTimePicker from 'react-native-modal-datetime-picker';

class VehicleData extends React.Component {
    constructor() {
        super();
        this.state = {
            isDateTimePickerVisible: false,
            selectedType: '',
            ar: {},
            ap: {},
            itp: {},
            tpa: {},
            st: {}
        }
    }
    static navigationOptions = {
        header: null,
        title: "Acte Vehicul"
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
                            firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/info/vehicleDocuments/${this.state.selectedType}`)
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
        let arr=['ar','ap','itp','st','tpa']
        arr.forEach(pr=>{
            AsyncStorage.getItem(pr).then((value) => {
                if (value === null) {
                    AsyncStorage.setItem(`${pr}u`, JSON.stringify(false))
                        .then(() => {
                            firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/info/vehicleDocuments/${pr}`)
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
                                firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/info/vehicleDocuments/${pr}`)
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
                <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: '500' }}>Asigurare R.C.A</Text>
                <ListItem
                    containerStyle={{ borderRadius: 25, marginTop: 4, marginLeft: 4, marginRight: 4, marginBottom: 4, borderColor: 'black', borderWidth: 1, zIndex: 99 }}
                    title={<Text style={{ alignSelf: 'center', fontSize: 18 }}>{Object.keys(this.state.ar).length === 0 ? 'Data valabilitatii nesetate' : `${this.state.ar.day}/${this.state.ar.month + 1}/${this.state.ar.year}`}</Text>}
                    onPress={() => {
                        this.setState({ selectedType: 'ar' })
                        this.setState({ isDateTimePickerVisible: true })
                    }}
                    underlayColor={`rgba(0,0,0,0.05)`}
                    hideChevron
                />
                <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: '500' }}>Asigurare persoane:</Text>
                <ListItem
                    containerStyle={{ borderRadius: 25, marginTop: 4, marginLeft: 4, marginRight: 4, marginBottom: 4, borderColor: 'black', borderWidth: 1, zIndex: 99 }}
                    title={<Text style={{ alignSelf: 'center', fontSize: 18 }}>{Object.keys(this.state.ap).length === 0 ? 'Data valabilitatii nesetate' : `${this.state.ap.day}/${this.state.ap.month + 1}/${this.state.ap.year}`}</Text>}
                    onPress={() => {
                        this.setState({ selectedType: 'ap' })
                        this.setState({ isDateTimePickerVisible: true })
                    }}
                    underlayColor={`rgba(0,0,0,0.05)`}
                    hideChevron
                />
                <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: '500' }}>I.T.P:</Text>
                <ListItem
                    containerStyle={{ borderRadius: 25, marginTop: 4, marginLeft: 4, marginRight: 4, marginBottom: 4, borderColor: 'black', borderWidth: 1, zIndex: 99 }}
                    title={<Text style={{ alignSelf: 'center', fontSize: 18 }}>{Object.keys(this.state.itp).length === 0 ? 'Data valabilitatii nesetate' : `${this.state.itp.day}/${this.state.itp.month + 1}/${this.state.itp.year}`}</Text>}
                    onPress={() => {
                        this.setState({ selectedType: 'itp' })
                        this.setState({ isDateTimePickerVisible: true })
                    }}
                    underlayColor={`rgba(0,0,0,0.05)`}
                    hideChevron
                />
                <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: '500', }}>Trusa de prim ajutor:</Text>
                <ListItem
                    containerStyle={{ borderRadius: 25, marginTop: 4, marginLeft: 4, marginRight: 4, marginBottom: 4, borderColor: 'black', borderWidth: 1, zIndex: 99 }}
                    title={<Text style={{ alignSelf: 'center', fontSize: 18 }}>{Object.keys(this.state.tpa).length === 0 ? 'Data valabilitatii nesetate' : `${this.state.tpa.day}/${this.state.tpa.month + 1}/${this.state.tpa.year}`}</Text>}
                    onPress={() => {
                        this.setState({ selectedType: 'tpa' })
                        this.setState({ isDateTimePickerVisible: true })
                    }}
                    underlayColor={`rgba(0,0,0,0.05)`}
                    hideChevron
                />
                <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: '500' }}>Stingator:</Text>
                <ListItem
                    containerStyle={{ borderRadius: 25, marginTop: 4, marginLeft: 4, marginRight: 4, marginBottom: 4, borderColor: 'black', borderWidth: 1, zIndex: 99 }}
                    title={<Text style={{ alignSelf: 'center', fontSize: 18 }}>{Object.keys(this.state.st).length === 0 ? 'Data valabilitatii nesetate' : `${this.state.st.day}/${this.state.st.month + 1}/${this.state.st.year}`}</Text>}
                    onPress={() => {
                        this.setState({ selectedType: 'st' })
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

export default VehicleData;