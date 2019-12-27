import React, { Component } from 'react';

const withAnimation = WrappedComponent =>
  class HOC extends Component {
    state = {
      animate: false
    };

    componentDidMount = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.setState({ animate: true });
        });
      });
    };

    render() {
      const { animate } = this.state;
      return (
        <div
          style={{
            opacity: animate ? 1 : 0,
            transition: 'all 400ms ease-out'
          }}
        >
          {animate && <WrappedComponent {...this.props} />}
        </div>
      );
    }
  };

export default withAnimation;
