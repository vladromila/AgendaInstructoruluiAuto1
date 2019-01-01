import React, { Component } from 'react'
import { Text, View, BackHandler, TextInput, ScrollView, FlatList, Picker, Modal } from 'react-native'
import { examEdit } from '../../../../actions/'
import { connect } from 'react-redux'
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Button, ListItem, SearchBar, Icon } from 'react-native-elements'
import { months } from '../../../../variables';

class ExamEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            day: null,
            month: null,
            year: null,
            input: '',
            uid: '',
            isStudentsModalVisible: true,
            isDateModalVisible: false,
            students: this.props.students,
            selectedStudents: [],
        }
    }

    static navigationOptions = {
        title: "Editeaza examenul",
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
        if (nextProps.editSuccess === true)
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
            <ScrollView style={{ flex: 1 }} >
                <Text style={{ alignSelf: "center", fontSize: 21, color: "#1E6EC7", fontWeight: 'bold' }}>Elevii selectati:</Text>
                {this.state.selectedStudents.map((item, i) => {
                    return <ListItem
                        key={i}
                        underlayColor={'rgba(0,0,0,0.01)'}
                        onPress={() => {
                            if (item.progress === "pending") {
                                let { selectedStudents } = this.state;
                                selectedStudents.splice(i, 1);
                                this.setState({ selectedStudents });
                            }
                            else
                            alert('Elevii care au primit deja un calificativ nu pot fi eliminati din lista.')
                        }}
                        title={<Text style={{ color: '#1E6EC7', fontSize: 20, fontWeight: "bold" }}>{item.nume}</Text>}
                        containerStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderRadius: 10, marginTop: 4, marginLeft: 4, marginRight: 4, marginBottom: 4, borderColor: '#1E6EC7', borderWidth: 1, zIndex: 99 }}
                        hideChevron
                    />
                })}
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
                    title="Editeaza examenul"
                    loading={this.props.editLoading}
                    onPress={() => {
                        const { day, month, year, selectedStudents, uid } = this.state
                        this.props.examEdit({ day, month, year, examedStudents: selectedStudents, uid })
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
                                                selectedStudents.push({ nume: item.nume, nre: item.nre, progress: "pending", uid: item.uid })
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
            </ScrollView>
        )
    }
}

mapStateToProps = (state) => {
    const { students } = state.FetchedData;
    const { editLoading, editSuccess } = state.ExamsReducer;
    return { students, editLoading, editSuccess };
}

export default connect(mapStateToProps, { examEdit })(ExamEdit);