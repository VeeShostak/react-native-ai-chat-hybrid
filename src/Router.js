import React from 'react';
import { Scene, Router, Actions, Stack } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ChatBotChat from './components/ChatBotChat';

import MainTabNavigation from './components/MainTabNavigation';

import { StackNavigator } from 'react-navigation';

import * as firebase from 'firebase'; // take all exports and toss them on 1 named var



import configureStore from './store/configureStore';




   

// const RouterComponent = () => {
//   return (




//     <Router sceneStyle={{ paddingTop: 65 }}>
  
// 		<Stack key="root">
// 	      <Scene key="login" component={LoginForm} title="Login"/>
// 	      <Scene key="main" component={MainTabNavigation}/>
// 	    </Stack>
     
//     </Router>

//   );

// };



 //  const store = configureStore();

	const isSignedIn = false;

	// const checkAuthStatus = () => {

	// 	firebase.auth().onAuthStateChanged((user) => {
	// 	  if (user) {
	// 	    store.dispatch(login(user.uid));
	// 	    isSignedIn = true;
		    
	// 	  } else {
	// 	    store.dispatch(logout());
	// 	    isSignedIn = false;
	// 	  }
	// 	});
	// }

 //  checkAuthStatus();

  const RouterComponent = StackNavigator({
    Home: {
      screen: LoginForm,
    },
    Details: {
      screen: MainTabNavigation,
      
    },

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


