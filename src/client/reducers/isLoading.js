const isLoading = (state = false, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return true;

    case 'END_LOADING':
      return false;

    default:
      return state;
  }
};

export default isLoading;
