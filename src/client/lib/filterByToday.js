import moment from 'moment-timezone';

const filterByToday = logs =>
  logs.filter(
    log =>
      moment(log.time, 'YYYY년 MM월 DD일 HH시 mm분 ss초').format('YYYYMMDD') ===
      moment()
        .locale('ko')
        .tz('GMT')
        .add(new Date().getTimezoneOffset() / -60, 'hours')
        .format('YYYYMMDD')
  );

export default filterByToday;
