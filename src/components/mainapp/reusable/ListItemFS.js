import React from 'react';
import { ScrollView, View, Text, Dimensions, TouchableHighlight } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';

class ListItemFS extends React.Component {
    constructor() {
        super();
        this.state = {
            isVisible: false
        }
    }

    render() {
        return (
            <View style={{ justifyContent: 'center', alignContent: 'center' }}>
                <ListItem
                    title={<Text style={{ color: 'black', fontSize: 20, fontWeight: "bold" }}>{this.props.student.nume}</Text>}
                    subtitle={<Text style={{ color: 'black', fontSize: 18, fontWeight: "800" }}>{this.props.student.phone}</Text>}
                    underlayColor={this.props.isInactive === false ? 'rgba(30, 110, 199,0.5)' : 'rgba(239, 242, 55,0.5)'}
                    containerStyle={{ backgroundColor: this.props.isInactive === false ? 'rgba(30, 110, 199,0.4)' : 'rgba(239, 242, 55,0.4)', borderRadius: 10, marginTop: 4, marginLeft: 4, marginRight: 4, marginBottom: this.state.isVisible === true ? 0 : 4, borderColor: 'black', borderWidth: 1, zIndex: 99 }}
                    onLongPress={this.props.onLongPress}
                    onPress={() => {
                        if (this.state.isVisible === true)
                            this.setState({ isVisible: false })
                        else
                            this.setState({ isVisible: true })
                    }}
                    rightIcon={<Icon name={this.state.isVisible === true ? "keyboard-arrow-down" : "keyboard-arrow-up"} size={40} />}
                />
                {this.state.isVisible === true ?
                    <View style={{ backgroundColor: this.props.isInactive === false ? 'rgba(30, 110, 199,0.3)' : 'rgba(239, 242, 55,0.3)', marginLeft: 10, marginRight: 10, alignSelf: 'center', width: Dimensions.get('screen').width - 20, padding: 5 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Starea sedintelor:</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Nr. total de sed. efectuate: </Text><Text style={{ fontSize: 16 }}>{this.props.student.doneClasses ? this.props.student.extraClasses ? Object.keys(this.props.student.doneClasses).length + Object.keys(this.props.student.extraClasses).length : Object.keys(this.props.student.doneClasses).length : this.props.student.extraClasses ? Object.keys(this.props.student.extraClasses).length : 0}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Nr. de sed. de scolarizare efectuate: </Text><Text style={{ fontSize: 16 }}>{this.props.student.doneClasses ? Object.keys(this.props.student.doneClasses).length : 0}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Nr. de sed. de perfectionare efectuate: </Text><Text style={{ fontSize: 16 }}>{this.props.student.extraClasses ? Object.keys(this.props.student.extraClasses).length : 0}</Text>
                        </View>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Date complete:</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Nume: </Text><Text style={{ fontSize: 16 }}>{this.props.student.nume}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16 }}>CNP: </Text><Text style={{ fontSize: 16 }}>{this.props.student.cnp}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Nr. de telefon </Text><Text style={{ fontSize: 16 }}>{this.props.student.phone}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Registru: </Text><Text style={{ fontSize: 16 }}>{this.props.student.registru}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Serie: </Text><Text style={{ fontSize: 16 }}>{this.props.student.serie}</Text>
                        </View>
                        <Button
                            containerViewStyle={{ marginTop: 10 }}
                            onPress={this.props.onViewFinishedClassesPress}
                            title={"Lista sedintelor completate"}
                            backgroundColor={'rgba(30, 110, 199,0.6)'}
                            textStyle={{ color: 'black', fontWeight: 'bold' }}
                        />
                        <Button
                            onPress={this.props.onViewCanceledClassesPress}
                            containerViewStyle={{ marginTop: 5 }}
                            title={"Lista sedintelor anulate"}
                            backgroundColor={'rgba(30, 110, 199,0.6)'}
                            textStyle={{ color: 'black', fontWeight: 'bold' }}
                        />
                        <Button
                            onPress={this.props.onListItemProfilePress}
                            containerViewStyle={{ marginTop: 5 }}
                            title={"Vizualizeaza profilul elevului"}
                            backgroundColor={'rgba(30, 110, 199,0.6)'}
                            textStyle={{ color: 'black', fontWeight: 'bold' }}
                        />
                    </View> : null}
            </View>
        );
    }
}
export default ListItemFS;