import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Menu from 'react-burger-menu';

import * as Styled from './Styled';
import './style.scss';

class SlideMenu extends Component {
  static propTypes = {
    user: PropTypes.object,
    isGuest: PropTypes.bool.isRequired
  };

  render() {
    const { user, isGuest } = this.props;

    return (
      <Menu.stack right width="250px">
        {user && <Styled.UserName>{user.name}</Styled.UserName>}
        {isGuest && <Styled.UserName>Guest</Styled.UserName>}
        <NavLink exact to="/today">
          <Styled.IconTitle>오늘 일기</Styled.IconTitle>
        </NavLink>
        <NavLink exact to="/diaries">
          <Styled.IconTitle>모든 일기</Styled.IconTitle>
        </NavLink>
        {user && (
          <a href="/auth/logout">
            <Styled.IconTitle>로그아웃</Styled.IconTitle>
          </a>
        )}
        {isGuest && (
          <a href="/">
            <Styled.IconTitle>로그인</Styled.IconTitle>
          </a>
        )}
      </Menu.stack>
    );
  }
}

export default SlideMenu;
