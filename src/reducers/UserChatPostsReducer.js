import {
  CONVERSATION_POST_CREATE
} from '../actions/types';

import uuid from 'react-native-uuid';

// const INITIAL_STATE = {
//   userQuery: '',
//   response: '',
//   machineResponded: true
// };


const INITIAL_STATE = [

  {
    _id: uuid.v4(),
    text: 'How are you?',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Ai',
    }
  }

];



export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONVERSATION_POST_CREATE:
      return [
      // NOTE: must be backwards for GiftedChat
      	...action.payload, // add uerQuery and response values
      	...state // spread prev values
      ];
    default:
      return state;
  }
};

// case 'persist/REHYDRATE':
//      	return { ...state, persistedConversation: action.payload };