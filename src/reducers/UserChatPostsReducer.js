import {
  CONVERSATION_POST_CREATE
} from '../actions/types';

const INITIAL_STATE = {
  userQuery: '',
  response: '',
  machineResponded: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONVERSATION_POST_CREATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};