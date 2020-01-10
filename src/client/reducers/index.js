import { combineReducers } from 'redux';
import isLoading from './isLoading';
import user from './user';

const rootReducer = combineReducers({
  isLoading,
  user
});

export default rootReducer;
