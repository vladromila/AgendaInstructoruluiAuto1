import React, { Component } from 'react'
import { Text, View, FlatList, ScrollView, Animated, TextInput, Modal, Dimensions, NetInfo, AsyncStorage } from 'react-native'
import { ListItem, Button, Icon } from 'react-native-elements'
import { Header } from 'react-native-elements'
import Gradient from 'react-native-css-gradient'
import ListItemFC from '../reusable/ListItemsFC';
import { connect } from 'react-redux'
import { fetchData, classOHCancelDeleteModal, classCancel, classDelete, classOHDeleteModal, examAddC, examOHDelete, examDelete, connectionStatusChange, fetchClassesFromLocalStorage, fetchStudentsFromLocalStorage, fetchExamsFromLocalStorage, fetchFinishedStudentsFromLocalStorage, fetchInStudentsFromLocalStorage, fetchInfoFromLocalStorage, fetchRStudentsFromLocalStorage } from '../../../actions';
import CalendarStrip from 'react-native-calendar-strip';
import { Agenda, LocaleConfig } from 'react-native-calendars'
import _ from 'lodash';
import { Item, Input, Label } from 'native-base'
import ActionSheet from 'react-native-actionsheet';
import { months, monthsShort } from '../../../variables';
const XDate = require('xdate');

LocaleConfig.locales['ro'] = {
    monthNames: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'],
    monthNamesShort: ['Ian.', 'Feb.', 'Mar.', 'Apr.', 'Mai.', 'Iun.', 'Iul.', 'Aug.', 'Sept.', 'Oct.', 'Noi.', 'Dec.'],
    dayNames: ['Duminica', 'Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata'],
    dayNamesShort: ['Dum.', 'Lun.', 'Mar.', 'Mie.', 'Joi', 'Vin.', 'Sam.']
};
LocaleConfig.defaultLocale = 'ro';

class HomeMainPage extends Component {
    constructor() {
        super();
        this.state = {
            classes: [],
            exam: null,
            classesSchedule: [
                { hour: 8, minutes: 0 },
                { hour: 9, minutes: 30 },
                { hour: 11, minutes: 0 },
                { hour: 12, minutes: 30 },
                { hour: 14, minutes: 0 },
                { hour: 15, minutes: 30 },
                { hour: 17, minutes: 0 },
                { hour: 18, minutes: 30 },
                { hour: 20, minutes: 0 }
            ],
            day: null,
            month: null,
            year: null,
            minutes: null,
            hour: null,
            isExamVisible: false,
            isExamModalVisible: false,
            isAskModalVisible: false,
            selectedStudent: {},
            selectedExamedStudent: {},
            calificativ: '',
            politist: '',
            selectedClass: {},
            ok: false,
            selectedUid: null
        }
        this.handleFirstConnectivityChange = this.handleFirstConnectivityChange.bind(this)
    }
    static navigationOptions = {
        header: null
    }
    parseDate(d) {
        function padNumber(n) {
            if (n < 10) {
                return '0' + n;
            }
            return n;
        }
        if (!d) {
            return;
        } else if (d.timestamp) {
            return XDate(d.timestamp, true);
        } else if (d instanceof XDate) {
            return XDate(d.toString('yyyy-MM-dd'), true);
        } else if (d.getTime) {
            const dateString = d.getFullYear() + '-' + padNumber((d.getMonth() + 1)) + '-' + padNumber(d.getDate());
            return XDate(dateString, true);
        } else if (d.year) {
            const dateString = d.year + '-' + padNumber(d.month) + '-' + padNumber(d.day);
            return XDate(dateString, true);
        } else if (d) {
            return XDate(d, true);
        }
    }

