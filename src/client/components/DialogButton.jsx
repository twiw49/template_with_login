import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

class ResponsiveDialog extends Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { Content, title, dialogTitle, fullScreen } = this.props;

    const { open } = this.state;

    return (
      <Fragment>
        <Button
          onClick={this.handleClickOpen}
          color="default"
          variant="contained"
          style={{ margin: '0.5rem' }}
          size="small"
        >
          {title}
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          maxWidth="md"
          fullScreen={fullScreen}
          fullWidth
        >
          <FlexContainer>
            <DialogTitle style={{ padding: '0.5rem 1rem' }}>{dialogTitle}</DialogTitle>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                닫기
              </Button>
            </DialogActions>
          </FlexContainer>
          <DialogContent style={{ background: '#222', padding: 10 }}>
            <Content />
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

ResponsiveDialog.propTypes = {
  Content: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  dialogTitle: PropTypes.string.isRequired,
  fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog()(ResponsiveDialog);
