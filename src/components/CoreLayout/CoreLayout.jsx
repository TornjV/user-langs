import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './CoreLayout.scss';
import Header from './components/Header';

@CSSModules(styles)
class CoreLayout extends React.Component {

  render() {
    const { children } = this.props;

    return (
      <div styleName="core-layout">
        <div styleName="container">
          <Header />

          <div styleName="content">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

CoreLayout.propTypes = {
  children: PropTypes.node,
};

export default CoreLayout;
