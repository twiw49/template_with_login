import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import filterByToday from '../lib/filterByToday';

const useStyles = makeStyles(theme => ({
  log: {
    paddingTop: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  time: {
    color: 'gray',
    display: 'flex',
    alignItems: 'center'
  },
  right: {
    display: 'flex'
  },
  delete: {
    paddingLeft: '10px',
    cursor: 'pointer',
    color: 'rgba(0, 0, 0, 0.3)',
    '&:hover': {
      color: 'black'
    }
  }
}));

const HabitLogs = ({ logs, habit_id, dispatch }) => {
  const classes = useStyles();

  const handleDeleteLog = id => {
    dispatch({
      type: 'DELETE_LOG',
      payload: {
        id
      }
    });
  };

  const filteredLogs = filterByToday(logs).filter(log => log.habit_id === habit_id);

  return filteredLogs.length ? (
    <CardContent>
      {filteredLogs.map(log => (
        <div key={log.id} className={classes.log}>
          <div>{`${log.money}원`}</div>
          <div className={classes.right}>
            <div className={classes.time}>{log.time}</div>
            <div className={classes.delete} onClick={() => handleDeleteLog(log.id)}>
              X
            </div>
          </div>
        </div>
      ))}
    </CardContent>
  ) : null;
};

HabitLogs.propTypes = {
  logs: PropTypes.array.isRequired,
  habit_id: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(state => ({
  logs: state.user.logs
}))(HabitLogs);
