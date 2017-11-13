
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import MainTabNavigation from './components/MainTabNavigation';

import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';


import { firebase } from './firebase/firebase';
//import firebase from 'firebase';

//import LoginForm from './components/LoginForm';



export default class App extends Component<{}> {
   componentWillMount() {
  //   const config = {
  //     apiKey: "AIzaSyB_Q8zZFlbdcfdYTuobcRDx6Q41R-Ccfd8",
  //     authDomain: "chatai-cd580.firebaseapp.com",
  //     databaseURL: "https://chatai-cd580.firebaseio.com",
  //     projectId: "chatai-cd580",
  //     storageBucket: "chatai-cd580.appspot.com",
  //     messagingSenderId: "46134318898"
  //   };

  //   firebase.initializeApp(config);

    }

//   StackNavigator({
//   route1: { screen: RouteOne },
//   route2: { screen: MyTabNavigator },
// });

  // const RootNavigator = StackNavigator({
  //   Home: {
  //     screen: LoginPage,
  //   },
  //   Details: {
  //     screen: MainTabNavigation,
  //   },
  // });

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
    // return (
    //   <MainTabNavigation />
      
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
