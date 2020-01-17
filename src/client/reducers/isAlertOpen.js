const isAlertOpen = (state = false, action) => {
  switch (action.type) {
    case 'OPEN_ALERT':
      return { message: action.payload.message };

    case 'CLOSE_ALERT':
      return false;

    default:
      return state;
  }
};

export default isAlertOpen;
