import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}));

const Snackbars = ({ isAlertOpen, dispatch }) => {
  const classes = useStyles();

  const handleClose = () =>
    dispatch({
      type: 'CLOSE_ALERT'
    });

  return (
    <div className={classes.root}>
      <Snackbar open={Boolean(isAlertOpen)} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
          {isAlertOpen.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

Snackbars.propTypes = {
  isAlertOpen: PropTypes.any,
  dispatch: PropTypes.func.isRequired
};

export default connect(state => ({ isAlertOpen: state.isAlertOpen }))(Snackbars);
