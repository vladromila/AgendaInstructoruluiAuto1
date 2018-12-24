import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'

class ListItemFC extends Component {
    constructor() {
        super();
        this.state = {
            months: [
                "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"
            ]
        }
    }
    render() {
        return (
            <ListItem
                containerStyle={{ backgroundColor: this.props.isCanceled === true ? 'rgba(239, 0, 0, 0.64)' : 'rgba(165, 229, 102, 0.67)', borderRadius: 6, margin: 4, borderBottomColor: 'rgba(0,0,0,0)', zIndex: 99 }}
                leftIcon={<View style={{ flexDirection: 'column', borderRightWidth: 3, borderRightColor: 'red' }}>
                    <View style={{ marginRight: 10 }}>
                        <Text style={{ fontSize: 19, fontWeight: '500' }}>{this.props.class.hour < 10 ? `0${this.props.class.hour}` : `${this.props.class.hour}`}:{this.props.class.minutes >= 0 && this.props.class.minutes < 10 ? `${this.props.class.minutes}0` : `${this.props.class.minutes}`}</Text>
                        <Text style={{ fontSize: 16 }}>{this.props.class.minutes + 30 >= 60 ? `${this.props.class.hour + 2}` : `${this.props.class.hour + 1}`}:{(this.props.class.minutes + 30) % 60 >= 0 && (this.props.class.minutes + 30) % 60 < 10 ? `${(this.props.class.minutes + 30) % 60}0` : `${(this.props.class.minutes + 30) % 60}`}</Text>
                    </View>
                </View>}
                title={
                    <View style={{ marginLeft: 6 }}>
                        <Text style={{ fontSize: 19, fontWeight: 'bold' }}>{this.props.class.day} {this.state.months[this.props.class.month]} {this.props.class.year}</Text>
                    </View>
                }
                hideChevron={true}
            />
        )
    }
}

export default ListItemFC