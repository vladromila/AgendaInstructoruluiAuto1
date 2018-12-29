import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Agenda, LocaleConfig } from 'react-native-calendars'
import { Header, Icon } from 'react-native-elements';
import CalendarStrip from 'react-native-calendar-strip';
const XDate = require('xdate');
const locale = {
    name: 'ro',
    config: {
        months: 'Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre'.split(
            '_'
        ),
        monthsShort: 'Janv_Févr_Mars_Avr_Mai_Juin_Juil_Août_Sept_Oct_Nov_Déc'.split(
            '_'
        ),
        weekdays: 'Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi'.split('_'),
        weekdaysShort: 'Dim_Lun_Mar_Mer_Jeu_Ven_Sam'.split('_'),
        weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
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
            doy: 4 // The week that contains Jan 4th is the first week of the year.
        }
    }
}
LocaleConfig.locales['ro'] = {
    monthNames: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'],
    monthNamesShort: ['Ian.', 'Feb.', 'Mar.', 'Apr.', 'Mai.', 'Iun.', 'Iul.', 'Aug.', 'Sept.', 'Oct.', 'Noi.', 'Dec.'],
    dayNames: ['Duminica', 'Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata'],
    dayNamesShort: ['Dum.', 'Lun.', 'Mar.', 'Mie.', 'Joi', 'Vin.', 'Sam.']
};
LocaleConfig.defaultLocale = 'ro';
export default class ScheduleMainPage extends Component {

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

    async componentWillMount() {
        let date = new Date();
        this.setState({ year: date.getFullYear(), month: date.getMonth(), day: date.getDate() + 1, hour: date.getHours(), minutes: date.getMinutes() })
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
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    centerComponent={<Text>ProgramViitor</Text>}
                    leftComponent={<Icon size={40} name="keyboard-arrow-left" />}
                    rightComponent={<Icon size={40} name="keyboard-arrow-right" onPress={() => {

                        this.agenda.props.onDayPress(new Date(this.state.year, this.state.month, this.state.day + 1))
                        this.setState({ day: this.state.day + 1 });
                        this.agenda.setState({
                            selectedDay: this.parseDate(new Date(this.state.year, this.state.month, this.state.day))
                        })

                    }} />} />
                <CalendarStrip
                    locale={{
                        name: 'ro',
                        config: {
                            months: 'Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre'.split(
                                '_'
                            ),
                            monthsShort: 'Janv_Févr_Mars_Avr_Mai_Juin_Juil_Août_Sept_Oct_Nov_Déc'.split(
                                '_'
                            ),
                            weekdays: 'Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi'.split('_'),
                            weekdaysShort: 'Dim_Lun_Mar_Mer_Jeu_Ven_Sam'.split('_'),
                            weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
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
                                dow: 2, // Monday is the first day of the week.
                                doy: 4 // The week that contains Jan 4th is the first week of the year.
                            }
                        }
                    }}
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
                    onDayPress={(day) => { this.setState({ year: day.year, month: day.month - 1, day: day.day }) }}
                    onDayChange={(day) => { console.log('day changed') }}
                    minDate={new Date()}
                    maxDate={'2020-05-30'}
                    pastScrollRange={1}
                    futureScrollRange={12}
                    renderItem={(item, firstItemInDay) => { return (<View />); }}
                    renderDay={(day, item) => { return (<View />); }}
                    renderEmptyDate={() => { return (<View ><Text>hii!</Text></View>); }}
                    renderEmptyData={() => { return (<View ><Text>hii!</Text></View>); }}
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
                        agendaKnobColor: 'blue'
                    }}
                    firstDay={1}
                    hideKnob={false}
                    style={{ zIndex: 99, marginTop: 30 }}
                />
            </View>
        )
    }
}
