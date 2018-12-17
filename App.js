import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './src/reducers/index';
import AppMain from './src/Components/AppMain';
import { FIREBASE_CONFIG } from './env.js';

export default class App extends React.Component {
  constructor() {
    super();
    console.ignoredYellowBox = ['TabNavigator'];
  }
  componentWillMount() {
    var config=FIREBASE_CONFIG
    firebase.initializeApp(config);
  }
  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(reduxThunk))}>
        <View style={{ flex: 1 }}>
          <AppMain />
        </View>
      </Provider>
    );
  }
}