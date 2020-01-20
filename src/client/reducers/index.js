import { combineReducers } from 'redux';
import isLoading from './isLoading';
import isEditing from './isEditing';
import isAlertOpen from './isAlertOpen';
import user from './user';
import todayDate from './todayDate';

const rootReducer = combineReducers({
  isLoading,
  isEditing,
  isAlertOpen,
  user,
  todayDate
});

export default rootReducer;
