import React, { Component } from 'react';
import { KeyboardAvoidingView, View, Text } from 'react-native'
import { TextField } from 'react-native-material-textfield';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import { connect } from 'react-redux';
import { login } from '../../../actions'
import { Button } from 'react-native-elements';

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }
  onButtonPress = () => {
    const { email, password } = this.state;
    console.log(email,password)
    this.props.login({email, password});
  }
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white ' }}>
        <Container>
          <Header />
          <Content>
            <Form>
              <Item stackedLabel>
                <Label>Email</Label>
                <Input onChangeText={(email)=>{this.setState({email:email})}}/>
              </Item>
              <Item stackedLabel>
                <Label>Parola</Label>
                <Input onChangeText={(password)=>{this.setState({password:password})}}/>
              </Item>
              <Button title="Login" onPress={()=>this.onButtonPress()} loading={this.props.loading}/>
            </Form>
          </Content>
        </Container>
      </View>
    );
  }
}
mapStateToProps = (state) => {
  const { loading, error } = state.AuthenticationReducer;
  return { loading, error };
}
export default connect(mapStateToProps, { login })(LoginPage);