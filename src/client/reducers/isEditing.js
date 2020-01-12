const isEditing = (state = false, action) => {
  switch (action.type) {
    case 'START_EDITING':
      return action.payload;

    case 'EDIT_HABIT':
      return false;

    default:
      return state;
  }
};

export default isEditing;
