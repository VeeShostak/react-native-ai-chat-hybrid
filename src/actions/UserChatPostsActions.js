
import {
  CONVERSATION_POST_CREATE,
  CONVERSATION_POST_LIVE,
  LIVE_CHAT_POSTS_FETCH_SUCCESS,
  LIVE_CHAT_POSTS_HUMAN_RESPOND,
  HUMAN_RESPONSE_FETCH_SUCCESS,
  HUMAN_RESPONSE_SET,
  LIVE_CHAT_POST_DELETE
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
	  }).catch((error) => console.log('conversationPostSendToHuman error: ', error));
	};
};

// if userQuery was answered by human, or timeRanOut(no response), we delete the live-chat-post
export const liveChatPostDelete = () => {

	const  currentUserInfo = firebase.auth().currentUser;

	return (dispatch) => {
	database.ref(`live-chat-posts/${currentUserInfo.uid}`)
	  .remove()
	  .then(() => {
	    dispatch({ 
	    	type: LIVE_CHAT_POST_DELETE,
	    	payload: currentUserInfo.uid
	     });
	  }).catch((error) => console.log('liveChatPostDelete error: ', error));
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

	    database.ref(`/live-chat-posts/`).limitToFirst(20)
	      .on('value', snapshot => {


	      	dispatch({ type: LIVE_CHAT_POSTS_FETCH_SUCCESS, payload: snapshot.val() });

	      });
	  };
};


export const liveChatPostsHumanRespond = (uid, userQuery, humanResponse) => {

	const  currentUserInfo = firebase.auth().currentUser;
	return (dispatch) => {

		// if exists, posts. if it was someone responded first it was deleted and doesnt exist, catches error
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




export const humanResponseFetch = () => {

	// while responded is false || time remains
    // stay subscribed to the live-chat-post with your id

	const  currentUserInfo = firebase.auth().currentUser;
	return (dispatch) => {

		//TODO:
		// keep getting data once, every second, until timer runs out or success
		
	    database.ref(`/live-chat-posts/${currentUserInfo.uid}`)
	      .once('value', snapshot => {

	      	//console.log('in humanResponseFetch: ', snapshot.val().responded)
	      	if (snapshot.val().responded === true) {

	      		dispatch({ 
	      			type: HUMAN_RESPONSE_FETCH_SUCCESS, 
	      			payload: {
	      				responded: true,
	      				response: snapshot.val().humanResponse
	      			} 
	      		});
	      	}
	      	// 
	      
	      	//dispatch({ type: HUMAN_RESPONSE_FETCH_NO_RESPONSE, payload: snapshot.val() });

	      });
		

	   	
	  };
};



export const humanResponseSet = ({responded, response}) => {

	// while responded is false || time remains
    // stay subscribed to the live-chat-post with your id

    return (dispatch) => {
    	dispatch({ 
			type: HUMAN_RESPONSE_SET, 
			payload: {
				responded: responded,
				response: response
			} 
		});

    }
	
	      	
	      	
		

	   	
	  
};
