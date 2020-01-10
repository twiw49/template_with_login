const user = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return action.payload.user;
    }
    case 'LOGOUT': {
      return null;
    }
    default:
      return state;
  }
};

export default user;
