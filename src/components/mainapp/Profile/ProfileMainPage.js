import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements';
import firebase from 'firebase';

export default class ProfileMainPage extends Component {
    render() {
        return (
            <View>
                <Button onPress={()=>firebase.auth().signOut()}/>
            </View>
        )
    }
}
