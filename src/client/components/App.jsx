import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createGlobalStyle } from 'styled-components';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

import { create } from 'jss';

import Home from './Home';
import LandingPage from './LandingPage';

const jss = create({
  ...jssPreset(),
  // Define a custom insertion point that JSS will look for when injecting the styles into the DOM.
  insertionPoint: 'jss-insertion-point'
});

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
    <StylesProvider jss={jss}>
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
    </StylesProvider>
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
  }))
)(App);
