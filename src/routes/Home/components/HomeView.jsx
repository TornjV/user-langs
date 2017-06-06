import { browserHistory } from 'react-router';
import CSSModules from 'react-css-modules';
import { TextField } from 'components';
import React from 'react';

import styles from './HomeView.scss';

@CSSModules(styles)
class HomeView extends React.Component {

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const username = encodeURIComponent(e.target.value);
      browserHistory.push(`/users/${username}`);
    }
  }

  render() {
    return (
      <div styleName="home-view">
        <div styleName="container">
          <h2 styleName="lead">You just landed on one of the most innovative apps, User Langs!</h2>

          <div styleName="input">
            <h1>Username:</h1>
            <TextField autoFocus onKeyPress={this.handleKeyPress} placeholder="TornjV" />
          </div>
        </div>
      </div>
    );
  }
}

export default HomeView;
