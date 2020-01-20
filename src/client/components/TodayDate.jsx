import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  date: {
    color: 'gray',
    fontSize: '1rem',
    marginLeft: '1rem'
  }
}));

const TodayDate = ({ todayDate, dispatch }) => {
  const classes = useStyles();

  const getDate = () => {
    if (
      todayDate !==
      moment()
        .locale('ko')
        .tz('GMT')
        .add(new Date().getTimezoneOffset() / -60, 'hours')
        .format('YYYY년 MM월 DD일')
    )
      dispatch({
        type: 'UPDATE_TIME',
        payload: {
          todayDate: moment()
            .locale('ko')
            .tz('GMT')
            .add(new Date().getTimezoneOffset() / -60, 'hours')
            .format('YYYY년 MM월 DD일')
        }
      });
  };

  useEffect(() => {
    setInterval(getDate, 5000);
    return () => {
      clearInterval(getDate);
    };
  }, []);

  return <div className={classes.date}>{todayDate}</div>;
};

TodayDate.propTypes = {
  todayDate: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(state => ({
  todayDate: state.todayDate
}))(TodayDate);
