import { combineReducers } from 'redux';
import isLoading from './isLoading';
import isEditing from './isEditing';
import isAlertOpen from './isAlertOpen';
import user from './user';

const rootReducer = combineReducers({
  isLoading,
  isEditing,
  isAlertOpen,
  user
});

export default rootReducer;
