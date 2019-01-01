import React, { Component } from 'react';
import { KeyboardAvoidingView, View, Text, Image, Alert } from 'react-native'
import { Container, Content, Form, Item, Input, Label } from 'native-base';
import { Header, SocialIcon } from 'react-native-elements';
import { connect } from 'react-redux';
import { login } from '../../../actions'
import { Button } from 'react-native-elements';
import { Facebook } from 'expo'
import firebase from 'firebase';

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      loading: false
    };
  }
  onButtonPress = () => {
    const { email, password } = this.state;
    this.props.login({ email: email.trim(), password });
  }

  async loginWithFacebook() {
    this.setState({ loading: true })
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      '595214430921927',
      { permissions: ['public_profile'] },
    );

    if (type === 'success' && token) {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      await firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .then(() => {
          this.setState({ loading: false })
        })
    }
    else
      this.setState({ loading: false })
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image
          style={{
            backgroundColor: '#ccc',
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
          }}
          source={require('../../../../img/bil.jpg')}
        />

        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <Header centerComponent={<Text style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>Login</Text>} backgroundColor="#1E6EC7" />
          <Content>
            <Form>
              <Item stackedLabel>
                <Label style={{ color: 'white', fontSize: 20 }}>Email</Label>
                <Input style={{ color: 'white', fontSize: 18 }} onChangeText={(email) => { this.setState({ email: email }) }} />
              </Item>
              <Item stackedLabel>
                <Label style={{ color: 'white', fontSize: 20 }}>Parola</Label>
                <Input style={{ color: 'white', fontSize: 18 }} onChangeText={(password) => { this.setState({ password: password }) }} secureTextEntry />
              </Item>
              <SocialIcon
                title='Logheaza-te'
                button
                onPress={() => this.onButtonPress()
                }
                loading={this.props.loading}
                style={{ backgroundColor: '#1E6EC7' }}
              />
              <SocialIcon
                title='Logheaza-te cu facebook'
                button
                loading={this.state.loading}
                type='facebook'
                onPress={() => {
                  this.loginWithFacebook();
                }}
              />
              <SocialIcon
                title='Nu ai un cont? Creeaza unul.'
                button
                onPress={() => {
                  this.props.navigation.navigate('SignUpTab')
                }}
                underlayColor={'#1E6EC7'}
                style={{ backgroundColor: '#1E6EC7' }}
              />
            </Form>
          </Content>
        </View>
      </View>
    );
  }
}
mapStateToProps = (state) => {
  const { loginLoading, loginError } = state.AuthenticationReducer;
  return { loading: loginLoading, error: loginError };
}
export default connect(mapStateToProps, { login })(LoginPage);