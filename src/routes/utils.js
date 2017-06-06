/* eslint-disable */
import React, { Component } from 'react';

export const NestedRoute = ComposedComponent => class extends Component {
  render() {
    if (this.props.children) return this.props.children;
    return <ComposedComponent {...this.props} />;
  }
};