    async componentDidMount() {
        NetInfo.isConnected.fetch().then((isConnected) => {
            this.props.connectionStatusChange(isConnected)
        })
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.handleFirstConnectivityChange
        );
        let date = new Date();
        this.setState({ year: date.getFullYear(), month: date.getMonth(), day: date.getDate(), hour: date.getHours(), minutes: date.getMinutes() })
    }

    onClassCreatePress(item) {
        this.props.navigation.navigate('ClassCreate', { day: this.state.day, month: this.state.month, year: this.state.year, hour: item.hour, minutes: item.minutes });
    }

    onDateSelectedPressFromCS(date) {

        this.agenda.props.onDayPress(new Date(date.getFullYear(), date.getMonth(), date.getDate()))
        this.agenda.setState({
            selectedDay: this.parseDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()))
        })
        this.setState({ year: date.getFullYear(), month: date.getMonth(), day: date.getDate() });

        let classes = []
        this.props.classes.forEach(classData => {
            if (classData.day === date.getDate() && classData.month === date.getMonth() && classData.year === date.getFullYear())
                classes.push(classData);
        });
        this.setState({ classes })
        let wantedExam = null;
        this.props.exams.forEach(exam => {
            if (exam.day === date.getDate() && exam.month === date.getMonth() && exam.year === date.getFullYear()) {
                wantedExam = exam
            }
        });
        if (wantedExam)
            this.setState({ exam: wantedExam, isExamVisible: false })
        else
            this.setState({ exam: null, isExamVisible: false });
    }

    onDateSelectedPressFromAgenda(day, month, year) {
        this.setState({ day, month: month - 1, year });
        let classes = []
        this.props.classes.forEach(classData => {
            if (classData.day === day && classData.month === month - 1 && classData.year === year)
                classes.push(classData);
        });
        this.setState({ classes })
        let wantedExam = null;
        this.props.exams.forEach(exam => {
            if (exam.day === day && exam.month === month - 1 && exam.year === year)
                wantedExam = exam;
        });
        if (wantedExam)
            this.setState({ exam: wantedExam, isExamVisible: false })
        else
            this.setState({ exam: null, isExamVisible: false });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.addCSuccess === true)
            this.setState({ isExamModalVisible: false, politist: '', calificativ: '', selectedExamedStudent: {} })
        let classes = []
        nextProps.classes.forEach(classData => {
            if (classData.day === this.state.day && classData.month === this.state.month && classData.year === this.state.year)
                classes.push(classData);
        });
        let exam = null;
        nextProps.exams.forEach(examC => {
            if (examC.year === this.state.year && examC.month === this.state.month && examC.day === this.state.day)
                exam = examC;
        })
        if (exam)
            this.setState({ exam })
        else
            this.setState({ exam: null })
        this.setState({ classes, isExamVisible: false })
    }

    handleFirstConnectivityChange(connectionInfo) {
        this.props.connectionStatusChange(connectionInfo)
    }

    componentWillMount() {
        this.props.fetchData();
        AsyncStorage.getItem('classes')
            .then((value) => {
                if (value !== null)
                    this.props.fetchClassesFromLocalStorage({ classes: JSON.parse(value) });
            })
        AsyncStorage.getItem('students')
            .then((value) => {
                if (value !== null)
                    this.props.fetchStudentsFromLocalStorage({ students: JSON.parse(value) });
            })
        AsyncStorage.getItem('exams')
            .then((value) => {
                if (value !== null)
                    this.props.fetchExamsFromLocalStorage({ exams: JSON.parse(value) });
            })
        AsyncStorage.getItem('inStudents')
            .then((value) => {
                if (value !== null)
                    this.props.fetchInStudentsFromLocalStorage({ inStudents: JSON.parse(value) });
            })
        AsyncStorage.getItem('finishedStudents')
            .then((value) => {
                if (value !== null)
                    this.props.fetchFinishedStudentsFromLocalStorage({ finishedStudents: JSON.parse(value) });
            })
        AsyncStorage.getItem('rStudents')
            .then((value) => {
                if (value !== null)
                    this.props.fetchRStudentsFromLocalStorage({ rStudents: JSON.parse(value) });
            })
        AsyncStorage.getItem('info')
            .then((value) => {
                if (value !== null)
                    this.props.fetchInfoFromLocalStorage({ info: JSON.parse(value) });
            })
    }

    compareClasses(s1, s2, sClass) {
        let dif1 = (sClass.hour - s1.hour) * 60 - s1.minutes + sClass.minutes;
        let dif2 = (s2.hour - sClass.hour) * 60 - sClass.minutes + s2.minutes;
        if (dif1 < dif2) {
            return 1;
        }
        if (dif2 < dif1)
            return 2;
        if (dif1 === dif2)
            return 3;
    }

    onViewFinishedClassesPress(item) {
        if (item.doneClassesTotal)
            if (item.extraClassesTotal) {
                let finishedNClasses = _.toArray(item.doneClassesTotal);
                let finishedEClasses = _.toArray(item.extraClassesTotal);
                this.props.navigation.navigate('StudentFinishedClasses', { finishedNClasses, finishedEClasses, nume: item.nume })
            }
            else {
                let finishedNClasses = _.toArray(item.doneClassesTotal);
                this.props.navigation.navigate('StudentFinishedClasses', { finishedNClasses, nume: item.nume })
            }
        else
            if (item.extraClassesTotal) {
                let finishedEClasses = _.toArray(item.extraClassesTotal);
                this.props.navigation.navigate('StudentFinishedClasses', { finishedEClasses, nume: item.nume })
            }
            else {
                this.props.navigation.navigate('StudentFinishedClasses', { nume: item.nume })
            }
    }
    onViewCanceledClassesPress(item) {
        if (item.canceledClasses) {
            let canceledClasses = _.toArray(item.canceledClasses);
            this.props.navigation.navigate('StudentCanceledClasses', { canceledClasses, nume: item.nume })
        }
        else
            this.props.navigation.navigate('StudentCanceledClasses', { nume: item.nume })
    }


    render() {
        return (<Gradient gradient={`linear-gradient(0deg ,white 0%, #1E6EC7 100% )`} style={{ width: '100%', height: '100%', zIndex: 2, position: 'absolute' }} >
            <Header
                innerContainerStyles={{ backgroundColor: '#1E6EC7' }}
                outerContainerStyles={{ backgroundColor: '#1E6EC7', borderBottomWidth: 0 }}
                centerComponent={<Text style={{ fontSize: 22, fontWeight: '900' }}>Programul Zilei</Text>}
            />
            <CalendarStrip
                selectedDate={new Date(this.state.year, this.state.month, this.state.day, this.state.hour, this.state.minutes)}
                calendarAnimation={{ type: 'sequence', duration: 30 }}
                daySelectionAnimation={{ type: 'background', duration: 300, highlightColor: 'white' }}
                style={{ height: 100, paddingTop: 0, paddingBottom: 10, position: 'absolute', top: 70, zIndex: 999, width: '100%' }}
                calendarHeaderStyle={{ color: 'black' }}
                calendarColor={'#1E6EC7'}
                dateNumberStyle={{ color: 'white' }}
                dateNameStyle={{ color: 'white' }}
                iconContainer={{ flex: 0.1 }}
                onDateSelected={(d) => {
                    let date = new Date(d)
                    this.onDateSelectedPressFromCS(date);
                }}
            />
            <Agenda
                ref={agenda => this.agenda = agenda}
                items={
                    {
                        '2012-05-22': [{ text: 'item 1 - any js object' }],
                        '2012-05-23': [{ text: 'item 2 - any js object' }],
                        '2012-05-24': [],
                        '2012-05-25': [{ text: 'item 3 - any js object' }, { text: 'any js object' }],
                    }}
                loadItemsForMonth={(month) => { }}
                onCalendarToggled={(calendarOpened) => { console.log(calendarOpened) }}
                onDayPress={(date) => { this.onDateSelectedPressFromAgenda(date.day, date.month, date.year) }}
                onDayChange={(day) => { console.log('day changed') }}
                minDate={new Date()}
                maxDate={'2020-05-30'}
                pastScrollRange={1}
                futureScrollRange={12}
                renderEmptyData={() => {
                    return (
                        <Gradient gradient={`linear-gradient(0deg ,white 0%, #1E6EC7 130% )`} style={{ width: '100%', height: '100%', zIndex: 2, position: 'absolute' }} >
                            <ScrollView style={{ flex: 1, zIndex: 99, backgroundColor: 'rgba(0,0,0,0)' }}>
                                <View style={{ zIndex: 99, backgroundColor: 'rgba(0,0,0,0)' }}>
                                    {this.state.exam ?
                                        <View>
                                            <ListItem
                                                underlayColor={'rgba(255,0,0,0.9)'}
                                                leftIcon={<View style={{ flexDirection: 'column', borderRightWidth: 3, borderRightColor: 'white' }}>
                                                    <View style={{ marginRight: 10 }}>
                                                        <Text style={{ fontSize: 19, fontWeight: '500', color: 'white' }}>{this.state.day} {monthsShort[this.state.month]}
                                                        </Text>
                                                        <Text style={{ fontSize: 16, color: 'white' }}>{this.state.year}</Text>
                                                    </View></View>}
                                                containerStyle={{ backgroundColor: 'red', borderRadius: 6, margin: 4, borderBottomColor: 'rgba(0,0,0,0)', zIndex: 99, marginBottom: this.state.isExamVisible === true ? 0 : 4 }}
                                                title={<Text style={{ fontSize: 21, fontWeight: "bold", marginLeft: 5, color: 'white' }}>Examen: {Object.keys(this.state.exam.examedStudents).length} elev{Object.keys(this.state.exam.examedStudents).length != 1 ? "i" : null}</Text>}
                                                onPress={() => this.setState({ isExamVisible: !this.state.isExamVisible })}
                                                onLongPress={() => this.ActionSheetForExams.show()}
                                                hideChevron
                                            />
                                            {this.state.isExamVisible === true ?
                                                <View style={{ alignSelf: 'center', width: '90%', backgroundColor: 'rgba(0,0,0,0.1)' }}>
                                                    {_.toArray(this.state.exam.examedStudents).map((examedStudent, i) => {
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
                                                                this.setState({ selectedExamedStudent: examedStudent, id: i, isExamModalVisible: true })
                                                            }}
                                                            hideChevron
                                                        />
                                                    })}
                                                </View>
                                                : null}
                                        </View>
                                        :
                                        <ListItem
                                            containerStyle={{ backgroundColor: 'rgba(255, 247, 35, 0.8)', borderRadius: 6, margin: 4, borderBottomColor: 'rgba(0,0,0,0)', zIndex: 99 }}
                                            title={<Text style={{ fontSize: 21, fontWeight: "bold" }}>Nici-un examen programat</Text>}
                                            rightIcon={<Icon name="add" size={40} color="black"
                                                onPress={() => this.props.navigation.navigate('ExamCreate', { day: this.state.day, month: this.state.month, year: this.state.year })} />}
                                        />}
                                    <FlatList
                                        keyExtractor={(item, i) => `${i}`}
                                        data={this.state.classesSchedule}
                                        extraData={[this.state, this.props]}
                                        renderItem={({ item, index }) => {
                                            let wantedClass = null;
                                            this.state.classes.forEach(classData => {
                                                if (classData.hour === item.hour && classData.minutes === item.minutes) {
                                                    wantedClass = classData;
                                                }
                                                else {
                                                    if (classData.hour < item.hour) {
                                                        if (index === 0) {
                                                            wantedClass = classData;
                                                        }
                                                        else {
                                                            if (this.compareClasses(this.state.classesSchedule[index - 1], item, classData) === 2) {
                                                                wantedClass = classData;
                                                            }
                                                        }
                                                    }
                                                    if (classData.hour === item.hour) {
                                                        if (this.compareClasses(item, this.state.classesSchedule[index + 1], classData) === 1) {
                                                            wantedClass = classData;
                                                        }
                                                        if (this.compareClasses(item, this.state.classesSchedule[index + 1], classData) === 3) {
                                                            wantedClass = classData;
                                                        }

                                                    }
                                                    if (classData.hour > item.hour) {
                                                        if (this.state.classesSchedule[index + 1]) {
                                                            if (this.compareClasses(item, this.state.classesSchedule[index + 1], classData) === 1) {
                                                                wantedClass = classData;
                                                            }
                                                            if (this.compareClasses(item, this.state.classesSchedule[index + 1], classData) === 3) {
                                                                wantedClass = classData;
                                                            }
                                                        }
                                                        else
                                                            wantedClass = classData;
                                                    }
                                                }
                                            })
                                            if (wantedClass) {
                                                let wantedStudent = {}
                                                this.props.students.forEach(student => {
                                                    if (student.uid === wantedClass.studentUid)
                                                        wantedStudent = student;
                                                })
                                                return <ListItemFC
                                                    class={wantedClass}
                                                    student={wantedStudent}
                                                    onListItemProfilePress={() => { this.props.navigation.navigate('StudentProfile', wantedStudent); }}
                                                    onViewCanceledClassesPress={() => this.onViewCanceledClassesPress(wantedStudent)}
                                                    onViewFinishedClassesPress={() => this.onViewFinishedClassesPress(wantedStudent)}
                                                    selectedUid={this.state.selectedUid}
                                                    onLongPress={() => {
                                                        this.setState({ selectedClass: wantedClass, selectedStudent: wantedStudent });
                                                        this.ActionSheetForClasses.show();
                                                    }}
                                                    onPress={() => {
                                                        this.setState({ selectedUid: this.state.selectedUid === wantedClass.uid ? null : wantedClass.uid })
                                                    }}
                                                />

                                            }
                                            else
                                                return <ListItemFC onClassCreatePress={() => this.onClassCreatePress(item)} scheduledClass={item} />
                                        }}
                                    /></View>
                            </ScrollView>
                            <Modal
                                visible={this.props.isExamDeleteModalVisible}
                                transparent={true}
                                onRequestClose={() => {
                                    this.props.examOHDelete();
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
                                                    this.props.examOHDelete();
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </Modal>
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
                            <ActionSheet
                                ref={o => this.ActionSheetForExams = o}
                                title={
                                    <View>
                                        {this.state.exam ?
                                            <Text style={{ fontSize: 17, color: '#1E6EC7', fontWeight: 'bold', textAlign: 'center' }}>Examen: {Object.keys(this.state.exam.examedStudents).length}</Text> : null}
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
                                        _.toArray(this.state.exam.examedStudents).forEach(e => {
                                            if (e.progress === "pending")
                                                ok = false;
                                        })
                                        this.setState({ ok })
                                        this.props.examOHDelete();
                                    }
                                }}
                            />
                            <ActionSheet
                                ref={o => this.ActionSheetForClasses = o}
                                title={
                                    <View>
                                        <Text style={{ fontSize: 17, color: '#1E6EC7', fontWeight: 'bold', textAlign: 'center' }}>{this.state.selectedClass.tip === "normala" ? "Sed. de scolarizare" : "Sed. de perfectionare"}: {this.state.selectedStudent.nume}</Text>
                                    </View>}
                                options={['Editeaza sedinta', 'Contorizeaza Sedinta', 'Sterge Sedinta', 'Anuleaza']}
                                cancelButtonIndex={3}
                                destructiveButtonIndex={2}
                                onPress={(index) => {
                                    if (index === 0)
                                        this.props.navigation.navigate('ClassEdit', { ...this.state.selectedClass, selectedStudent: this.state.selectedStudent })
                                    if (index === 1)
                                        this.props.classOHDeleteModal();
                                    if (index === 2)
                                        this.props.classOHCancelDeleteModal();
                                }}
                            />
                            <Modal
                                visible={this.props.isClassCancelDeleteModalVisible}
                                transparent={true}
                                onRequestClose={() => {
                                    this.props.classOHCancelDeleteModal();
                                }}
                                animationType={"slide"}
                            >
                                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignContent: 'center' }}>
                                    <View style={{ justifyContent: 'center', alignContent: 'center', alignSelf: 'center', width: Dimensions.get('screen').width - 40, backgroundColor: 'white', padding: 20, borderRadius: 6 }}>
                                        <Text style={{ alignSelf: 'center', fontSize: 21, fontWeight: '200', textAlign: 'center' }} >Sunteti sigur ca doriti sa stergeti sedinta de pe <Text style={{ fontWeight: 'bold' }}>{this.state.selectedClass.day} {months[this.state.selectedClass.month]} {this.state.selectedClass.year}</Text> cu <Text style={{ fontWeight: 'bold' }}>{this.state.selectedStudent.nume} fara sa o contorizati</Text>? Daca da, <Text style={{ fontWeight: 'bold' }}>se va elimina o sedinta din contorul sedintelor de {this.state.selectedClass.tip === "normala" ? "scolarizare" : "perfectionare"} ale elevului.</Text></Text>
                                        <View style={{ flexDirection: "row", alignSelf: 'center', justifyContent: 'center', alignContent: 'center' }}>
                                            <Button
                                                title="Da"
                                                backgroundColor="#1E6EC7"
                                                loading={this.props.classCancelDeleteLoading}
                                                containerViewStyle={{ width: 100, alignSelf: 'center', marginTop: 5 }}
                                                borderRadius={2}
                                                onPress={() => {
                                                    this.props.classCancel({ selectedClass: this.state.selectedClass })
                                                }}
                                            />
                                            <Button
                                                title="Nu"
                                                backgroundColor="#1E6EC7"
                                                containerViewStyle={{ width: 100, alignSelf: 'center', marginTop: 5 }}
                                                borderRadius={2}
                                                onPress={() => {
                                                    this.props.classOHCancelDeleteModal();
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                            <Modal
                                visible={this.props.isClassDeleteModalVisible}
                                transparent={true}
                                onRequestClose={() => {
                                    this.props.classOHCancelDeleteModal();
                                }}
                                animationType={"slide"}
                            >
                                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignContent: 'center' }}>
                                    <View style={{ justifyContent: 'center', alignContent: 'center', alignSelf: 'center', width: Dimensions.get('screen').width - 40, backgroundColor: 'white', padding: 20, borderRadius: 6 }}>
                                        <Text style={{ alignSelf: 'center', fontSize: 21, fontWeight: '200', textAlign: 'center' }} >Sunteti sigur ca doriti sa contorizati sedinta de pe <Text style={{ fontWeight: 'bold' }}>{this.state.selectedClass.day} {months[this.state.selectedClass.month]} {this.state.selectedClass.year}</Text> cu <Text style={{ fontWeight: 'bold' }}>{this.state.selectedStudent.nume}</Text>?</Text>
                                        <View style={{ flexDirection: "row", alignSelf: 'center', justifyContent: 'center', alignContent: 'center' }}>
                                            <Button
                                                title="Da"
                                                backgroundColor="#1E6EC7"
                                                loading={this.props.classDeleteLoading}
                                                containerViewStyle={{ width: 100, alignSelf: 'center', marginTop: 5 }}
                                                borderRadius={2}
                                                onPress={() => {
                                                    this.props.classDelete({ selectedClass: this.state.selectedClass })
                                                }}
                                            />
                                            <Button
                                                title="Nu"
                                                backgroundColor="#1E6EC7"
                                                containerViewStyle={{ width: 100, alignSelf: 'center', marginTop: 5 }}
                                                borderRadius={2}
                                                onPress={() => {
                                                    this.props.classOHDeleteModal();
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </Gradient>
                    );
                }}
                rowHasChanged={(r1, r2) => { return r1.text !== r2.text }}
                markedDates={{
                    '2012-05-16': { selected: true, marked: true },
                    '2012-05-17': { marked: true },
                    '2012-05-18': { disabled: true }
                }}
                onRefresh={() => console.log('refreshing...')}
                refreshing={false}
                refreshControl={null}
                theme={{
                    agendaDayTextColor: 'yellow',
                    agendaDayNumColor: 'green',
                    agendaTodayColor: 'red',
                    agendaKnobColor: '#1E6EC7'
                }}
                firstDay={1}
                hideKnob={false}
                style={{ zIndex: 99, marginTop: 22, backgroundColor: 'rgba(0,0,0,0)' }}
            />
        </Gradient>
        )
    }
}
mapStateToProps = (state) => {
    const { classes, exams, students } = state.FetchedData
    const { isClassCancelDeleteModalVisible, classCancelDeleteLoading, isClassDeleteModalVisible, classDeleteLoading } = state.ClassesReducer;
    const { addCLoading, addCSuccess, isExamDeleteModalVisible, deleteLoading } = state.ExamsReducer;
    return { classes, exams, students, isClassCancelDeleteModalVisible, classCancelDeleteLoading, isClassDeleteModalVisible, classDeleteLoading, addCLoading, addCSuccess, isExamDeleteModalVisible, deleteLoading };
}
export default connect(mapStateToProps, { fetchData, classOHCancelDeleteModal, classCancel, classDelete, classOHDeleteModal, examAddC, examOHDelete, examDelete, connectionStatusChange, fetchClassesFromLocalStorage, fetchStudentsFromLocalStorage, fetchExamsFromLocalStorage, fetchFinishedStudentsFromLocalStorage, fetchInStudentsFromLocalStorage, fetchInfoFromLocalStorage, fetchRStudentsFromLocalStorage })(HomeMainPage)