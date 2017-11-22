import {
  CONVERSATION_POST_CREATE,
  CONVERSATION_POST_LIVE,
  LIVE_CHAT_POSTS_FETCH_SUCCESS,
  LIVE_CHAT_POSTS_HUMAN_RESPOND
} from '../actions/types';

import uuid from 'react-native-uuid';



const INITIAL_STATE = {};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONVERSATION_POST_LIVE:
      return state;
      // return [
      //   ...state, // spread prev values
      // 	...action.payload // add uerQuery and response values
      	
      // ];
    case LIVE_CHAT_POSTS_FETCH_SUCCESS:
    //console.log("state: ", action.payload);
      // return [
      //   ...state, // spread prev values of array
      //  action.payload // add object
        
      // ];
      return action.payload; // load fetched chatPosts into store

      
    default:
      return state;
  }
};