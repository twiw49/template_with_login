import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment-timezone';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  summary: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  logs: {
    width: '100%'
  },
  flex: {
    display: 'flex'
  },
  gray: {
    marginLeft: '10px',
    color: 'gray'
  },
  title: {
    marginTop: '5px',
    color: 'gray'
  },
  log: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '10px',
    marginBottom: '10px'
  },
  delete: {
    paddingLeft: '10px',
    cursor: 'pointer',
    color: 'rgba(0, 0, 0, 0.3)',
    '&:hover': {
      color: 'black'
    }
  },
  total: {
    fontSize: '1.5rem',
    fontWeight: 'bold'
  }
}));

const HabitPast = ({ logs, dispatch }) => {
  const classes = useStyles();

  const handleDeleteLog = id => {
    dispatch({
      type: 'DELETE_LOG',
      payload: {
        id
      }
    });
  };

  const obj = logs.reduce((prev, curr) => {
    const date = moment(curr.time, 'YYYY년 MM월 DD일 HH시 mm분 ss초').format('YYYYMMDD');
    prev[date] = date in prev ? [...prev[date], curr] : [curr];
    return { ...prev };
  }, {});

  return (
    <div className={classes.root}>
      {Object.keys(obj).map(date => {
        const total = obj[date].reduce((prev, curr) => prev + curr.money, 0);

        return (
          <ExpansionPanel TransitionProps={{ unmountOnExit: true }} key={date}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="content">
              <div className={classes.summary}>
                <div className={classes.total}>{`${total.toLocaleString()}원`}</div>
                <div>{moment(date, 'YYYYMMDD').format('YYYY년 MM월 DD일')}</div>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className={classes.logs}>
                {obj[date].map(log => (
                  <div key={log.id} className={classes.log}>
                    <div>
                      <div>{`${log.money.toLocaleString()}원`}</div>
                      <div className={classes.title}>{`${log.title}`}</div>
                    </div>
                    <div className={classes.flex}>
                      <div className={classes.gray}>{log.time}</div>
                      <div className={classes.delete} onClick={() => handleDeleteLog(log.id)}>
                        X
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </div>
  );
};

HabitPast.propTypes = {
  logs: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(state => ({
  logs: state.user.logs
}))(HabitPast);
