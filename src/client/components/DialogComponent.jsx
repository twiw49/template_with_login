import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  dialog: {
    [theme.breakpoints.only('xs')]: {
      margin: 0,
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: 'none',
      borderRadius: 0
    }
  }
}));

const DialogComponent = ({ Trigger, Content, title, fullScreen }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Fragment>
      <div onClick={handleOpen}>
        <Trigger />
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        classes={{
          paper: classes.dialog
        }}
      >
        <div className={classes.flex}>
          <DialogTitle style={{ padding: '0 1rem' }}>{title}</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              닫기
            </Button>
          </DialogActions>
        </div>
        <DialogContent style={{ padding: '1rem', paddingTop: '0' }}>
          <Content handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

DialogComponent.propTypes = {
  Trigger: PropTypes.any,
  Content: PropTypes.any,
  title: PropTypes.string.isRequired,
  fullScreen: PropTypes.bool
};

export default DialogComponent;
