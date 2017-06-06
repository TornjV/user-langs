import User from './routes/User';

export default {
  path: 'users',
  name: 'Users',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/UsersView').default);
    }, 'Users');
  },
  childRoutes: [
    User,
  ],
};
