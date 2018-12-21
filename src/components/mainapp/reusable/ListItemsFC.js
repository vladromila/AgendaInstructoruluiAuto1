import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import { connect } from 'react-redux';

class ListItemFC extends Component {
    constructor() {
        super();
        this.state = {
            isVisible: false,
            student: {}
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.class)
            nextProps.students.forEach(student => {
                if (student.uid === nextProps.class.studentUid)
                    this.setState({ student });
            });
    }
    render() {
        return (
            <React.Fragment>
                {this.props.class ? <ListItem
                    onPress={() => {
                        if (this.state.isVisible === true)
                            this.setState({ isVisible: false })
                        else this.setState({ isVisible: true })
                    }}
                    underlayColor={'rgba(245, 15, 15, 0.4)'}
                    containerStyle={{ backgroundColor: 'rgba(245, 15, 15, 0.5)',     borderRadius: 6, margin: 4, borderBottomColor: 'rgba(0,0,0,0)', zIndex: 99 }}
                    leftIcon={<View style={{ flexDirection: 'column', borderRightWidth: 3, borderRightColor: 'red' }}>
                        <View style={{ marginRight: 10 }}>
                            <Text style={{ fontSize: 19, fontWeight: '500' }}>{this.props.class.hour < 10 ? `0${this.props.class.hour}` : `${this.props.class.hour}`}:{this.props.class.minutes >= 0 && this.props.class.minutes < 10 ? `${this.props.class.minutes}0` : `${this.props.class.minutes}`}</Text>
                            <Text style={{ fontSize: 16 }}>{this.props.class.minutes + 30 >= 60 ? `${this.props.class.hour + 2}` : `${this.props.class.hour + 1}`}:{(this.props.class.minutes + 30) % 60 >= 0 && (this.props.class.minutes + 30) % 60 < 10 ? `${(this.props.class.minutes + 30) % 60}0` : `${(this.props.class.minutes + 30) % 60}`}</Text></View></View>}
                    rightIcon={<Icon name={this.state.isVisible===true?"keyboard-arrow-down":"keyboard-arrow-up"} size={40} />}
                    title={<View style={{ marginLeft: 6, flexDirection: 'column' }}>{this.props.class.location?<Text>Locatie:{`${this.props.class.location}`}</Text>:null}<Text style={{ fontSize: 19, fontWeight: '700' }}>{this.state.student.nume}</Text><Text>123123</Text></View>} />
                    :
                    <ListItem
                        containerStyle={{ backgroundColor: 'rgba(165, 229, 102, 0.67)', borderRadius: 6, margin: 4, borderBottomColor: 'rgba(0,0,0,0)', zIndex: 99 }}
                        leftIcon={<View style={{ flexDirection: 'column', borderRightWidth: 3, borderRightColor: 'red' }}>
                            <View style={{ marginRight: 10 }}>  
                                <Text style={{ fontSize: 19, fontWeight: '500' }}>{this.props.scheduledClass.hour < 10 ? `0${this.props.scheduledClass.hour}` : `${this.props.scheduledClass.hour}`}:{this.props.scheduledClass.minutes >= 0 && this.props.scheduledClass.minutes < 10 ? `${this.props.scheduledClass.minutes}0` : `${this.props.scheduledClass.minutes}`}</Text>
                                <Text style={{ fontSize: 16 }}>{this.props.scheduledClass.minutes + 30 >= 60 ? `${this.props.scheduledClass.hour + 2}` : `${this.props.scheduledClass.hour + 1}`}:{(this.props.scheduledClass.minutes + 30) % 60 >= 0 && (this.props.scheduledClass.minutes + 30) % 60 < 10 ? `${(this.props.scheduledClass.minutes + 30) % 60}0` : `${(this.props.scheduledClass.minutes + 30) % 60}`}</Text></View></View>}
                        rightIcon={<Icon name="add" size={40} onPress={this.props.onClassCreatePress}/>}
                        title={<View style={{ marginLeft: 6, flexDirection: 'column' }}><Text>123123</Text><Text style={{ fontSize: 19, fontWeight: '700' }}>123123</Text><Text>123123</Text></View>} />
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    const { students } = state.FetchedData;
    return { students };
}
export default connect(mapStateToProps, {})(ListItemFC)