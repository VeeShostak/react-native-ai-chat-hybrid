
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
import LiveChatPostsReducer from './reducers/LiveChatPostsReducer';

import Router from './Router';

import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';


import { firebase } from './firebase/firebase';
import { persistStore, autoRehydrate } from 'redux-persist';




export default class App extends Component<{}> {
   componentWillMount() {

    }

  render() {

    const middleware = [ReduxThunk];

    let store = compose(
      applyMiddleware(...middleware),
      autoRehydrate()
    )(createStore)(reducers);
    persistStore(store, {storage: AsyncStorage, blacklist: [LiveChatPostsReducer]});

        return (
          // Provider makes the global store available to all of the children containers or components
          <Provider store={store}>
            <Router isSignedIn={true}/>
          </Provider>
        );
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
