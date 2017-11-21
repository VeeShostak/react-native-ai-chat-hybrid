import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserChatPostsReducer from './UserChatPostsReducer';
import LiveChatPostsReducer from './LiveChatPostsReducer';

export default combineReducers({
  auth: AuthReducer,
  userChatPosts: UserChatPostsReducer,
  liveChatPosts: LiveChatPostsReducer
});