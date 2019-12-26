import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import Home from "./Home";
import LandingPage from "./LandingPage";
import { connect } from "react-redux";
import { compose } from "redux";
import { injectGlobal } from "styled-components";
import "core-js/stable";
import "regenerator-runtime/runtime";

injectGlobal`
  body {
    margin: 0;
    padding: 0;
  }
`;

const App = props => {
  const { user, isGuest } = props;

  if (user || isGuest) {
    return (
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Redirect to={"/"} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path={"/"} component={LandingPage} />
      <Redirect to={"/"} />
    </Switch>
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
  }))
)(App);
