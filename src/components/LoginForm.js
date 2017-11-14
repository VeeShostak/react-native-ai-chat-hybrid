import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


//import { emailChanged, passwordChanged, loginUser } from '../actions';
import * as myActions from '../actions';
import { Card, CardSection, Input, Button, Spinner, Header } from './common';

import { firebase, googleAuthProvider } from '../firebase/firebase';

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {

    const { email, password } = this.props.auth;
    // Each screen in your app will receive a navigation prop
    // pass it to navigate on user successful login
    const navigateOnLogin = (where) => this.props.navigation.navigate(where);
    this.props.loginUser({ email, password }, navigateOnLogin);

  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login/Sign Up
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <Header headerText={"Welcome"}/>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.auth.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.auth.password}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.auth.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};


// const mapStateToProps = ({ auth }) => {
//   const { email, password, user, error, loading } = auth;


//   return { email, password, user, error, loading };
//   startLogin: () => 
// };

// export default connect(mapStateToProps, {
//   emailChanged, passwordChanged, loginUser
// })(LoginForm);



// access state
const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

// access actions
const mapDispatchToProps = (dispatch) => {
  let actionCreators = bindActionCreators(myActions, dispatch)
  return {
    ...actionCreators,
    dispatch
    // emailChanged: () => dispatch(emailChanged()),
    // passwordChanged: () => dispatch(passwordChanged()),
    // loginUser: () => dispatch(loginUser()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
