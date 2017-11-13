import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
  // onEmailChange(text) {
  //   this.props.emailChanged(text);
  // }

  // onPasswordChange(text) {
  //   this.props.passwordChanged(text);
  // }
  // NOTE: causes COUPLING, move functionality to redux
  navigateTo(where) {
    this.props.navigation.navigate(where);

  }

  onButtonPress() {
    const { email, password } = this.props;
    

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
      <Button onPress={startLogin}>
        Login
      </Button>
    );
  }

  render() {
    return (
      <Card>

       

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


const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginForm);
