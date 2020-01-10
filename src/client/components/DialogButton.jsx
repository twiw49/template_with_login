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

const ResponsiveDialog = ({ Content, title, dialogTitle }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Fragment>
      <Button
        onClick={handleClickOpen}
        color="default"
        variant="contained"
        style={{ margin: '0.5rem' }}
        size="small"
      >
        {title}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        classes={{
          paper: classes.dialog
        }}
      >
        <div className={classes.flex}>
          <DialogTitle style={{ padding: '0.5rem 1rem' }}>{dialogTitle}</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              닫기
            </Button>
          </DialogActions>
        </div>
        <DialogContent style={{ background: '#222', padding: 10 }}>
          <Content />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

ResponsiveDialog.propTypes = {
  Content: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  dialogTitle: PropTypes.string.isRequired
};

export default ResponsiveDialog;
