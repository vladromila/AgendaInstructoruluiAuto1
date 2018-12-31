import React, { Component } from 'react'
import { Text, View, Switch, AsyncStorage, ScrollView } from 'react-native'
import { Button, Header, ListItem, Icon } from 'react-native-elements';
import firebase from 'firebase';
import { setIsAutomaticTypeSelectWanted } from '../../../actions/'
import { connect } from 'react-redux';
import Gradient from 'react-native-css-gradient';
import _ from 'lodash';
import { months } from '../../../variables'

class ProfileMainPage extends Component {
    constructor() {
        super();
        this.state = {
            switchValue: false,
            itATotalVisible: false,
            selectedATotal: -1,
            selectedFirstTryA: -1,
            isFirstTryAVisible: false
        }
    }

    static navigationOptions = {
        header: null
    }

    componentWillMount() {
        this.retrieveData().then((value) => {
            if (value === null) {
                this.setState({ switchValue: false })
                this.storeData(value);
            }
            else {
                this.setState({ switchValue: value })
                this.props.setIsAutomaticTypeSelectWanted(value);
            }
        })
    }

    storeData = async (value) => {
        try {
            await AsyncStorage.setItem('switchValue', JSON.stringify(value));
        } catch (error) {
        }
    }
    retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('switchValue');
            if (value !== null) {
                return JSON.parse(value);
            }
        } catch (error) {
        }
    }

    render() {
        return (
            <Gradient gradient={`linear-gradient(0deg ,white 0%,#1E6EC7 100% )`} style={{ width: '100%', height: '100%', zIndex: -1, position: 'absolute' }} >
                <Header
                    leftComponent={<Icon name="people" size={30} color="white" onPress={() => {
                        this.props.navigation.navigate('FinishedStudentsList');
                    }} />}
                    rightComponent={<Icon name="perm-contact-calendar" size={30} color="white" onPress={() => {
                        this.props.navigation.navigate('RStudentsList');
                    }} />}
                    innerContainerStyles={{ backgroundColor: '#1E6EC7' }}
                    outerContainerStyles={{ borderBottomColor: 'black', backgroundColor: '#1E6EC7', borderBottomWidth: 1 }}
                    centerComponent={<Text style={{ fontSize: 22, fontWeight: '900' }}>Profil</Text>}
                />
                <ScrollView>
                    {this.props.info ? this.props.info.firstTryA ?
                        <View>
                            <ListItem
                                containerStyle={{ backgroundColor: 'rgba(30, 110, 199,0.4)', borderBottomColor: 'black' }}
                                title={<Text style={{ color: 'black', fontSize: 18 }}>Lista elevilor admisi din prima incercare: {this.props.info.firstTryA.count}</Text>}
                                onPress={() => this.setState({ isFirstTryAVisible: !this.state.isFirstTryAVisible })}
                                underlayColor={'rgba(30, 110, 199,0.35)'}
                            />{this.state.isFirstTryAVisible === true ?
                                <View style={{ backgroundColor: 'rgba(30, 110, 199,0.4)', padding: 5, marginLeft: 30 }}>
                                    {_.toArray(this.props.info.firstTryA.list).map((item, i) => {
                                        return <View key={i}><ListItem
                                            containerStyle={{ backgroundColor: 'rgba(30, 110, 199,0.4)', margin: 3, borderBottomColor: 'black' }}
                                            title={<Text style={{ color: 'black', fontSize: 17 }}>{item.nume}</Text>}
                                            onPress={() => this.state.selectedFirstTryA === i ? this.setState({ selectedFirstTryA: null }) : this.setState({ selectedFirstTryA: i })}
                                            underlayColor={'rgba(30, 110, 199,0.35)'}
                                        />{this.state.selectedFirstTryA === i ?
                                            <View style={{ backgroundColor: 'rgba(30, 110, 199,0.4)', padding: 5, marginLeft: 30, flexDirection: 'column' }}>
                                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Date despre examen:</Text>
                                                <Text style={{ fontSize: 15 }}>Data: <Text style={{ fontWeight: 'bold' }}>{item.month} {months[item.month]} {item.year}</Text></Text>
                                                <Text style={{ fontSize: 15 }}>Politist Examinator: <Text style={{ fontWeight: 'bold' }}>{item.numePolitist}</Text></Text>
                                            </View> : null}
                                        </View>
                                    })}
                                </View> : null}
                        </View> : null : null}
                    {this.props.info ? this.props.info.aTotal ?
                        <View>
                            <ListItem
                                containerStyle={{ backgroundColor: 'rgba(30, 110, 199,0.4)', borderBottomColor: 'black' }}
                                title={<Text style={{ color: 'black', fontSize: 18 }}>Lista elevilor admisi: {this.props.info.aTotal.count}</Text>}
                                onPress={() => this.setState({ itATotalVisible: !this.state.itATotalVisible })}
                                underlayColor={'rgba(30, 110, 199,0.35)'}
                            />{this.state.itATotalVisible === true ?
                                <View style={{ backgroundColor: 'rgba(30, 110, 199,0.4)', padding: 5, marginLeft: 30 }}>
                                    {_.toArray(this.props.info.aTotal.list).map((item, i) => {
                                        return <View key={i}><ListItem
                                            containerStyle={{ backgroundColor: 'rgba(30, 110, 199,0.4)', margin: 3, borderBottomColor: 'black' }}
                                            title={<Text style={{ color: 'black', fontSize: 17 }}>{item.nume}</Text>}
                                            onPress={() => this.state.selectedATotal === i ? this.setState({ selectedATotal: null }) : this.setState({ selectedATotal: i })}
                                            underlayColor={'rgba(30, 110, 199,0.35)'}
                                        />{this.state.selectedATotal === i ?
                                            <View style={{ backgroundColor: 'rgba(30, 110, 199,0.4)', padding: 5, marginLeft: 30, flexDirection: 'column' }}>
                                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Date despre examen:</Text>
                                                <Text style={{ fontSize: 15 }}>Data: <Text style={{ fontWeight: 'bold' }}>{item.month} {months[item.month]} {item.year}</Text></Text>
                                                <Text style={{ fontSize: 15 }}>Politist Examinator: <Text style={{ fontWeight: 'bold' }}>{item.numePolitist}</Text></Text>
                                            </View> : null}
                                        </View>
                                    })}
                                </View> : null}
                        </View> : null : null}
                </ScrollView>
                <View style={{ flexDirection: 'row', width: '100%', marginBottom: 10 }}>
                    <Text style={{ fontSize: 17, color: 'black', marginLeft: 10 }}>Selectare automata a tipului de sedinta</Text>
                    <Switch
                        style={{ marginRight: 10 }}
                        value={this.state.switchValue}
                        onValueChange={(value) => {
                            this.setState({ switchValue: value })
                            this.storeData(value).then(() => {
                                this.retrieveData().then((value) => {
                                    this.props.setIsAutomaticTypeSelectWanted(value);
                                })
                            })
                        }}
                    />
                </View>
                <Button
                    title="Logout"
                    backgroundColor="#1E6EC7"
                    onPress={() => firebase.auth().signOut()} />

            </Gradient>
        )
    }
}
maptStateToProps = (state) => {
    const { isAutomaticTypeSelectWanted } = state.GlobalVariablesReducer;
    const { info } = state.FetchedData;
    return { isAutomaticTypeSelectWanted, info }
}
export default connect(maptStateToProps, { setIsAutomaticTypeSelectWanted })(ProfileMainPage);
