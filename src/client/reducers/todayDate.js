import moment from 'moment-timezone';

const todayDate = (
  state = moment()
    .locale('ko')
    .tz('GMT')
    .add(new Date().getTimezoneOffset() / -60, 'hours')
    .format('YYYY년 MM월 DD일'),
  action
) => {
  switch (action.type) {
    case 'UPDATE_TIME': {
      return action.payload.todayDate;
    }
    default:
      return state;
  }
};

export default todayDate;
