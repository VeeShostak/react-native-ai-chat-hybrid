
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';

import MainTabNavigation from './components/MainTabNavigation';

import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';


import { firebase } from './firebase/firebase';
import { persistStore, autoRehydrate } from 'redux-persist';




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

//todo: configure store in seperate file
/*
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage' // default: localStorage if web, AsyncStorage if react-native
import reducers from './reducers' // where reducers is an object of reducers

const config = {
  key: 'root',
  storage,
}

const reducer = persistCombineReducers(config, reducers)

function configureStore () {
  // ...
  let store = createStore(reducer)
  let persistor = persistStore(store)

  return { persistor, store }
}

*/




  render() {
    // MOVE TO STORE CONFIG
    //const myStore = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    //const myStore = createStore(reducers, {storage: AsyncStorage}, applyMiddleware(ReduxThunk, autoRehydrate()));
    
    // const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    // // Enable persistence
    // //persistStore(store);
    // persistStore(store, {storage: AsyncStorage}, () => {
    //       this.setState({ rehydrated: true })
    //     });

    // Add the autoRehydrate middleware to your redux store
// const store = createStore(reducers, undefined, () => {
//           this.setState({ rehydrated: true })
//         });
// ======

const middleware = [ReduxThunk];
let store = compose(
  applyMiddleware(...middleware),
  autoRehydrate()
)(createStore)(reducers);
persistStore(store, {storage: AsyncStorage});

    return (
      // Provider makes the global store available to all of the children containers or components
      <Provider store={store}>
        <Router isSignedIn={true}/>
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
