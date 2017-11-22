
import {
  CONVERSATION_POST_CREATE,
  CONVERSATION_POST_LIVE,
  LIVE_CHAT_POSTS_FETCH_SUCCESS,
  LIVE_CHAT_POSTS_HUMAN_RESPOND
} from './types';

import database, { firebase, googleAuthProvider } from '../firebase/firebase';


// add (q and a) conversation to db and to store
// @param machineResponded: bool did the machine or a human respond
export const conversationPostCreate = ({ userQuery, response, machineResponded, createdAt }, messagesToAdd) => {

	const  currentUserInfo = firebase.auth().currentUser;


	return (dispatch) => {
	database.ref(`user-chat-posts/${currentUserInfo.uid}`)
	  .push({ 
	  	userQuery: userQuery,
	  	response: response,
	  	machineResponded: machineResponded,
	  	createdAt: createdAt.getTime()
	   })
	  .then(() => {
	    dispatch({ 
	    	type: CONVERSATION_POST_CREATE,
	    	payload: messagesToAdd
	     });
	  }).catch((error) => console.log('conversationPostCreate error: ', error));
	};

};





// if dialogflow had noresponse, add conversation to live-chat-posts node for human to answer
export const conversationPostSendToHuman = ({ userQuery }) => {

	const  currentUserInfo = firebase.auth().currentUser;

	return (dispatch) => {
	database.ref(`live-chat-posts/${currentUserInfo.uid}`)
	  .set({ 
	  	taken: false,
	  	responded: false,
	  	userQuery: userQuery
	   })
	  .then(() => {
	    dispatch({ 
	    	type: CONVERSATION_POST_LIVE,
	    	payload: userQuery
	     });
	  }).catch((error) => console.log('conversationPostCreate error: ', error));
	};
};


// fetch live chat posts
// export const liveChatPostsFetch = () => {

	

// 	const  currentUserInfo = firebase.auth().currentUser;
// 	return (dispatch) => {

// 	    database.ref(`/live-chat-posts/`)
// 	      .on('value', snapshot => {
	      	
// 	      	//   .limitToFirst(20)
	      	
// 	      	//console.error(snapshot.val().taken);
// 	      	//snapshot.val().taken === false

// 	      	if(true) {

	      		
// 	      		dispatch({ type: LIVE_CHAT_POSTS_FETCH_SUCCESS, payload: snapshot.val() });
// 	      	} 
	        
// 	      });
// 	  	};
// };


export const liveChatPostsFetch = () => {

	const  currentUserInfo = firebase.auth().currentUser;
	return (dispatch) => {

	    database.ref(`/live-chat-posts`).limitToFirst(20)
	      .on('value', snapshot => {


	      	dispatch({ type: LIVE_CHAT_POSTS_FETCH_SUCCESS, payload: snapshot.val() });

	      });
	  };
};


export const liveChatPostsHumanRespond = (uid, userQuery, humanResponse) => {

	const  currentUserInfo = firebase.auth().currentUser;
	return (dispatch) => {

	    database.ref(`/live-chat-posts/${uid}`).update({
	    	taken: false,
		  	responded: true,
		  	humanResponse: humanResponse,
		  	userQuery: userQuery
	    })
	    .then(() => {
		    // dispatch({ 
		    // 	type: LIVE_CHAT_POSTS_FETCH_SUCCESS,
		    // 	payload: userQuery
		    //  });
		 }).catch((error) => console.log('liveChatPostsHumanRespond error: ', error));
	      
	  };
	
};
