import axios from 'axios';

// Persist the diary to the database after almost every action
const persistMiddleware = store => next => async action => {
  // Redux 먼저 업데이트!
  next(action);

  if (
    ![
      'LOGIN',
      'LOGOUT',
      'START_LOADING',
      'END_LOADING',
      'START_EDITING',
      'OPEN_ALERT',
      'CLOSE_ALERT'
    ].includes(action.type)
  ) {
    const { user } = store.getState();
    await axios.put('/api/update', { user });
    console.log('SYNC WITH DB : PUT');
  }
};

export default persistMiddleware;
