
import {
  CONVERSATION_POST_CREATE
} from './types';

import database, { firebase, googleAuthProvider } from '../firebase/firebase';


// add (q and a) conversation to db and to store
// @param machineResponded: bool did the machine or a human respond
export const conversationPostCreate = ({ userQuery, response, machineResponded }) => {



	const  currentUserInfo = firebase.auth().currentUser;

	return (dispatch) => {
	database.ref(`user-chat-posts/${currentUserInfo.uid}`)
	  .push({ 
	  	userQuery: userQuery,
	  	response: response,
	  	machineResponded: machineResponded
	   })
	  .then(() => {
	    dispatch({ type: CONVERSATION_POST_CREATE });
	  }).catch((error) => console.log('conversationPostCreate error: ', error));
	};
};

// if dialogflow had noresponse, add conversation to live-chat-posts node for human to answer

