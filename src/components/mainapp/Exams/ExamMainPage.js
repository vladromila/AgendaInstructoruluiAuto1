import React, { Component } from 'react'
import { Text, View, FlatList, Modal, Dimensions } from 'react-native'
import Gradient from 'react-native-css-gradient';
import { Header, ListItem, Button } from 'react-native-elements'
import { Item, Label, Input } from 'native-base'
import { examAddC, examOHDelete1, examDelete } from '../../../actions/'
import { connect } from 'react-redux'
import { monthsShort, months } from '../../../variables'
import _ from 'lodash';
import ActionSheet from 'react-native-actionsheet';

class ExamMainPage extends Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super();
        this.state = {
            selectedExam: null,
            isAskModalVisible: false,
            isExamModalVisible: false,
            selectedExam: {},
            selectedExamedStudent: {},
            exam: { examedStudents: {} },
            politist: '',
            calificativ: '',
            ok: false
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.addCSuccess === true)
            this.setState({ isExamModalVisible: false, politist: '', calificativ: '', selectedExamedStudent: {} })
    }
    render() {
        return (

            <Gradient gradient={`linear-gradient(0deg ,white 0%, #1E6EC7 130% )`} style={{ width: '100%', height: '100%', zIndex: 2, position: 'absolute' }} >
                <Header
                    innerContainerStyles={{ backgroundColor: '#1E6EC7' }}
                    outerContainerStyles={{ borderBottomColor: 'black', backgroundColor: '#1E6EC7', borderBottomWidth: 1 }}
                    centerComponent={<Text style={{ fontSize: 22, fontWeight: '900' }}>Examene</Text>}
                />
                <FlatList
                    data={this.props.exams}
                    extraData={[this.props, this.state]}
                    keyExtractor={(item, i) => `${i}`}
                    renderItem={({ item, index }) => {
                        if (this.props.exams[index - 1])
                            if (this.props.exams[index - 1].month < this.props.exams[index].month || this.props.exams[index - 1].year < this.props.exams[index].year)
                                return <View>
                                    <Text style={{ fontSize: 21, fontWeight: 'bold', alignSelf: 'center' }}>{months[item.month]} {item.year}:</Text>
                                    <ListItem
                                        underlayColor={'rgba(255, 247, 35, 0.75)'}
                                        leftIcon={<View style={{ flexDirection: 'column', borderRightWidth: 3, borderRightColor: 'red' }}>
                                            <View style={{ width: 75 }}>
                                                <Text style={{ fontSize: 19, fontWeight: '500' }}>{item.day} {monthsShort[item.month]}
                                                </Text>
                                                <Text style={{ fontSize: 16 }}>{item.year}</Text>
                                            </View></View>}
                                        containerStyle={{ backgroundColor: 'rgba(255, 247, 35, 0.8)', borderRadius: 6, margin: 4, borderBottomColor: 'rgba(0,0,0,0)', zIndex: 99, marginBottom: this.state.selectedExam === item.uid ? 0 : 4 }}
                                        title={<Text style={{ fontSize: 21, fontWeight: "bold", marginLeft: 5 }}>Examen: {Object.keys(item.examedStudents).length} elev{Object.keys(item.examedStudents).length != 1 ? "i" : null}</Text>}
                                        onPress={() => {
                                            if (this.state.selectedExam === item.uid)
                                                this.setState({ selectedExam: {} })
                                            else
                                                this.setState({ selectedExam: item.uid })
                                        }}
                                        onLongPress={() => {
                                            this.setState({ exam: item });
                                            this.ActionSheetForExams.show()

                                        }}
                                        hideChevron
                                    />
                                    {
                                        this.state.selectedExam === item.uid ?
                                            <View style={{ alignSelf: 'center', width: '90%', backgroundColor: 'rgba(0,0,0,0.1)' }}>
                                                {_.toArray(item.examedStudents).map((examedStudent, i) => {
                                                    return <ListItem
                                                        underlayColor={'rgba(255, 255, 255,0.15)'}
                                                        containerStyle={{ backgroundColor: examedStudent.progress === "pending" ? 'rgba(255, 255, 255,0.2)' : examedStudent.progress === "admis" ? "rgba(29, 124, 37,0.7)" : "rgba(204, 24, 45,0.7)", borderBottomColor: 'black', borderLeftColor: 'black', borderRightColor: 'black', borderWidth: 1, borderTopWidth: 0 }}
                                                        titleStyle={{ fontSize: 19, fontWeight: 'bold', color: examedStudent.progress === "respins" ? "white" : 'black' }}
                                                        key={i}
                                                        title={
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Text style={{ fontSize: 19, fontWeight: 'bold', color: examedStudent.progress === "respins" ? "white" : 'black' }}>{examedStudent.nume}</Text>
                                                            </View>}
                                                        subtitle={examedStudent.progress !== "pending" ?
                                                            <View style={{ flexDirection: 'column' }}>
                                                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: examedStudent.progress === "respins" ? "white" : 'black' }}>{examedStudent.progress === "admis" ? "Admis" : examedStudent.progress === "respins" ? "Respins" : ""}</Text>
                                                            </View>
                                                            : null
                                                        }
                                                        onLongPress={() => {
                                                            this.setState({ selectedExamedStudent: examedStudent, id: i, isExamModalVisible: true, exam: item })
                                                        }}
                                                        hideChevron
                                                    />
                                                })}
                                            </View>
                                            : null
                                    }</View>
                            else
                                return <View>
                                    <ListItem
                                        underlayColor={'rgba(255, 247, 35, 0.75)'}
                                        leftIcon={<View style={{ flexDirection: 'column', borderRightWidth: 3, borderRightColor: 'red' }}>
                                            <View style={{ width: 75 }}>
                                                <Text style={{ fontSize: 19, fontWeight: '500' }}>{item.day} {monthsShort[item.month]}
                                                </Text>
                                                <Text style={{ fontSize: 16 }}>{item.year}</Text>
                                            </View></View>}
                                        containerStyle={{ backgroundColor: 'rgba(255, 247, 35, 0.8)', borderRadius: 6, margin: 4, borderBottomColor: 'rgba(0,0,0,0)', zIndex: 99, marginBottom: this.state.selectedExam === item.uid ? 0 : 4 }}
                                        title={<Text style={{ fontSize: 21, fontWeight: "bold", marginLeft: 5 }}>Examen: {Object.keys(item.examedStudents).length} elev{Object.keys(item.examedStudents).length != 1 ? "i" : null}</Text>}
                                        onPress={() => {
                                            if (this.state.selectedExam === item.uid)
                                                this.setState({ selectedExam: {} })
                                            else
                                                this.setState({ selectedExam: item.uid })
                                        }}
                                        onLongPress={() => {
                                            this.setState({ exam: item });
                                            this.ActionSheetForExams.show()

                                        }}
                                        hideChevron
                                    />
                                    {
                                        this.state.selectedExam === item.uid ?
                                            <View style={{ alignSelf: 'center', width: '90%', backgroundColor: 'rgba(0,0,0,0.1)' }}>
                                                {_.toArray(item.examedStudents).map((examedStudent, i) => {
                                                    return <ListItem
                                                        underlayColor={'rgba(255, 255, 255,0.15)'}
                                                        containerStyle={{ backgroundColor: examedStudent.progress === "pending" ? 'rgba(255, 255, 255,0.2)' : examedStudent.progress === "admis" ? "rgba(29, 124, 37,0.7)" : "rgba(204, 24, 45,0.7)", borderBottomColor: 'black', borderLeftColor: 'black', borderRightColor: 'black', borderWidth: 1, borderTopWidth: 0 }}
                                                        titleStyle={{ fontSize: 19, fontWeight: 'bold', color: examedStudent.progress === "respins" ? "white" : 'black' }}
                                                        key={i}
                                                        title={
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Text style={{ fontSize: 19, fontWeight: 'bold', color: examedStudent.progress === "respins" ? "white" : 'black' }}>{examedStudent.nume}</Text>
                                                            </View>}
                                                        subtitle={examedStudent.progress !== "pending" ?
                                                            <View style={{ flexDirection: 'column' }}>
                                                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: examedStudent.progress === "respins" ? "white" : 'black' }}>{examedStudent.progress === "admis" ? "Admis" : examedStudent.progress === "respins" ? "Respins" : ""}</Text>
                                                            </View>
                                                            : null
                                                        }
                                                        onLongPress={() => {
                                                            this.setState({ selectedExamedStudent: examedStudent, id: i, isExamModalVisible: true, exam: item })
                                                        }}
                                                        hideChevron
                                                    />
                                                })}
                                            </View>
                                            : null
                                    }</View>
                        else
                            return <View>
                                <Text style={{ fontSize: 21, fontWeight: 'bold', alignSelf: 'center' }}>{months[item.month]} {item.year}:</Text>
                                <ListItem
                                    underlayColor={'rgba(255, 247, 35, 0.75)'}
                                    leftIcon={<View style={{ flexDirection: 'column', borderRightWidth: 3, borderRightColor: 'red' }}>
                                        <View style={{ width: 75 }}>
                                            <Text style={{ fontSize: 19, fontWeight: '500' }}>{item.day} {monthsShort[item.month]}
                                            </Text>
                                            <Text style={{ fontSize: 16 }}>{item.year}</Text>
                                        </View></View>}
                                    containerStyle={{ backgroundColor: 'rgba(255, 247, 35, 0.8)', borderRadius: 6, margin: 4, borderBottomColor: 'rgba(0,0,0,0)', zIndex: 99, marginBottom: this.state.selectedExam === item.uid ? 0 : 4 }}
                                    title={<Text style={{ fontSize: 21, fontWeight: "bold", marginLeft: 5 }}>Examen: {Object.keys(item.examedStudents).length} elev{Object.keys(item.examedStudents).length != 1 ? "i" : null}</Text>}
                                    onPress={() => {
                                        if (this.state.selectedExam === item.uid)
                                            this.setState({ selectedExam: {} })
                                        else
                                            this.setState({ selectedExam: item.uid })
                                    }}
                                    onLongPress={() => {
                                        this.setState({ exam: item });
                                        this.ActionSheetForExams.show()

                                    }}
                                    hideChevron
                                />
                                {
                                    this.state.selectedExam === item.uid ?
                                        <View style={{ alignSelf: 'center', width: '90%', backgroundColor: 'rgba(0,0,0,0.1)' }}>
                                            {_.toArray(item.examedStudents).map((examedStudent, i) => {
                                                return <ListItem
                                                    underlayColor={'rgba(255, 255, 255,0.15)'}
                                                    containerStyle={{ backgroundColor: examedStudent.progress === "pending" ? 'rgba(255, 255, 255,0.2)' : examedStudent.progress === "admis" ? "rgba(29, 124, 37,0.7)" : "rgba(204, 24, 45,0.7)", borderBottomColor: 'black', borderLeftColor: 'black', borderRightColor: 'black', borderWidth: 1, borderTopWidth: 0 }}
                                                    titleStyle={{ fontSize: 19, fontWeight: 'bold', color: examedStudent.progress === "respins" ? "white" : 'black' }}
                                                    key={i}
                                                    title={
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Text style={{ fontSize: 19, fontWeight: 'bold', color: examedStudent.progress === "respins" ? "white" : 'black' }}>{examedStudent.nume}</Text>
                                                        </View>}
                                                    subtitle={examedStudent.progress !== "pending" ?
                                                        <View style={{ flexDirection: 'column' }}>
                                                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: examedStudent.progress === "respins" ? "white" : 'black' }}>{examedStudent.progress === "admis" ? "Admis" : examedStudent.progress === "respins" ? "Respins" : ""}</Text>
                                                        </View>
                                                        : null
                                                    }
                                                    onLongPress={() => {
                                                        this.setState({ selectedExamedStudent: examedStudent, id: i, isExamModalVisible: true, exam: item })
                                                    }}
                                                    hideChevron
                                                />
                                            })}
                                        </View>
                                        : null
                                }</View>
                    }}
                />
                <Modal
                    visible={this.state.isExamModalVisible}
                    transparent={true}
                    onRequestClose={() => {
                        this.setState({ isExamModalVisible: false })
                    }}
                    animationType={"slide"}
                >
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignContent: 'center' }}>
                        <View style={{ justifyContent: 'center', alignContent: 'center', alignSelf: 'center', width: Dimensions.get('screen').width - 40, backgroundColor: 'white', padding: 20, borderRadius: 6 }}>
                            <Text style={{ alignSelf: 'center', fontSize: 23, fontWeight: 'bold', textAlign: 'center' }} >Adauga calificativul examinarii:</Text>
                            <Text style={{ alignSelf: 'center', fontSize: 21, fontWeight: '200', textAlign: 'center' }} >Examen: <Text style={{ fontWeight: 'bold' }}>{this.state.selectedExamedStudent.nume}</Text></Text>
                            <View style={{ flexDirection: "row", alignSelf: 'center', justifyContent: 'center', alignContent: 'center' }}>
                                <Button
                                    title="Admis"
                                    backgroundColor={this.state.calificativ === "admis" ? "green" : "#1E6EC7"}
                                    containerViewStyle={{ width: 100, alignSelf: 'center', marginTop: 5 }}
                                    borderRadius={2}
                                    onPress={() => {
                                        this.setState({ calificativ: "admis" })
                                    }}
                                />
                                <Button
                                    title="Respins"
                                    backgroundColor={this.state.calificativ === "respins" ? "red" : "#1E6EC7"}
                                    containerViewStyle={{ width: 100, alignSelf: 'center', marginTop: 5 }}
                                    borderRadius={2}
                                    onPress={() => {
                                        this.setState({ calificativ: "respins" })
                                    }}
                                />
                            </View>
                            <Item stackedLabel style={{ borderWidth: 0, borderColor: 'rgba(0,0,0,0)' }}>
                                <Label style={{ color: '#1E6EC7', fontSize: 20, fontWeight: 'bold' }}>Politistul examinator:</Label>
                                <Input style={{ color: '#1E6EC7', fontSize: 18, borderColor: "#1E6EC7", borderWidth: 2, width: '100%', marginRight: 5 }} onChangeText={(politist) => { this.setState({ politist }) }} />
                            </Item>
                            <Button
                                title="Adauga"
                                backgroundColor="#1E6EC7"
                                loading={this.props.addCLoading}
                                containerViewStyle={{ alignSelf: 'center', marginTop: 5, width: '80%' }}
                                borderRadius={2}
                                onPress={() => {
                                    this.setState({ isAskModalVisible: true });
                                }}
                            />
                        </View>
                    </View>
                </Modal>
                <Modal
                    visible={this.state.isAskModalVisible}
                    transparent={true}
                    onRequestClose={() => {
                        this.setState({ isAskModalVisible: false })
                    }}
                    animationType={"slide"}
                >
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignContent: 'center' }}>
                        <View style={{ justifyContent: 'center', alignContent: 'center', alignSelf: 'center', width: Dimensions.get('screen').width - 40, backgroundColor: 'white', padding: 20, borderRadius: 6 }}>
                            <Text style={{ alignSelf: 'center', fontSize: 21, fontWeight: '200', textAlign: 'center' }} >Sunteti sigur ca elevul <Text style={{ fontWeight: 'bold' }}>{this.state.selectedExamedStudent.nume}</Text> a primit calificativul <Text style={{ fontWeight: 'bold' }}>{this.state.calificativ === "admis" ? "Admis" : "Respins"}</Text>{this.state.politist != '' ? " si a fost examinata de " : "?"}<Text style={{ fontWeight: 'bold' }}>{this.state.politist != '' ? `${this.state.politist}?` : null}</Text> Daca da, <Text style={{ fontWeight: 'bold' }}>{this.state.calificativ === "admis" ? "elevul va fi sters si introdus in lista elevilor admisi." : "elevul va fi setat ca inactiv pana cand veti hotara sa reincepeti sedintele."}</Text></Text>
                            <View style={{ flexDirection: "row", alignSelf: 'center', justifyContent: 'center', alignContent: 'center' }}>
                                <Button
                                    title="Da"
                                    backgroundColor="#1E6EC7"
                                    loading={this.props.classCancelDeleteLoading}
                                    containerViewStyle={{ width: 100, alignSelf: 'center', marginTop: 5 }}
                                    borderRadius={2}
                                    onPress={() => {
                                        let wantedStudent = null;
                                        this.props.students.forEach(student => {
                                            if (student.uid === this.state.selectedExamedStudent.uid)
                                                wantedStudent = student;
                                        })
                                        this.setState({ isAskModalVisible: false });
                                        this.props.examAddC({ student: wantedStudent, exam: this.state.exam, examedStudentData: this.state.selectedExamedStudent, id: this.state.id, calificativ: this.state.calificativ, politist: this.state.politist })
                                    }}
                                />
                                <Button
                                    title="Nu"
                                    backgroundColor="#1E6EC7"
                                    containerViewStyle={{ width: 100, alignSelf: 'center', marginTop: 5 }}
                                    borderRadius={2}
                                    onPress={() => {
                                        this.setState({ isAskModalVisible: false })
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    visible={this.props.isExamDeleteModalVisible1}
                    transparent={true}
                    onRequestClose={() => {
                        this.props.examOHDelete1();
                    }}
                    animationType={"slide"}
                >
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignContent: 'center' }}>
                        <View style={{ justifyContent: 'center', alignContent: 'center', alignSelf: 'center', width: Dimensions.get('screen').width - 40, backgroundColor: 'white', padding: 20, borderRadius: 6 }}>
                            <Text style={{ alignSelf: 'center', fontSize: 21, fontWeight: '200', textAlign: 'center' }} >{this.state.ok === true ? <Text style={{ fontWeight: 'bold' }}>Toti elevii au primit un calificativ. Doriti sa stergeti examenul?</Text> : <Text style={{ fontWeight: 'bold' }}>Unul sau mai multi din elevii examinati in aceasta data nu au primit un calificativ. Sunteti sigur ca doriti sa stergeti examenul?</Text>}</Text>
                            <View style={{ flexDirection: "row", alignSelf: 'center', justifyContent: 'center', alignContent: 'center' }}>
                                <Button
                                    title="Da"
                                    backgroundColor={this.state.calificativ === "admis" ? "green" : "#1E6EC7"}
                                    containerViewStyle={{ width: 100, alignSelf: 'center', marginTop: 5 }}
                                    borderRadius={2}
                                    loading={this.props.deleteLoading}
                                    onPress={() => {
                                        this.props.examDelete(this.state.exam.uid)
                                    }}
                                />
                                <Button
                                    title="Nu"
                                    backgroundColor={this.state.calificativ === "respins" ? "red" : "#1E6EC7"}
                                    containerViewStyle={{ width: 100, alignSelf: 'center', marginTop: 5 }}
                                    borderRadius={2}
                                    onPress={() => {
                                        this.props.examOHDelete1();
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
                <ActionSheet
                    ref={o => this.ActionSheetForExams = o}
                    title={
                        <View>
                            <Text style={{ fontSize: 17, color: '#1E6EC7', fontWeight: 'bold', textAlign: 'center' }}>Examen: {Object.keys(this.state.exam.examedStudents).length}</Text>
                        </View>}
                    options={['Editeaza examenul', 'Sterge examenul', 'Anuleaza']}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={1}
                    onPress={(index) => {
                        if (index === 0) {
                            this.props.navigation.navigate('ExamEdit', { day: this.state.exam.day, month: this.state.exam.month, year: this.state.exam.year, selectedStudents: _.toArray(this.state.exam.examedStudents), uid: this.state.exam.uid })
                        }
                        if (index === 1) {
                            let ok = true;
                            this.state.exam.examedStudents.forEach(e => {
                                if (e.progress === "pending")
                                    ok = false;
                            })
                            this.setState({ ok })
                            this.props.examOHDelete1();
                        }
                    }}
                />
            </Gradient>
        )
    }
}

mapStateToProps = (state) => {
    const { exams, students } = state.FetchedData;
    const { addCLoading, addCSuccess, isExamDeleteModalVisible1, deleteLoading } = state.ExamsReducer;
    return { exams, students, addCLoading, addCSuccess, isExamDeleteModalVisible1, deleteLoading };
}

export default connect(mapStateToProps, { examAddC, examOHDelete1, examDelete })(ExamMainPage);