import React, { Component } from 'react'
import { Text, View, Switch, AsyncStorage } from 'react-native'
import { Button } from 'react-native-elements';
import firebase from 'firebase';
import { setIsAutomaticTypeSelectWanted } from '../../../actions/'
import { connect } from 'react-redux';

class ProfileMainPage extends Component {
    constructor() {
        super();
        this.state = {
            switchValue: false
        }
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
            <View>
                <Button onPress={() => firebase.auth().signOut()} />
                <Switch
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
        )
    }
}
maptStateToProps = (state) => {
    const { isAutomaticTypeSelectWanted } = state.GlobalVariablesReducer;
    return { isAutomaticTypeSelectWanted }
}
export default connect(maptStateToProps, { setIsAutomaticTypeSelectWanted })(ProfileMainPage);
