import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SlideMenu from '../components/SlideMenu';

const withSlideMenu = WrappedComponent => {
  const HOC = ({ user, isGuest }) => {
    if (user || isGuest) {
      return (
        <Fragment>
          <SlideMenu {...props} />
          <WrappedComponent {...props} />
        </Fragment>
      );
    }

    return <WrappedComponent {...props} />;
  };

  HOC.propTypes = {
    user: PropTypes.object,
    isGuest: PropTypes.bool.isRequired
  };

  return HOC;
};

export default withSlideMenu;
