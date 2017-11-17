import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserChatPostsReducer from './UserChatPostsReducer';

export default combineReducers({
  auth: AuthReducer,
  userChatPosts: UserChatPostsReducer
});
