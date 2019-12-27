import { combineReducers } from 'redux';
import isGuest from './isGuest';
import isLoading from './isLoading';
import user from './user';

const rootReducer = combineReducers({
  isGuest,
  isLoading,
  user
});

export default rootReducer;
