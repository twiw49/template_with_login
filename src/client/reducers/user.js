const user = (state = null, action) => {
  switch (action.type) {
    case "LOGIN": {
      return action.payload.user;
    }
    default:
      return state;
  }
};

export default user;
