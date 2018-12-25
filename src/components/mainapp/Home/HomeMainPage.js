import React, { Component } from 'react'
import { Text, View, FlatList, ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Icon } from 'native-base';
import { Header } from 'react-native-elements'
import Gradient from 'react-native-css-gradient'
import ListItemFC from '../reusable/ListItemsFC';
import { connect } from 'react-redux'
import { fetchData } from '../../../actions';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';

const locale = {
    name: 'fr',
    config: {
        months: 'Ianuarie_Februarie_Martie_Aprilie_Mai_Iunie_Iulie_August_Septembrie_Octombrie_Noiembrie_Decembrie'.split(
            '_'
        ),
        monthsShort: 'Jan_Feb_Mar_Apr_Mai_Iun_Jul_Aug_Sept_Oct_Nov_Dec'.split(
            '_'
        ),
        weekdays: 'Duminica_Luni_Marti_Miercuri_Joi_Vineri_Sambata'.split('_'),
        weekdaysShort: 'D_L_Ma_Mi_J_V_S'.split('_'),
        weekdaysMin: 'D_L_Ma_Mi_J_V_S'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY LT',
            LLLL: 'dddd D MMMM YYYY LT'
        },
        calendar: {
            sameDay: "[Aujourd'hui à] LT",
            nextDay: '[Demain à] LT',
            nextWeek: 'dddd [à] LT',
            lastDay: '[Hier à] LT',
            lastWeek: 'dddd [dernier à] LT',
            sameElse: 'L'
        },
        relativeTime: {
            future: 'dans %s',
            past: 'il y a %s',
            s: 'quelques secondes',
            m: 'une minute',
            mm: '%d minutes',
            h: 'une heure',
            hh: '%d heures',
            d: 'un jour',
            dd: '%d jours',
            M: 'un mois',
            MM: '%d mois',
            y: 'une année',
            yy: '%d années'
        },
        ordinalParse: /\d{1,2}(er|ème)/,
        ordinal: function (number) {
            return number + (number === 1 ? 'er' : 'ème');
        },
        meridiemParse: /PD|MD/,
        isPM: function (input) {
            return input.charAt(0) === 'M';
        },
        // in case the meridiem units are not separated around 12, then implement
        // this function (look at locale/id.js for an example)
        // meridiemHour : function (hour, meridiem) {
        //     return /* 0-23 hour, given meridiem token and hour 1-12 */
        // },
        meridiem: function (hours, minutes, isLower) {
            return hours < 12 ? 'PD' : 'MD';
        },
        week: {
            dow: 1, // Monday is the first day of the week.
        }
    }
};

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
        }
    }
    static navigationOptions = {
        header: null
    }
    async componentDidMount() {
        let date = new Date();
        this.setState({ year: date.getFullYear(), month: date.getMonth(), day: date.getDate(), hour: date.getHours(), minutes: date.getMinutes() })
    }

    onClassCreatePress() {
        this.props.navigation.navigate('ClassCreate');
    }
    onDateSelectedPress(date) {
        this.setState({ year: date.getFullYear(), month: date.getMonth(), day: date.getDate() })
        let classes = []
        this.props.classes.forEach(classData => {
            if (classData.day === date.getDate() && classData.month === date.getMonth() && classData.year === date.getFullYear())
                classes.push(classData);
        });
        this.setState({ classes })
    }
    componentWillReceiveProps(nextProps) {
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
    render() {
        console.log(this.state.classes);
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
                style={{ height: 100, paddingTop: 0, paddingBottom: 10 }}
                calendarHeaderStyle={{ color: 'black' }}
                calendarColor={'#1E6EC7'}
                dateNumberStyle={{ color: 'white' }}
                dateNameStyle={{ color: 'white' }}
                iconContainer={{ flex: 0.1 }}
                onDateSelected={(d) => {
                    let date = new Date(d)
                    this.onDateSelectedPress(date);
                }}
                locale={locale}
            />
            <ScrollView style={{ flex: 1, zIndex: 99 }}>
                <View style={{ zIndex: 99 }}>
                    <FlatList
                        keyExtractor={(item, i) => `${i}`}
                        data={this.state.classesSchedule}
                        extraData={[this.state, this.props]}
                        renderItem={({ item, index }) => {
                            let wantedClass = null;
                            this.state.classes.forEach(classData => {
                                if (classData.id === index) {
                                    wantedClass = classData;
                                }
                            })
                            if (wantedClass)
                                return <ListItemFC class={wantedClass} />
                            else
                                return <ListItemFC onClassCreatePress={() => this.onClassCreatePress()} scheduledClass={item} />
                        }}
                    /></View>
            </ScrollView>
        </Gradient>
        )
    }
}
mapStateToProps = (state) => {
    const { classes, exams } = state.FetchedData
    return { classes, exams };
}
export default connect(mapStateToProps, { fetchData })(HomeMainPage)