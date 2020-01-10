import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import styled from 'styled-components';

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
`;

const PopupMenu = ({ user, history, dispatch }) => {
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
    user && (
      <Fragment>
        <UserProfile profile_url={user.profile_image} onClick={handleClick} />
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
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Fragment>
    )
  );
};

PopupMenu.propTypes = {
  user: PropTypes.object
};

export default connect()(PopupMenu);
