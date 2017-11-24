import {
  HUMAN_RESPONSE_FETCH_SUCCESS,
  HUMAN_RESPONSE_SET
} from '../actions/types';



const INITIAL_STATE = 
{
    responded: false,
    response: 'This is the human\'s response'
}





export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HUMAN_RESPONSE_FETCH_SUCCESS:
      return action.payload;
    case HUMAN_RESPONSE_SET:
      return action.payload;
    default:
      return state;
  }
};

// case 'persist/REHYDRATE':
//      	return { ...state, persistedConversation: action.payload };