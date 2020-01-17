import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import styled from 'styled-components';
import HabitAdd from './HabitAdd';
import DialogComponent from './DialogComponent';

const UserProfile = styled.div`
  width: 3rem;
  height: 3rem;
  background: ${props => {
    return `url(${props.profile_url})`;
  }};
  background-size: contain;
  border-radius: 50%;
  position: fixed;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;

const PopupMenu = ({ profile_image, dispatch }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = async () => {
    dispatch({ type: 'LOGOUT' });
    handleClose();
    await axios.get('/auth/logout');
  };

  return (
    <Fragment>
      <UserProfile profile_url={profile_image} onClick={handleClick} />
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        elevation={1}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <MenuItem onClick={handleClose} disableGutters style={{ display: 'block' }}>
          <DialogComponent
            Trigger={() => (
              <div
                style={{
                  paddingLeft: '16px',
                  paddingRight: '16px',
                  minHeight: '36px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                습관추가
              </div>
            )}
            Content={HabitAdd}
            title="습관추가"
          />
        </MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Fragment>
  );
};

PopupMenu.propTypes = {
  profile_image: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(state => ({
  profile_image: state.user.profile_image
}))(PopupMenu);
