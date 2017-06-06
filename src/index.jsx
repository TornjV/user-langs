/* eslint global-require: 0, react/jsx-filename-extension: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import bluebird from 'bluebird';
import { browserHistory } from 'react-router';
import { App } from 'components';

require('babel-runtime/core-js/promise').default = bluebird;

const MOUNT_NODE = document.getElementById('root');

let render = () => {
  const routes = require('./routes/index').default;

  ReactDOM.render(
    <App
      history={browserHistory}
      routes={routes}
    />,
    MOUNT_NODE,
  );
};

if (module.hot) {
  const orgRender = render;

  render = () => {
    try {
      orgRender();
    } catch (error) {
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    }
  };

  module.hot.accept('./routes/index', () =>
    setImmediate(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      render();
    }),
  );
}

render();
