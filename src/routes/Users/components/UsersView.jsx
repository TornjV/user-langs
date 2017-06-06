import { NestedRoute } from 'routes/utils';
import CSSModules from 'react-css-modules';
import React from 'react';

import styles from './UsersView.scss';

@NestedRoute
@CSSModules(styles)
class UsersView extends React.Component {

  render() {
    return (
      <div styleName="users-view">
        <h1>Treding useri:</h1>

        <div styleName="users">
          <h4>TornjV</h4>
          <h4>TornjV</h4>
          <h4>TornjV</h4>
        </div>
      </div>
    );
  }
}

export default UsersView;
