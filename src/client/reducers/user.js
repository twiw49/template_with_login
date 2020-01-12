import makeId from '../lib/makeId';

const user = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return action.payload.user;
    }
    case 'LOGOUT': {
      return null;
    }
    case 'ADD_HABIT': {
      return { ...state, habits: [...state.habits, { id: makeId(), ...action.payload }] };
    }
    case 'EDIT_HABIT': {
      return {
        ...state,
        habits: [
          ...state.habits.map(habit => {
            return habit.id === action.payload.id ? { ...action.payload } : habit;
          })
        ]
      };
    }
    case 'DELETE_HABIT': {
      const { id } = action.payload;

      return { ...state, habits: [...state.habits.filter(habit => habit.id !== id)] };
    }
    default:
      return state;
  }
};

export default user;
