import normalizeDiaries from './normalizeHabits';

const makeId = () => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return [...Array(10).keys()].reduce((id, i) => {
    id += possible.charAt(Math.floor(Math.random() * possible.length));
    return id;
  }, '');
};

// Generate the initial showcase board that every user gets when they first log in
const addHabit = ({ userId, prevHabits = [], newHabit }) =>
  normalizeDiaries({
    userId,
    habits: [...prevHabits, newHabit]
  });

// newHabit
// {
//   userId : '12345',
//   title : '~하기',
//   type : 'text',
//   currentDeposit : 10000,
//   log : [
//     {date: '2019-12-31', deposit:10000, description: 'success'}
//   ]
// }

export default addHabit;
