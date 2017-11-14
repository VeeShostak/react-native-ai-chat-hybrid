import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


//import { emailChanged, passwordChanged, loginUser } from '../actions';
import * as myActions from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

import { firebase, googleAuthProvider } from '../firebase/firebase';

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }
  
  navigateTo(where) {
    this.props.navigation.navigate(where);

  }

  onButtonPress() {

    const { email, password } = this.props.auth;
    const navigateOnLogin = (where) => this.props.navigation.navigate(where);
    this.props.loginUser({ email, password }, navigateOnLogin)
    //console.error('userID:');

    // assign values to an object
   //  let loginInfo;
   //  loginInfo.email = this.props.auth.email;
   //  loginInfo.password = this.props.auth.password;

   // //console.error('USR ', this.props.auth.email);
   //  // get email from store, and dispatch action
   //  this.props.loginUser(loginInfo.email, loginInfo.password);

    


    

    
    // sign user in.
    

    // Promise.resolve( this.props.loginUser({ email, password }) ).then(function (response){
    //     if (this.props.email != '') {
    //       this.props.navigation.navigate('Details');
    //     } else {
    //       console.error('USR NULL');

    //     }
    //     return response;
    //   }).catch((error) => {

    //     console.log('error: ', error);
    //     if (this.props.error === '') {
    //       this.props.navigation.navigate('Details');
    //     } else {
    //       console.error('USR NULL');

    //     }
        
    //   });

    // // on success
    // if (this.props.user != null) {
    //   this.props.navigation.navigate('Details');
    // }
    // this.props.navigation.navigate('Details');

  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
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
