import CSSModules from 'react-css-modules';
import React from 'react';

import styles from './Spinner.scss';

@CSSModules(styles)
class Spinner extends React.Component {
  render() {
    return (
      <div styleName="container">
        <div styleName="spinner">
          <div styleName="bounce1" />
          <div styleName="bounce2" />
        </div>
      </div>
    );
  }
}

export default Spinner;
