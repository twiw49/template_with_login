import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import filterByToday from '../lib/filterByToday';
import TodayDate from './TodayDate';

const useStyles = makeStyles(theme => ({
  total: {
    position: 'fixed',
    fontWeight: 'bold',
    fontSize: '2.5rem',
    margin: '1rem',
    color: 'coral',
    display: 'flex',
    alignItems: 'center'
  }
}));

const HabitTotal = ({ logs, todayDate }) => {
  const classes = useStyles();
  const totalMoney =
    logs.length > 0
      ? filterByToday({ logs, todayDate }).reduce((prev, curr) => prev + curr.money, 0)
      : 0;

  return (
    <div className={classes.total}>
      <div>{`${totalMoney.toLocaleString()}원`}</div>
      <TodayDate />
    </div>
  );
};

HabitTotal.propTypes = {
  logs: PropTypes.array.isRequired,
  todayDate: PropTypes.string.isRequired
};

export default connect(state => ({
  logs: state.user.logs,
  todayDate: state.todayDate
}))(HabitTotal);
