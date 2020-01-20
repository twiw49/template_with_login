import moment from 'moment-timezone';

const filterByToday = ({ logs, todayDate }) =>
  logs.filter(
    log => moment(log.time, 'YYYY년 MM월 DD일 HH:mm').format('YYYY년 MM월 DD일') === todayDate
  );

export default filterByToday;
