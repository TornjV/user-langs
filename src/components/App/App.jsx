import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';

const networkInterface = createNetworkInterface({ uri: `${process.env.API_BASE_URL}/graphql` });

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) req.options.headers = {};
    req.options.headers.authorization = `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`;
    next();
  },
}]);

const client = new ApolloClient({
  networkInterface,
});

const App = ({ history, routes, routerKey }) => (
  <ApolloProvider client={client}>
    <Router history={history} key={routerKey}>
      {routes}
    </Router>
  </ApolloProvider>
);

App.propTypes = {
  history: PropTypes.any,
  routes: PropTypes.any,
  routerKey: PropTypes.any,
};

export default App;
