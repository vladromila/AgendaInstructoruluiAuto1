import React, { Component } from 'react';
import { KeyboardAvoidingView, View, Text, Image } from 'react-native'
import { Container, Content, Form, Item, Input, Label } from 'native-base';
import { Header, SocialIcon } from 'react-native-elements';
import { connect } from 'react-redux';
import { signup } from '../../../actions'
import { Button } from 'react-native-elements';

class SignUpPage extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }
  onButtonPress = () => {
    if (this.props.loading === false) {
      const { email, password } = this.state;
      this.props.signup({ email: email.trim(), password });
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }} >
        <Image
          style={{
            backgroundColor: '#ccc',
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
          }}
          source={require('../../../../img/bi2.jpg')}
        />
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <Header centerComponent={<Text style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>Creeaza un Cont</Text>} backgroundColor="#1E6EC7" />
          <Content>
            <Form>
              <Item stackedLabel>
                <Label style={{ color: 'white', fontSize: 20 }}>Email</Label>
                <Input style={{ color: 'white', fontSize: 18 }} onChangeText={(email) => { this.setState({ email: email }) }} />
              </Item>
              <Item stackedLabel>
                <Label style={{ color: 'white', fontSize: 20 }}>Parola</Label>
                <Input style={{ color: 'white', fontSize: 18 }} onChangeText={(password) => { this.setState({ password: password }) }} secureTextEntry/>
              </Item>
              <SocialIcon
                button
                title="Creeaza contul"
                style={{ backgroundColor: '#1E6EC7' }}
                onPress={() => this.onButtonPress()}
                loading={this.props.loading}
                underlayColor={'#1E6EC7'}
              />
              <SocialIcon
                button
                title="Ai deja un cont? Logheaza-te."
                style={{ backgroundColor: '#1E6EC7' }}
                underlayColor={'#1E6EC7'}
                onPress={() => this.props.navigation.navigate('LoginTab')}
              />
            </Form>
          </Content>
        </View>
      </View >
    );
  }
}
mapStateToProps = (state) => {
  const { signupLoading, signupError } = state.AuthenticationReducer;
  return { loading: signupLoading, error: signupError };
}
export default connect(mapStateToProps, { signup })(SignUpPage);