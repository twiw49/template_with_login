import { combineReducers } from 'redux';
import isLoading from './isLoading';
import isEditing from './isEditing';
import user from './user';

const rootReducer = combineReducers({
  isLoading,
  isEditing,
  user
});

export default rootReducer;
