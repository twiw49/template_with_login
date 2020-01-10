import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createGlobalStyle } from 'styled-components';

import Home from './Home';
import LandingPage from './LandingPage';
import withPopupMenu from '../HOCs/withPopupMenu';

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
}
*:active, *:focus {
  outline: 0;
  -moz-outline-style: none;
}
`;

const LoadingComponent = () => <div />;

const App = ({ user, isLoading }) => {
  return (
    <Fragment>
      <Switch>
        <Route
          exact
          path="/"
          component={isLoading ? LoadingComponent : user ? Home : LandingPage}
        />
        <Redirect to="/" />
      </Switch>
      <GlobalStyle />
    </Fragment>
  );
};

App.propTypes = {
  user: PropTypes.object,
  isLoading: PropTypes.bool
};

export default compose(
  withRouter,
  connect(state => ({
    user: state.user,
    isLoading: state.isLoading
  })),
  withPopupMenu
)(App);
