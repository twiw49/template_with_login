import React, { Fragment } from 'react';
import PopupMenu from '../components/PopupMenu';

const withPopupMenu = WrappedComponent => {
  const HOC = props => {
    return (
      <Fragment>
        <PopupMenu {...props} />
        <WrappedComponent {...props} />
      </Fragment>
    );
  };

  return HOC;
};

export default withPopupMenu;
