import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createGlobalStyle } from 'styled-components';
import { ThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

import Home from './Home';
import LandingPage from './LandingPage';

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  font-family: "NanumSquare", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
}
*:active, *:focus {
  outline: 0;
  outline-style: none;
  -moz-outline-style: none;
}
`;

const LoadingComponent = () => <div />;

const App = ({ user, isLoading }) => {
  return (
    <ThemeProvider
      theme={responsiveFontSizes(
        createMuiTheme({
          typography: {
            fontFamily: ['"NanumSquare"']
          }
        })
      )}
    >
      <Switch>
        <Route
          exact
          path="/"
          component={isLoading ? LoadingComponent : user ? Home : LandingPage}
        />
        <Redirect to="/" />
      </Switch>
      <GlobalStyle />
    </ThemeProvider>
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
