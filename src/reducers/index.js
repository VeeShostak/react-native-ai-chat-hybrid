import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserChatPostsReducer from './UserChatPostsReducer';
import LiveChatPostsReducer from './LiveChatPostsReducer';
import HumanResponseReducer from './HumanResponseReducer';

export default combineReducers({
  auth: AuthReducer,
  userChatPosts: UserChatPostsReducer,
  liveChatPosts: LiveChatPostsReducer,
  humanResponse: HumanResponseReducer
});