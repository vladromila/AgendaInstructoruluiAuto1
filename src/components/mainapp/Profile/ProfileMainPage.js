import React, { Component } from 'react'
import { Text, View, Switch, AsyncStorage } from 'react-native'
import { Button, Header } from 'react-native-elements';
import firebase from 'firebase';
import { setIsAutomaticTypeSelectWanted } from '../../../actions/'
import { connect } from 'react-redux';
import Gradient from 'react-native-css-gradient';

class ProfileMainPage extends Component {
    constructor() {
        super();
        this.state = {
            switchValue: false
        }
    }

    static navigationOptions = {
        header: null
    }

    componentWillMount() {
        this.retrieveData().then((value) => {
            this.setState({ switchValue: value })
            this.props.setIsAutomaticTypeSelectWanted(value);
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
                    innerContainerStyles={{ backgroundColor: '#1E6EC7' }}
                    outerContainerStyles={{ borderBottomColor: 'black', backgroundColor: '#1E6EC7', borderBottomWidth: 1 }}
                    centerComponent={<Text style={{ fontSize: 22, fontWeight: '900' }}>Profil</Text>}
                />
                <Button
                    title="Logout"
                    backgroundColor="#1E6EC7"
                    onPress={() => firebase.auth().signOut()} />
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <Text>Selectare automata a tipului de sedinta</Text>
                    <Switch
                        style={{ alignSelf: "flex-end" }}
                        value={this.state.switchValue}
                        onValueChange={(value) => {
                            this.setState({ switchValue: value })
                            this.storeData(value).then(() => {
                                this.retrieveData().then((value) => {
                                    this.props.setIsAutomaticTypeSelectWanted(value);
                                })
                            })
                        }}
                    /></View>
            </Gradient>
        )
    }
}
maptStateToProps = (state) => {
    const { isAutomaticTypeSelectWanted } = state.GlobalVariablesReducer;
    return { isAutomaticTypeSelectWanted }
}
export default connect(maptStateToProps, { setIsAutomaticTypeSelectWanted })(ProfileMainPage);
