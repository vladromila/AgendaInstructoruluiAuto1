import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {Agenda} from 'react-native-calendars'

export default class ScheduleMainPage extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                 <Agenda
                        items={
                            {
                                '2012-05-22': [{ text: 'item 1 - any js object' }],
                                '2012-05-23': [{ text: 'item 2 - any js object' }],
                                '2012-05-24': [],
                                '2012-05-25': [{ text: 'item 3 - any js object' }, { text: 'any js object' }],
                            }}
                        loadItemsForMonth={(month) => { console.log('trigger items loading') }}
                        onCalendarToggled={(calendarOpened) => { console.log(calendarOpened) }}
                        onDayPress={(day) => { console.log('day pressed') }}
                        onDayChange={(day) => { console.log('day changed') }}
                        selected={new Date()}
                        minDate={'2012-05-10'}
                        maxDate={'2012-05-30'}
                        pastScrollRange={1}
                        futureScrollRange={12}
                        renderItem={(item, firstItemInDay) => { return (<View />); }}
                        renderDay={(day, item) => { return (<View />); }}
                        renderEmptyDate={() => { return (<View />); }}
                        renderKnob={() => { return (<View />); }}
                        renderEmptyData={() => { return (<View />); }}
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
                        style={{zIndex:99}}
                    />
            </View>
        )
    }
}
