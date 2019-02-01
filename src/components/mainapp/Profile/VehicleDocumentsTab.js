import React from 'react';
import { Text, View, AsyncStorage, ScrollView } from 'react-native';
import { ListItem, Header, Icon } from 'react-native-elements';
import firebase from 'firebase'
import DateTimePicker from 'react-native-modal-datetime-picker';
import Gradient from 'react-native-css-gradient';
import { connect } from 'react-redux'

class VehicleData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            selectedType: '',
            ar: props.info ? props.info.vehicleDocuments ? props.info.vehicleDocuments.ar ? { day: props.info.vehicleDocuments.ar.day, month: props.info.vehicleDocuments.ar.month, year: props.info.vehicleDocuments.ar.year } : {} : {} : {},
            ap: props.info ? props.info.vehicleDocuments ? props.info.vehicleDocuments.ap ? { day: props.info.vehicleDocuments.ap.day, month: props.info.vehicleDocuments.ap.month, year: props.info.vehicleDocuments.ap.year } : {} : {} : {},
            itp: props.info ? props.info.vehicleDocuments ? props.info.vehicleDocuments.itp ? { day: props.info.vehicleDocuments.itp.day, month: props.info.vehicleDocuments.itp.month, year: props.info.vehicleDocuments.itp.year } : {} : {} : {},
            tpa: props.info ? props.info.vehicleDocuments ? props.info.vehicleDocuments.tpa ? { day: props.info.vehicleDocuments.tpa.day, month: props.info.vehicleDocuments.tpa.month, year: props.info.vehicleDocuments.tpa.year } : {} : {} : {},
            st: props.info ? props.info.vehicleDocuments ? props.info.vehicleDocuments.st ? { day: props.info.vehicleDocuments.st.day, month: props.info.vehicleDocuments.st.month, year: props.info.vehicleDocuments.st.year } : {} : {} : {}
        }
    }
    static navigationOptions = {
        header: null,
        title: "Acte Vehicul"
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
    render() {
        return (
            <Gradient gradient={`linear-gradient(0deg ,white 0%,#1E6EC7 100% )`} style={{ width: '100%', height: '100%', zIndex: -1, position: 'absolute' }} >
                <Header
                    innerContainerStyles={{ backgroundColor: '#1E6EC7' }}
                    outerContainerStyles={{ borderBottomColor: 'black', backgroundColor: '#1E6EC7', borderBottomWidth: 1 }}
                    centerComponent={<Text style={{ fontSize: 22, fontWeight: '900' }}>Acte Vehicul</Text>}
                />
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
            </Gradient>
        )
    }
}
mapStateToProps = (state) => {
    const { info } = state.FetchedData;
    return { info };
}

export default connect(mapStateToProps)(VehicleData);