import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from './types';

// save email to store
export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

// save password to store
export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }, navigateOnLogin) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        loginUserSuccess(dispatch, user);
        // Switch to main screen
        navigateOnLogin('Details');
        
      })
      .catch((error) => {
        console.log(error);
        // auth failed, create the user
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => {
            loginUserSuccess(dispatch, user);
            // Switch to main screen
            navigateOnLogin('Details');
          })
          .catch(() => loginUserFail(dispatch));
      });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ 
    type: LOGIN_USER_FAIL });
  
};

// on successful login, save user object to store
const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  // Switch to main screen
  //Actions.main();
  //this.props.navigation.navigate('Details');


};
