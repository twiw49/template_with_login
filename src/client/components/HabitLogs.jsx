import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';

const HabitLogs = ({ logs, habit_id }) => {
  return (
    <CardContent>
      {logs
        .filter(
          log =>
            moment(log.time, 'YYYY년 MM월 DD일 HH시 mm분 ss초').format('YYYYMMDD') ===
            moment()
              .locale('ko')
              .tz('GMT')
              .add(new Date().getTimezoneOffset() / -60, 'hours')
              .format('YYYYMMDD')
        )
        .filter(log => log.habit_id === habit_id)
        .map(log => (
          <div key={log.id}>{log.time}</div>
        ))}
    </CardContent>
  );
};

HabitLogs.propTypes = {
  logs: PropTypes.array.isRequired,
  habit_id: PropTypes.string.isRequired
};

export default connect(state => ({
  logs: state.user.logs
}))(HabitLogs);
