import CSSModules from 'react-css-modules';
import React from 'react';

import styles from './TextField.scss';

@CSSModules(styles)
class TextField extends React.Component {
  render() {
    return (
      <input styleName="text-field" {...this.props} />
    );
  }
}

export default TextField;
