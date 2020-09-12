import React, { Component } from 'react'
import { Text, View, BackHandler, TextInput, ScrollView, FlatList, Picker, Modal } from 'react-native'
import { connect } from 'react-redux'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Button, ListItem, SearchBar, Icon } from 'react-native-elements'
import { months } from '../../../../variables'
import firebase from 'firebase'
class TheoryExamEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            day: null,
            month: null,
            year: null,
            input: '',
            uid: "",
            isStudentsModalVisible: true,
            isDateModalVisible: false,
            isSetHourModalVisible: false,
            students: this.props.students,
            selectedStudents: [],
            pressed: false,
            selectedStudent: '',
            loading: false
        }
    }

    static navigationOptions = {
        title: "Programeaza la sala",
        headerTitleStyle: { color: 'white' },
        headerStyle: {
            backgroundColor: '#1E6EC7'
        }
    }

    async componentDidMount() {
        const { day, month, year, selectedStudents, uid } = this.props.navigation.state.params;
        this.setState({
            day, month, year, selectedStudents, uid
        })
    }

    componentWillReceiveProps(nextProps) {
    }
    editExam = async () => {
        this.setState({ loading: true })
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/theoryExams/${this.state.uid}`)
            .set({ date: new Date(this.state.year, this.state.month, this.state.day).toString(), examedStudents: this.state.selectedStudents })
            .then(() => {
                this.setState({ loading: false })
                this.props.navigation.goBack()
            })
            .then(() => {
                this.setState({ loading: false })
            })
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
        let maxDate = new Date()
        maxDate.setFullYear(new Date().getFullYear() + 1)
        let minDate = new Date()
        minDate.setFullYear(new Date().getFullYear() - 1)
        return (
            <ScrollView style={{ flex: 1 }} >
                <Text style={{ alignSelf: "center", fontSize: 21, color: "#1E6EC7", fontWeight: 'bold' }}>Elevii selectati:</Text>
                {this.state.selectedStudents.map((item, i) => {
                    return <React.Fragment key={i}>
                        <ListItem
                            key={i}
                            underlayColor={'rgba(0,0,0,0.01)'}
                            onPress={() => {
                                let { selectedStudents } = this.state; new Date().setFullYear(new Date().getFullYear() + 1)
                                selectedStudents.splice(i, 1);
                                this.setState({ selectedStudents });
                            }}
                            title={<Text style={{ color: '#1E6EC7', fontSize: 20, fontWeight: "bold" }}>{item.nume}</Text>}
                            containerStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderRadius: 10, marginTop: 4, marginLeft: 4, marginRight: 4, marginBottom: 4, borderColor: '#1E6EC7', borderWidth: 1, zIndex: 99 }}
                            hideChevron
                        />
                        <Button
                            onPress={() => { this.setState({ isSetHourModalVisible: true, selectedStudent: item }) }}
                            backgroundColor="#1E6EC7"
                            title={`Ora programarii: ${new Date(item.date).getHours() < 10 ? "0" : ""}${new Date(item.date).getHours()}:${new Date(item.date).getMinutes() < 10 ? "0" : ""}${new Date(item.date).getMinutes()}`}
                            containerViewStyle={{ marginBottom: 10 }}
                        />
                    </React.Fragment>
                })
                }
                <Button
                    title={"Schimba elevii selectati"}
                    backgroundColor="#1E6EC7"
                    onPress={() => { this.setState({ isStudentsModalVisible: true }) }}
                />
                <Text style={{ alignSelf: "center", fontSize: 21, color: "#1E6EC7" }}>Data selectata: <Text style={{ fontWeight: 'bold' }}>{this.state.day} {months[this.state.month]} {this.state.year}</Text></Text>
                <Button
                    containerViewStyle={{ width: '50%', alignSelf: 'center' }}
                    title="Selecteaza o data"
                    onPress={() => this.setState({ isDateModalVisible: true })}
                    backgroundColor="#1E6EC7"
                />
                <Button
                    containerViewStyle={{ marginTop: 3 }}
                    title="Editeaza ziua de sala"
                    loading={this.state.loading}
                    onPress={() => {
                        if (this.state.pressed === false) {
                            if (this.state.selectedStudents.length > 0) {
                                this.editExam()
                            }
                            else
                                alert('Alegeti cel putin un elev inainte de a creea o zi de sala')
                        }
                    }}
                    backgroundColor="#1E6EC7"
                />
                <DateTimePicker
                    date={new Date(this.state.selectedStudent.date)}
                    onConfirm={date => {
                        let students = [...this.state.selectedStudents]
                        this.state.selectedStudents.forEach((student, i) => {
                            if (student.uid === this.state.selectedStudent.uid) {
                                students[i].date = new Date(this.state.year, this.state.month, this.state.day, date.getHours(), date.getMinutes()).toString()
                            }
                        })
                        this.setState({ selectedStudents: students, isSetHourModalVisible: false })
                    }}
                    minimumDate={minDate}
                    maximumDate={maxDate}
                    onCancel={() => this.setState({ isSetHourModalVisible: false })}
                    isVisible={this.state.isSetHourModalVisible}
                    mode='time'
                />
                <DateTimePicker
                    date={new Date(this.state.year, this.state.month, this.state.day)}
                    onConfirm={date => {
                        this.setState({ day: date.getDate(), month: date.getMonth(), year: date.getFullYear(), isDateModalVisible: false })
                    }}
                    minimumDate={minDate}
                    maximumDate={maxDate}
                    onCancel={() => this.setState({ isDateModalVisible: false })}
                    isVisible={this.state.isDateModalVisible}
                    mode='date'
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
                                    let isSelected = false;
                                    let pos = -1
                                    this.state.selectedStudents.forEach((student, i) => {
                                        if (student.uid === item.uid) {
                                            isSelected = true;
                                            pos = i;
                                        }
                                    })
                                    return <ListItem
                                        underlayColor={'rgba(0,0,0,0.01)'}
                                        onPress={() => {
                                            if (isSelected === true) {
                                                let { selectedStudents } = this.state;
                                                selectedStudents.splice(pos, 1);
                                                this.setState({ selectedStudents });
                                            }
                                            else {
                                                const { selectedStudents } = this.state
                                                selectedStudents.push({ nume: item.nume, uid: item.uid, date: new Date(this.state.year, this.state.month, this.state.day, 9, 0).toString() })
                                                this.setState({ selectedStudents });
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
            </ScrollView >
        )
    }
}

mapStateToProps = (state) => {
    const { students } = state.FetchedData;
    return { students };
}

export default connect(mapStateToProps)(TheoryExamEdit);