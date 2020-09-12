import React, { Component } from 'react'
import { Text, View, FlatList, Modal, Dimensions } from 'react-native'
import { Header, ListItem, Button } from 'react-native-elements'
import { Item, Label, Input } from 'native-base'
import { examAddC, examOHDelete1, examDelete } from '../../../actions/'
import { connect } from 'react-redux'
import { monthsShort, months } from '../../../variables'
import _ from 'lodash';
import ActionSheet from 'react-native-actionsheet';
import firebase from 'firebase';
class TheoryExamsMainPage extends Component {
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
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <Header
                    innerContainerStyles={{ backgroundColor: '#1E6EC7' }}
                    outerContainerStyles={{ borderBottomColor: 'black', backgroundColor: '#1E6EC7', borderBottomWidth: 1 }}
                    centerComponent={<Text style={{ fontSize: 22, fontWeight: '900' }}>Sala</Text>}
                />
                <FlatList
                    data={this.props.theoryExams}
                    extraData={[this.props, this.state]}
                    keyExtractor={(item, i) => `${i}`}
                    renderItem={({ item, index }) => {
                        if (this.props.theoryExams[index - 1])
                            if (new Date(this.props.theoryExams[index - 1].date).getMonth() < new Date(this.props.theoryExams[index].date).getMonth() || new Date(this.props.theoryExams[index - 1].date).getFullYear() < new Date(this.props.theoryExams[index].date).getFullYear())
                                return <View>
                                    <Text style={{ fontSize: 21, fontWeight: 'bold', alignSelf: 'center' }}>{months[new Date(item.date).getMonth()]} {new Date(item.date).getFullYear()}:</Text>
                                    <ListItem
                                        underlayColor={'rgba(255, 247, 35, 0.75)'}
                                        leftIcon={<View style={{ flexDirection: 'column', borderRightWidth: 3, borderRightColor: 'red' }}>
                                            <View style={{ width: 75 }}>
                                                <Text style={{ fontSize: 19, fontWeight: '500' }}>{new Date(item.date).getDate()} {monthsShort[new Date(item.date).getMonth()]}
                                                </Text>
                                                <Text style={{ fontSize: 16 }}>{new Date(item.date).getFullYear()}</Text>
                                            </View></View>}
                                        containerStyle={{ backgroundColor: 'rgba(255, 247, 35, 0.8)', borderRadius: 6, margin: 4, borderBottomColor: 'rgba(0,0,0,0)', zIndex: 99, marginBottom: this.state.selectedExam === item.uid ? 0 : 4 }}
                                        title={<Text style={{ fontSize: 21, fontWeight: "bold", marginLeft: 5 }}>Sala: {Object.keys(item.examedStudents).length} elev{Object.keys(item.examedStudents).length != 1 ? "i" : null}</Text>}
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
                                                        containerStyle={{ backgroundColor: 'rgba(255, 255, 255,0.2)', borderBottomColor: 'black', borderLeftColor: 'black', borderRightColor: 'black', borderWidth: 1, borderTopWidth: 0 }}
                                                        titleStyle={{ fontSize: 19, fontWeight: 'bold', color: 'black' }}
                                                        key={i}
                                                        title={
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Text style={{ fontSize: 19, fontWeight: 'bold', color: 'black' }}>{examedStudent.nume} {new Date(examedStudent.date).getHours() < 10 ? "0" : ""}{new Date(examedStudent.date).getHours()}:{new Date(examedStudent.date).getMinutes() < 10 ? "0" : ""}{new Date(examedStudent.date).getMinutes()}</Text>
                                                            </View>}
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
                                                <Text style={{ fontSize: 19, fontWeight: '500' }}>{new Date(item.date).getDate()} {monthsShort[new Date(item.date).getMonth()]}
                                                </Text>
                                                <Text style={{ fontSize: 16 }}>{new Date(item.date).getFullYear()}</Text>
                                            </View></View>}
                                        containerStyle={{ backgroundColor: 'rgba(255, 247, 35, 0.8)', borderRadius: 6, margin: 4, borderBottomColor: 'rgba(0,0,0,0)', zIndex: 99, marginBottom: this.state.selectedExam === item.uid ? 0 : 4 }}
                                        title={<Text style={{ fontSize: 21, fontWeight: "bold", marginLeft: 5 }}>Sala: {Object.keys(item.examedStudents).length} elev{Object.keys(item.examedStudents).length != 1 ? "i" : null}</Text>}
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
                                                        containerStyle={{ backgroundColor: 'rgba(255, 255, 255,0.2)', borderBottomColor: 'black', borderLeftColor: 'black', borderRightColor: 'black', borderWidth: 1, borderTopWidth: 0 }}
                                                        titleStyle={{ fontSize: 19, fontWeight: 'bold', color: 'black' }}
                                                        key={i}
                                                        title={
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Text style={{ fontSize: 19, fontWeight: 'bold', color: 'black' }}>{examedStudent.nume} {new Date(examedStudent.date).getHours() < 10 ? "0" : ""}{new Date(examedStudent.date).getHours()}:{new Date(examedStudent.date).getMinutes() < 10 ? "0" : ""}{new Date(examedStudent.date).getMinutes()}</Text>
                                                            </View>}
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
                                <Text style={{ fontSize: 21, fontWeight: 'bold', alignSelf: 'center' }}>{months[new Date(item.date).getMonth()]} {new Date(item.date).getFullYear()}:</Text>
                                <ListItem
                                    underlayColor={'rgba(255, 247, 35, 0.75)'}
                                    leftIcon={<View style={{ flexDirection: 'column', borderRightWidth: 3, borderRightColor: 'red' }}>
                                        <View style={{ width: 75 }}>
                                            <Text style={{ fontSize: 19, fontWeight: '500' }}>{new Date(item.date).getDate()} {monthsShort[new Date(item.date).getMonth()]}
                                            </Text>
                                            <Text style={{ fontSize: 16 }}>{new Date(item.date).getFullYear()}</Text>
                                        </View></View>}
                                    containerStyle={{ backgroundColor: 'rgba(255, 247, 35, 0.8)', borderRadius: 6, margin: 4, borderBottomColor: 'rgba(0,0,0,0)', zIndex: 99, marginBottom: this.state.selectedExam === item.uid ? 0 : 4 }}
                                    title={<Text style={{ fontSize: 21, fontWeight: "bold", marginLeft: 5 }}>Sala: {Object.keys(item.examedStudents).length} elev{Object.keys(item.examedStudents).length != 1 ? "i" : null}</Text>}
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
                                                    containerStyle={{ backgroundColor: 'rgba(255, 255, 255,0.2)', borderBottomColor: 'black', borderLeftColor: 'black', borderRightColor: 'black', borderWidth: 1, borderTopWidth: 0 }}
                                                    titleStyle={{ fontSize: 19, fontWeight: 'bold', color: 'black' }}
                                                    key={i}
                                                    title={
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Text style={{ fontSize: 19, fontWeight: 'bold', color: 'black' }}>{examedStudent.nume} {new Date(examedStudent.date).getHours() < 10 ? "0" : ""}{new Date(examedStudent.date).getHours()}:{new Date(examedStudent.date).getMinutes() < 10 ? "0" : ""}{new Date(examedStudent.date).getMinutes()}</Text>
                                                        </View>}
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
                <ActionSheet
                    ref={o => this.ActionSheetForExams = o}
                    title={
                        <View>
                            <Text style={{ fontSize: 17, color: '#1E6EC7', fontWeight: 'bold', textAlign: 'center' }}>Sala: {Object.keys(this.state.exam.examedStudents).length}</Text>
                        </View>}
                    options={['Editeaza sala', 'Sterge sala', 'Anuleaza']}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={1}
                    onPress={(index) => {
                        if (index === 0) {
                            this.props.navigation.navigate('TheoryExamEdit', { day: new Date(this.state.exam.date).getDate(), month: new Date(this.state.exam.date).getMonth(), year: new Date(this.state.exam.date).getFullYear(), selectedStudents: this.state.exam.examedStudents, uid: this.state.exam.uid })
                        }
                        if (index === 1) {
                            firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/theoryExams/${this.state.exam.uid}`)
                                .remove();
                        }
                    }}
                />
            </View>
        )
    }
}

mapStateToProps = (state) => {
    const { theoryExams, students } = state.FetchedData;
    const { addCLoading, addCSuccess, isExamDeleteModalVisible1, deleteLoading } = state.ExamsReducer;
    return { theoryExams, students, addCLoading, addCSuccess, isExamDeleteModalVisible1, deleteLoading };
}

export default connect(mapStateToProps, { examAddC, examOHDelete1, examDelete })(TheoryExamsMainPage);