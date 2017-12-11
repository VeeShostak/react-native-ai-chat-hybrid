//import firebase from 'firebase';
//import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from './types';

import database, { firebase, googleAuthProvider } from '../firebase/firebase';

// place in file
const url_rest_api_postgresql = 'https://ai-chat-restful-api-db.herokuapp.com';


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
        
        // user exists, login user and obtain JWT token.
        fetch(`${url_rest_api_postgresql}/login`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        }).then(response => response.json()).then(responseJson => {
            console.log('success: loged user in with REST Api ', responseJson);
            // store JTW token
            loginUserSuccess(dispatch, user, responseJson.refresh_token );
            // Switch to main screen
            navigateOnLogin('Details');
        }).catch(error => {
          console.log('failed: failed to log user in with REST Api ', error);
        }); 
        
      })
      .catch((error) => {
        console.log(error);
        // ===================================
        // START auth failed, create the user 
        // ===================================

        // add user to firebase DB
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => {
            // loginUserSuccess(dispatch, user);
            database.ref(`users/${user.uid}`).set({email: email})
            .then(()=> {
              console.log('pushed user to db', user);
            }).catch((e) => {
              console.log('failed: failed to push user', e);
            });


            // add user to postgreSQL DB
            fetch(`${url_rest_api_postgresql}/register`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                id: user.uid,
                email: email,
                password: password
              })
            }).then(response => response.json()).then(responseJson => {
                console.log('success: added user to postgreSQL ', responseJson);
                // store JTW token
                loginUserSuccess(dispatch, user, responseJson.refresh_token );
                // Switch to main screen
                navigateOnLogin('Details');
            }).catch(error => {
              console.log('failed: failed to add user to postgreSQL ', error);
            });

            // ===================================
            // END auth failed, create the user 
            // ===================================


            
            
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
const loginUserSuccess = (dispatch, user, refresh_token) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user,
    refresh_token: refresh_token
  });
  // Switch to main screen
  //Actions.main();
  //this.props.navigation.navigate('Details');


};
