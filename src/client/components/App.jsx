import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createGlobalStyle } from 'styled-components';

import Home from './Home';
import LandingPage from './LandingPage';
import withSlideMenu from '../HOCs/withSlideMenu';

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
}
`;

const App = props => {
  const { user, isGuest } = props;

  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={user || isGuest ? Home : LandingPage} />
        <Redirect to="/" />
      </Switch>
      <GlobalStyle />
    </Fragment>
  );
};

App.propTypes = {
  user: PropTypes.object,
  isGuest: PropTypes.bool
};

export default compose(
  withRouter,
  connect(state => ({
    isGuest: state.isGuest,
    user: state.user
  })),
  withSlideMenu
)(App);
