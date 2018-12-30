import React, { Component } from 'react'
import { Text, View, BackHandler, TextInput, ScrollView, FlatList, Picker, Modal } from 'react-native'
import { classCreate } from '../../../../actions/'
import { connect } from 'react-redux'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Button, ListItem, SearchBar, Icon } from 'react-native-elements'
import { Item, Label, Input } from "native-base";
import { Header } from 'react-navigation'

class ClassCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            day: null,
            month: null,
            year: null,
            minutes: null,
            hour: null,
            location: '',
            tip: "normala",
            input: '',
            isStudentsModalVisible: true,
            isDateModalVisible: false,
            isTimeModalVisible: false,
            students: this.props.students,
            selectedStudent: {},
            pressed: false
        }
    }

    static navigationOptions = {
        title: "Creeaza o sedinta",
        headerTitleStyle: { color: 'white' },
        headerStyle: {
            backgroundColor: '#1E6EC7'
        }
    }

    async componentDidMount() {
        const { id, day, month, year, minutes, hour } = this.props.navigation.state.params;
        this.setState({
            id, day, month, year, minutes, hour
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAutomaticTypeSelectWanted === false)
            this.setState({ tip: "normala" })
        if (nextProps.createSuccess === true)
            this.props.navigation.goBack();
        this.setState({ students: nextProps.students })
    }

    onInpuChange(input) {
        let search = input.toLowerCase()
        let students = this.props.students
        let filteredStudents = students.filter((item) => {
            return item.nume.toLowerCase().match(search)
        })
        this.setState({ students: filteredStudents })
    }

    render() {
        return (
            <View style={{ flex: 1 }} >
                <Item stackedLabel style={{ borderWidth: 0, borderColor: 'rgba(0,0,0,0)' }}>
                    <Label style={{ color: '#1E6EC7', fontSize: 21, fontWeight: 'bold' }}>Locatie</Label>
                    <Input style={{ color: '#1E6EC7', fontSize: 18, borderColor: "#1E6EC7", borderWidth: 2, width: '100%', marginRight: 5 }} onChangeText={(location) => { this.setState({ location }) }} />
                </Item>
                <Text style={{ alignSelf: "center", fontSize: 21, color: "#1E6EC7", fontWeight: 'bold' }}>Elevul selectat:</Text>
                <Button
                    title={this.state.selectedStudent.nume ? this.state.selectedStudent.nume : "Selecteaza un elev"}
                    backgroundColor="#1E6EC7"
                    onPress={() => { this.setState({ isStudentsModalVisible: true }) }}
                />
                <Text style={{ color: '#1E6EC7', fontSize: 21, alignSelf: 'center', fontWeight: 'bold' }}>Tipul sedintei: {this.props.isAutomaticTypeSelectWanted === true ? this.state.tip === "normala" ? "Scolarizare" : "Perfectionare" : null} </Text>
                {this.props.isAutomaticTypeSelectWanted === false ?
                    <View>
                        <Picker
                            selectedValue={this.state.tip}
                            style={{ borderColor: '#1E6EC7', borderWidth: 2 }}
                            onValueChange={(value) => { this.setState({ tip: value }) }}
                        >
                            <Picker.Item color="#1E6EC7" label="Sed. Scolarizare" value="normala" />
                            <Picker.Item color="#1E6EC7" label="Sed. Perfectionare" value="suplimentara" />
                        </Picker></View> : null}
                <Text style={{ alignSelf: "center", fontSize: 21, color: "#1E6EC7" }}>Data selectata: <Text style={{ fontWeight: 'bold' }}>{this.state.day} {this.state.month} {this.state.year}</Text></Text>
                <Button
                    containerViewStyle={{ width: '50%', alignSelf: 'center' }}
                    title="Selecteaza o data"
                    onPress={() => this.setState({ isDateModalVisible: true })}
                    backgroundColor="#1E6EC7"
                />
                <Text style={{ alignSelf: "center", fontSize: 21, color: "#1E6EC7" }}>Ora selectata: <Text style={{ fontWeight: 'bold' }}>{this.state.hour}:{this.state.minutes >= 0 && this.state.minutes < 10 ? `0${this.state.minutes}` : this.state.minutes}</Text></Text>
                <Button
                    containerViewStyle={{ width: '50%', alignSelf: 'center' }}
                    title="Selecteaza o ora"
                    onPress={() => this.setState({ isTimeModalVisible: true })}
                    backgroundColor="#1E6EC7"
                />
                <Button
                    containerViewStyle={{ marginTop: 3 }}
                    title="Creeaza sedinta"
                    loading={this.props.createLoading}
                    onPress={() => {
                        const { year, month, day, hour, minutes, tip, location } = this.state;
                        if (this.state.pressed === false)
                            if (this.state.selectedStudent.nume) {
                                this.setState({ pressed: true })
                                this.props.classCreate({ year, month, day, hour, minutes, tip, studentUid: this.state.selectedStudent.uid, location })
                            }
                    }}
                    backgroundColor="#1E6EC7"
                />
                <DateTimePicker
                    date={new Date(this.state.year, this.state.month, this.state.day, this.state.hour, this.state.minutes)}
                    onConfirm={date => {
                        this.setState({ day: date.getDate(), month: date.getMonth(), year: date.getFullYear() })
                        this.setState({ isDateModalVisible: false })
                    }}
                    onCancel={() => this.setState({ isDateModalVisible: false })}
                    isVisible={this.state.isDateModalVisible}
                    mode='date'
                />
                <DateTimePicker
                    date={new Date(this.state.year, this.state.month, this.state.day, this.state.hour, this.state.minutes)}
                    onConfirm={time => {
                        this.setState({ hour: time.getHours(), minutes: time.getMinutes() })
                        this.setState({ isTimeModalVisible: false })
                    }}
                    onCancel={() => this.setState({ isTimeModalVisible: false })}
                    isVisible={this.state.isTimeModalVisible}
                    mode='time'
                />
                <Modal
                    visible={this.state.isStudentsModalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => {
                        this.setState({ isStudentsModalVisible: false })
                    }}
                >
                    <View style={{ flex: 1, backgroundColor: 'white' }}>
                        <Text style={{ alignSelf: "center", fontSize: 23, color: "#1E6EC7", fontWeight: 'bold' }}>Selecteaza un elev:</Text>
                        <SearchBar
                            autoFocus
                            value={this.state.input}
                            onClearText={() => { console.log('da') }}
                            clearIcon={<Icon name="times" />}
                            containerStyle={{ backgroundColor: 'white', borderBottomColor: '#1E6EC7', borderTopColor: '#1E6EC7' }}
                            inputStyle={{ backgroundColor: 'white' }}
                            onChangeText={(input) => {
                                this.setState({ input })
                                this.onInpuChange(input)
                            }}
                        />
                        <ScrollView style={{ borderBottomColor: '#1E6EC7', borderBottomWidth: 1 }}>
                            <FlatList
                                data={this.state.students}
                                extraData={this.state}
                                keyExtractor={(item, i) => `${i}`}
                                renderItem={({ item }) => {
                                    let isSelected = this.state.selectedStudent.uid === item.uid;
                                    return <ListItem
                                        underlayColor={'rgba(0,0,0,0.01)'}
                                        onPress={() => {
                                            console.log(item.nrn);
                                            if (this.state.selectedStudent.uid === item.uid)
                                                this.setState({ selectedStudent: {}, tip: "normala" });
                                            else {
                                                this.setState({ selectedStudent: item });
                                                if (item.nrn > 14)
                                                    this.setState({ tip: "suplimentara" });
                                                else
                                                    this.setState({ tip: "normala" });
                                            }
                                        }}
                                        title={<Text style={{ color: isSelected === true ? 'white' : '#1E6EC7', fontSize: 20, fontWeight: "bold" }}>{item.nume}</Text>}
                                        containerStyle={{ backgroundColor: isSelected === true ? '#1E6EC7' : 'rgba(0,0,0,0)', borderRadius: 10, marginTop: 4, marginLeft: 4, marginRight: 4, marginBottom: 4, borderColor: '#1E6EC7', borderWidth: 1, zIndex: 99 }}
                                        hideChevron
                                    />
                                }}
                            />
                        </ScrollView>
                        <Button
                            backgroundColor="#1E6EC7"
                            title="Gata"
                            onPress={() => this.setState({ isStudentsModalVisible: false })}
                        />
                    </View>
                </Modal>
            </View>
        )
    }
}

mapStateToProps = (state) => {
    const { students } = state.FetchedData;
    const { isAutomaticTypeSelectWanted } = state.GlobalVariablesReducer;
    const { createLoading, createSuccess } = state.ClassesReducer;
    return { students, isAutomaticTypeSelectWanted, createLoading, createSuccess };
}

export default connect(mapStateToProps, { classCreate })(ClassCreate);