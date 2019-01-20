import React, { Component } from 'react';
import { KeyboardAvoidingView, View, Text, Image, Modal } from 'react-native'
import { Container, Content, Form, Item, Input, Label } from 'native-base';
import { Header, SocialIcon } from 'react-native-elements';
import { connect } from 'react-redux';
import { login, loginWithFacebook, resetPassword } from '../../../actions'
import { Button, Icon } from 'react-native-elements';

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isPResetModalVisible: false
    };
  }
  onButtonPress = () => {
    const { email, password } = this.state;
    this.props.login({ email: email.trim(), password });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.presetSuccess === true) {
      this.setState({ isPResetModalVisible: false })
      alert(`Un email de resetare a parolei a fost trimis la adresa ${this.state.email}! In caz de nu ati primit nimic, nu ezitati sa incercati din nou, nu inainte de a verifica conexiunea la internet!`)
    }
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
                <Input value={this.state.email} style={{ color: 'white', fontSize: 18 }} onChangeText={(email) => { this.setState({ email: email }) }} />
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
                underlayColor={'#1E6EC7'}
                loading={this.props.loading}
                style={{ backgroundColor: '#1E6EC7' }}
              />
              <SocialIcon
                title='Ai uitat parola?'
                button
                onPress={() =>
                  this.setState({ isPResetModalVisible: true })
                }
                underlayColor={'#1E6EC7'}
                style={{ backgroundColor: '#1E6EC7' }}
              />
              <SocialIcon
                title='Logheaza-te cu facebook'
                button
                loading={this.props.loginWithFacebookLoading}
                underlayColor={'#1E6EC7'}
                type='facebook'
                onPress={() => {
                  this.props.loginWithFacebook();
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
        <Modal
          visible={this.state.isPResetModalVisible}
          onRequestClose={() => {

          }}
          transparent={true}
          animationType="fade"
        >
          <View
            style={{ flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: 'rgba(0,0,0,0.75)' }}
          >
            <View
              style={{ padding: 15, width: '90%', backgroundColor: 'white', justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}
            >
              <View style={{ justifyContent: 'flex-end' }}>
                <Icon
                  name="close"
                  containerStyle={{ position: 'relative', right: 0, alignSelf: 'flex-end' }}
                  onPress={() => {
                    this.setState({ isPResetModalVisible: false })
                  }}
                />
              </View>
              <Text style={{ fontSize: 19, textAlign: 'center' }}>Introduceti email-ul dumneavoastra pentru a primi un link de resetare a parolei.</Text>
              <Item stackedLabel>
                <Label style={{ color: 'black', fontSize: 19 }}>Email:</Label>
                <Input value={this.state.email} style={{ color: 'black', fontSize: 18 }} onChangeText={(email) => { this.setState({ email: email }) }} />
              </Item>
              <Button
                title="Gata"
                loading={this.props.presetLoading}
                backgroundColor="#1E6EC7"
                onPress={() => {
                  this.props.resetPassword(this.state.email)
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
mapStateToProps = (state) => {
  const { loginLoading, loginError, loginWithFacebookLoading, presetLoading, presetSuccess } = state.AuthenticationReducer;
  return { loading: loginLoading, error: loginError, loginWithFacebookLoading, presetLoading, presetSuccess };
}
export default connect(mapStateToProps, { login, loginWithFacebook, resetPassword })(LoginPage);