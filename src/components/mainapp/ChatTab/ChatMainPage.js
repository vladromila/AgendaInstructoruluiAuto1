import React, { Component } from 'react';
import { View, Platform, Text } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { GiftedChat, Day } from 'react-native-gifted-chat';
import firebase from 'firebase'
import { connect } from 'react-redux'
import { Header } from 'react-native-elements';

class ChatMainPage extends React.Component {
    static navigationOptions = {
        header: null
    }
    state = {
        messages: [],
    }

    onSend(messages = []) {
        const message = messages[0];

        if (this.props.isConnected === true)
            firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/messages/`)
                .push({ ...message, createdAt: messages[0].createdAt.toISOString() })
        else
            alert('Conexiunea la internet este prea slaba sau inexistenta!');
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    centerComponent={<Text style={{ color: 'black', fontSize: 21, fontWeight: "bold" }}>Trimite un mesaj</Text>}
                    innerContainerStyles={{ backgroundColor: '#1E6EC7' }}
                    outerContainerStyles={{ borderBottomColor: 'black', backgroundColor: '#1E6EC7', borderBottomWidth: 1 }}
                />
                <GiftedChat
                    placeholder="Scrie un mesaj..."
                    inverted={false}
                    messages={this.props.messages}
                    onSend={messages => {
                        this.onSend(messages)
                    }}
                    renderDay={(props) => <Day {...props} textStyle={{ color: 'black' }}></Day>}
                    locale={'ro'}
                    user={{
                        _id: 1,
                    }}
                />
                {Platform.OS === 'android' ? <KeyboardSpacer topSpacing={-50} /> : null}
            </View>
        )
    }
}

mapStateToProps = state => {
    const { messages } = state.FetchedData;
    const { isConnected } = state.GlobalVariablesReducer;
    return { isConnected, messages };
}

export default connect(mapStateToProps)(ChatMainPage);