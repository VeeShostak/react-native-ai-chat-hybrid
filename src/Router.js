import React from 'react';
import { Scene, Router, Actions, Stack } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ChatBotChat from './components/ChatBotChat';
import HumanAnswerChatList from './components/HumanAnswerChatList';
import HumanAnswerChat from './components/HumanAnswerChat';
import MainTabNavigation from './components/MainTabNavigation';
import { StackNavigator } from 'react-navigation';
import database, { firebase, googleAuthProvider } from './firebase/firebase';
//import configureStore from './store/configureStore';


	const isSignedIn = false;

	// const checkAuthStatus = () => {

	// 	firebase.auth().onAuthStateChanged((user) => {
	// 	  if (user) {
		    
	// 	    //isSignedIn = true;
        
 //        return true;
        
		    
	// 	  } else {
		    
	// 	    //isSignedIn = false;
        
 //        return false;
        
	// 	  }
	// 	});
	// }

  

  const RouterComponent = StackNavigator({
    Home: {
      screen: LoginForm,
    },
    Details: {
      screen: MainTabNavigation, 
    },
    HumanAnswerChatList: {
      screen: HumanAnswerChatList,
    },
    HumanAnswerChat: {
      screen: HumanAnswerChat,
    }
  },
  {
    index: 0,
    initialRouteName: isSignedIn ? 'Details' :'Home',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    }
  }

  );

export default RouterComponent;


