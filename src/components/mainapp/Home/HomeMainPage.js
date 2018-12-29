import React, { Component } from 'react'
import { Text, View, FlatList, ScrollView, Animated, TextInput, Modal, Dimensions } from 'react-native'
import { ListItem, Button } from 'react-native-elements'
import { Icon } from 'native-base';
import { Header } from 'react-native-elements'
import Gradient from 'react-native-css-gradient'
import ListItemFC from '../reusable/ListItemsFC';
import { connect } from 'react-redux'
import { fetchData, classOHCancelDeleteModal, classCancel, classDelete, classOHDeleteModal } from '../../../actions';
import CalendarStrip from 'react-native-calendar-strip';
import { Agenda, LocaleConfig } from 'react-native-calendars'
import _ from 'lodash';
import ListItemForE from '../reusable/ListItemForE';
import ActionSheet from 'react-native-actionsheet';
import { months } from '../../../variables';
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
            selectedStudent: {},
            selectedClass: {}
        }
        this.rendered = [];
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
    }

    onDateSelectedPressFromAgenda(day, month, year) {
        this.setState({ day, month: month - 1, year });
        let classes = []
        this.props.classes.forEach(classData => {
            if (classData.day === day && classData.month === month - 1 && classData.year === year)
                classes.push(classData);
        });
        this.setState({ classes })
    }

    componentWillReceiveProps(nextProps) {
        this.rendered = [];
        let classes = []
        nextProps.classes.forEach(classData => {
            if (classData.day === this.state.day && classData.month === this.state.month && classData.year === this.state.year)
                classes.push(classData);
        });
        this.setState({ classes })
    }

    componentWillMount() {
        this.props.fetchData();
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
        if (item.doneClasses)
            if (item.extraClasses) {
                let finishedNClasses = _.toArray(item.doneClasses);
                let finishedEClasses = _.toArray(item.extraClasses);
                this.props.navigation.navigate('StudentFinishedClasses', { finishedNClasses, finishedEClasses, nume: item.nume })
            }
            else {
                let finishedNClasses = _.toArray(item.doneClasses);
                this.props.navigation.navigate('StudentFinishedClasses', { finishedNClasses, nume: item.nume })
            }
        else
            if (item.extraClasses) {
                let finishedEClasses = _.toArray(item.extraClasses);
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
                rightComponent={<Icon name="add" fontSize={40} onPress={() => this.props.navigation.navigate('ClassCreate')} />}
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
                                    <ListItemForE
                                        onCreateExamPress={() => this.props.navigation.navigate('ExamCreate', { day: this.state.day, month: this.state.month, year: this.state.year })}
                                    />
                                    <FlatList
                                        keyExtractor={(item, i) => `${i}`}
                                        data={this.state.classesSchedule}
                                        extraData={[this.state, this.props]}
                                        renderItem={({ item, index }) => {
                                            let wantedClass = null;
                                            this.state.classes.forEach(classData => {
                                                if (classData.hour === item.hour && classData.minutes === item.minutes) {
                                                    this.rendered[index] = true;
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
                                                if (this.props.students[0]) {
                                                    for (let i = 0; i <= this.props.students.length; i++) {
                                                        if (this.props.students[i].uid === wantedClass.studentUid) {
                                                            wantedStudent = this.props.students[i];
                                                            break;
                                                        }
                                                    }
                                                }
                                                return <ListItemFC
                                                    class={wantedClass}
                                                    student={wantedStudent}
                                                    onListItemProfilePress={() => { this.props.navigation.navigate('StudentProfile', wantedStudent); }}
                                                    onViewCanceledClassesPress={() => this.onViewCanceledClassesPress(wantedStudent)}
                                                    onViewFinishedClassesPress={() => this.onViewFinishedClassesPress(wantedStudent)}
                                                    onLongPress={() => {
                                                        this.setState({ selectedClass: wantedClass, selectedStudent: wantedStudent });
                                                        this.ActionSheet.show();
                                                    }}
                                                />

                                            }
                                            else
                                                return <ListItemFC onClassCreatePress={() => this.onClassCreatePress(item)} scheduledClass={item} />
                                        }}
                                    /></View>
                            </ScrollView>
                            <ActionSheet
                                ref={o => this.ActionSheet = o}
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
                                                    this.props.classCancel({ uid: this.state.selectedClass.uid, studentUid: this.state.selectedClass.studentUid, tip: this.state.selectedClass.tip })
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
                                                    const { uid } = this.state.selectedClass;
                                                    this.props.classDelete(uid)
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
    return { classes, exams, students, isClassCancelDeleteModalVisible, classCancelDeleteLoading, isClassDeleteModalVisible, classDeleteLoading };
}
export default connect(mapStateToProps, { fetchData, classOHCancelDeleteModal, classCancel, classDelete, classOHDeleteModal })(HomeMainPage)