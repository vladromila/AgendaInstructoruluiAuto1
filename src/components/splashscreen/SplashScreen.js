import React, { Component } from 'react'
import { ActivityIndicator, View } from 'react-native'
import firebase from 'firebase';

export default class SplashScreen extends Component {
  componentWillMount() {
    const { navigation } = this.props;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        navigation.navigate('Main')
      } else {
        navigation.navigate('Authentication')
      }
    });
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <ActivityIndicator size="large" color='#1E6EC7' />
      </View>
    )
  }
}
