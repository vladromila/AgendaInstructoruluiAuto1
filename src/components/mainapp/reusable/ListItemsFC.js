import React, { Component } from 'react'
import { Text, View, Dimensions } from 'react-native'
import { ListItem, Icon, Button } from 'react-native-elements'
import { months } from '../../../variables/'

class ListItemFC extends Component {
    constructor() {
        super();
        this.state = {
            isVisible: false
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.class)
            if (nextProps.selectedUid === nextProps.class.uid) {
                this.setState({ isVisible: true })
            }
            else
                this.setState({ isVisible: false })
    }
    render() {
        return (
            <React.Fragment>
                {this.props.class && this.props.student ? <View><ListItem
                    onLongPress={this.props.onLongPress}
                    onPress={this.props.onPress}
                    underlayColor={'rgba(245, 15, 15, 0.4)'}
                    containerStyle={{ backgroundColor: 'rgba(245, 15, 15, 0.5)', borderRadius: 6, margin: 4, borderBottomColor: 'rgba(0,0,0,0)', zIndex: 99 }}
                    leftIcon={<View style={{ flexDirection: 'column', borderRightWidth: 3, borderRightColor: 'red' }}>
                        <View style={{ marginRight: 10 }}>
                            <Text style={{ fontSize: 19, fontWeight: '500' }}>{this.props.class.hour < 10 ? `0${this.props.class.hour}` : `${this.props.class.hour}`}:{this.props.class.minutes >= 0 && this.props.class.minutes < 10 ? `${this.props.class.minutes}0` : `${this.props.class.minutes}`}</Text>
                            <Text style={{ fontSize: 16 }}>{this.props.class.minutes + 30 >= 60 ? `${this.props.class.hour + 2}` : `${this.props.class.hour + 1}`}:{(this.props.class.minutes + 30) % 60 >= 0 && (this.props.class.minutes + 30) % 60 < 10 ? `${(this.props.class.minutes + 30) % 60}0` : `${(this.props.class.minutes + 30) % 60}`}</Text></View></View>}
                    rightIcon={<Icon name={this.state.isVisible === true ? "keyboard-arrow-down" : "keyboard-arrow-up"} size={40} />}
                    title={<View style={{ marginLeft: 6, flexDirection: 'column' }}>{this.props.class.location !== '' && this.props.class.location ? <Text style={{ fontSize: 17, fontWeight: '500', color: 'white' }}>Locatie: <Text style={{ fontWeight: 'bold' }}>{`${this.props.class.location}`}</Text></Text> : null}<Text style={{ fontSize: 19, fontWeight: '700' }}>{this.props.student.nume}</Text>{this.props.class.month===new Date().getMonth()&&this.props.class.year===new Date().getFullYear()&&this.props.class.day===new Date().getDate()?<Text style={{ fontSize: 17, fontWeight: '200' }}>{this.props.student.doneClasses?Object.keys(this.props.student.doneClasses).length<15?"Sedinta de scolarizare":"Sedinta de perfectionare":"Sedinta de scolarizare"}</Text>:null}</View>} />
                    {this.state.isVisible === true ?
                        <View>
                            <View style={{ backgroundColor: 'rgba(245, 15, 15, 0.5)', marginLeft: 10, marginRight: 10, alignSelf: 'center', width: Dimensions.get('screen').width - 20, padding: 5 }}>
                                <Text style={{ fontWeight: "600", fontSize: 18 }}>Date despre sedinta:</Text>
                                {this.props.class.location !== '' && this.props.class.location ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Locatia sedintei: </Text><Text style={{ fontSize: 16, fontWeight: 'bold' }}>{this.props.class.location}</Text>
                                    </View> : null}
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>Data sedintei: </Text><Text style={{ fontSize: 16, fontWeight: 'bold' }}>{this.props.class.day} {months[this.props.class.month]} {this.props.class.year}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>Ora sedintei: </Text><Text style={{ fontSize: 16, fontWeight: 'bold' }}>{this.props.class.hour}:{this.props.class.minutes >= 0 && this.props.class.minutes < 10 ? `0${this.props.class.minutes}` : this.props.class.minutes}</Text>
                                </View>
                            </View>
                            <View style={{ backgroundColor: 'rgba(30, 110, 199,0.3)', marginLeft: 10, marginRight: 10, alignSelf: 'center', width: Dimensions.get('screen').width - 20, padding: 5 }}>
                                <Text style={{ fontWeight: "bold", fontSize: 18 }}>Starea sedintelor:</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: "600", fontSize: 16 }}>Nr. total de sed. efectuate: </Text><Text style={{ fontSize: 16 }}>{this.props.student.doneClassesTotal ? this.props.student.extraClassesTotal ? Object.keys(this.props.student.doneClassesTotal).length + Object.keys(this.props.student.extraClassesTotal).length : Object.keys(this.props.student.doneClassesTotal).length : this.props.student.extraClassesTotal ? Object.keys(this.props.student.extraClassesTotal).length : 0}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: "600", fontSize: 16 }}>Nr. de sed. de scolarizare efectuate: </Text><Text style={{ fontSize: 16 }}>{this.props.student.doneClasses ? Object.keys(this.props.student.doneClasses).length : 0}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: "600", fontSize: 16 }}>Nr. de sed. de perfectionare efectuate: </Text><Text style={{ fontSize: 16 }}>{this.props.student.extraClasses ? Object.keys(this.props.student.extraClasses).length : 0}</Text>
                                </View>
                                <Text style={{ fontWeight: "600", fontSize: 18 }}>Datele complete ale elevului:</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: "600", fontSize: 16 }}>Nume: </Text><Text style={{ fontSize: 16 }}>{this.props.student.nume}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: "600", fontSize: 16 }}>CNP: </Text><Text style={{ fontSize: 16 }}>{this.props.student.cnp}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: "600", fontSize: 16 }}>Nr. de telefon </Text><Text style={{ fontSize: 16 }}>{this.props.student.phone}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: "600", fontSize: 16 }}>Registru: </Text><Text style={{ fontSize: 16 }}>{this.props.student.registru}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: "600", fontSize: 16 }}>Serie: </Text><Text style={{ fontSize: 16 }}>{this.props.student.serie}</Text>
                                </View>
                                <Button
                                    containerViewStyle={{ marginTop: 10 }}
                                    onPress={this.props.onViewFinishedClassesPress}
                                    title={"Lista sedintelor completate"}
                                    backgroundColor={'rgba(30, 110, 199,0.6)'}
                                    textStyle={{ color: 'black', fontWeight: '600', fontSize: 17 }}
                                />
                                <Button
                                    onPress={this.props.onViewCanceledClassesPress}
                                    containerViewStyle={{ marginTop: 5 }}
                                    title={"Lista sedintelor anulate"}
                                    backgroundColor={'rgba(30, 110, 199,0.6)'}
                                    textStyle={{ color: 'black', fontWeight: '600', fontSize: 17 }}
                                />
                                <Button
                                    onPress={this.props.onListItemProfilePress}
                                    containerViewStyle={{ marginTop: 5 }}
                                    title={"Vizualizeaza profilul elevului"}
                                    backgroundColor={'rgba(30, 110, 199,0.6)'}
                                    textStyle={{ color: 'black', fontWeight: '600', fontSize: 17 }}
                                />
                            </View>
                        </View> : null}
                </View> :
                    <ListItem
                        containerStyle={{ backgroundColor: 'rgba(165, 229, 102, 0.67)', borderRadius: 6, margin: 4, borderBottomColor: 'rgba(0,0,0,0)', zIndex: 99 }}
                        leftIcon={<View style={{ flexDirection: 'column', borderRightWidth: 3, borderRightColor: 'red' }}>
                            <View style={{ marginRight: 10 }}>
                                <Text style={{ fontSize: 19, fontWeight: '500' }}>{this.props.scheduledClass.hour < 10 ? `0${this.props.scheduledClass.hour}` : `${this.props.scheduledClass.hour}`}:{this.props.scheduledClass.minutes >= 0 && this.props.scheduledClass.minutes < 10 ? `${this.props.scheduledClass.minutes}0` : `${this.props.scheduledClass.minutes}`}</Text>
                                <Text style={{ fontSize: 16 }}>{this.props.scheduledClass.minutes + 30 >= 60 ? `${this.props.scheduledClass.hour + 2}` : `${this.props.scheduledClass.hour + 1}`}:{(this.props.scheduledClass.minutes + 30) % 60 >= 0 && (this.props.scheduledClass.minutes + 30) % 60 < 10 ? `${(this.props.scheduledClass.minutes + 30) % 60}0` : `${(this.props.scheduledClass.minutes + 30) % 60}`}</Text></View></View>}
                        rightIcon={<Icon name="add" size={40} onPress={this.props.onClassCreatePress} />}
                        title={<View style={{ marginLeft: 6, flexDirection: 'column' }}><Text style={{ fontSize: 19, fontWeight: '700' }}>Nimic Programat</Text></View>} />
                }
            </React.Fragment>
        )
    }
}

export default ListItemFC