import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import filterByToday from '../lib/filterByToday';

const useStyles = makeStyles(theme => ({
  total: {
    position: 'fixed',
    fontWeight: 'bold',
    fontSize: '2.5rem',
    margin: '1rem',
    color: 'coral'
  }
}));

const HabitTotal = ({ logs }) => {
  const classes = useStyles();
  const totalMoney =
    logs.length > 0 ? filterByToday(logs).reduce((prev, curr) => prev + curr.money, 0) : 0;

  return <div className={classes.total}>{`${totalMoney.toLocaleString()}원`}</div>;
};

HabitTotal.propTypes = {
  logs: PropTypes.array.isRequired
};

export default connect(state => ({
  logs: state.user.logs
}))(HabitTotal);
