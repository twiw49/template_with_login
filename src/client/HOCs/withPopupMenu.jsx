import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import PopupMenu from '../components/PopupMenu';

const withPopupMenu = WrappedComponent => {
  const HOC = props => {
    const { user } = props;

    if (user) {
      return (
        <Fragment>
          <PopupMenu {...props} />
          <WrappedComponent {...props} />
        </Fragment>
      );
    }

    return <WrappedComponent {...props} />;
  };

  HOC.propTypes = {
    user: PropTypes.object
  };

  return HOC;
};

export default withPopupMenu;
