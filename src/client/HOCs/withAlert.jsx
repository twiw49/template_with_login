import React, { Fragment } from 'react';
import Alert from '../components/Alert';

const withAlert = WrappedComponent => {
  const HOC = props => {
    return (
      <Fragment>
        <Alert {...props} />
        <WrappedComponent {...props} />
      </Fragment>
    );
  };

  return HOC;
};

export default withAlert;
