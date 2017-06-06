import { browserHistory } from 'react-router';
import CSSModules from 'react-css-modules';
import React from 'react';

import styles from './Header.scss';

@CSSModules(styles)
class Header extends React.Component {
  render() {
    return (
      <nav styleName="header">
        <div styleName="content">
          <h5 styleName="branding" onClick={() => browserHistory.push('/home')} >
            User Langs
          </h5>
        </div>
      </nav>
    );
  }
}

export default Header;
