import React, { Component } from 'react'
import { Text, View, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import DateTimePicker from 'react-native-modal-datetime-picker';
import Gradient from 'react-native-css-gradient';
import { Button } from 'react-native-elements'

class ClassCreate extends Component {

    constructor() {
        super();
        this.state = {
            id: null,
            day: null,
            month: null,
            year: null,
            minutes: null,
            hour: null,
            locatie: '',
            isDateModalVisible: false,
            isTimeModalVisible: false
        }
    }

    async componentDidMount()
    {
        this.setState({
        })
    }

    render() {
        return (
            <Gradient gradient={`linear-gradient(0deg ,white 0%, #1E6EC7 100% )`} style={{ width: '100%', height: '100%', zIndex: 2, position: 'absolute' }} >
                <Button
                    title="Selecteaza o data"
                    onPress={() => this.setState({ isDateModalVisible: true })}
                />
                <Button
                    title="Selecteaza o ora"
                    onPress={() => this.setState({ isTimeModalVisible: true })}
                />
                <DateTimePicker
                    onConfirm={date => {
                        this.setState({day:date.getDay})
                        this.setState({ isDateModalVisible: false })
                    }}
                    onCancel={() => this.setState({ isDateModalVisible: false })}
                    isVisible={this.state.isDateModalVisible}
                    mode='date'
                />
                <DateTimePicker
                    onConfirm={time => {
                        this.setState({ hour: time.getHours(), minutes: time.getMinutes() })
                        this.setState({ isTimeModalVisible: false })
                    }}
                    onCancel={() => this.setState({ isTimeModalVisible: false })}
                    isVisible={this.state.isTimeModalVisible}
                    mode='time'
                />
            </Gradient>
        )
    }
}
export default connect()(ClassCreate);