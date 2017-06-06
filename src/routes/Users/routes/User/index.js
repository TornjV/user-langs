export default {
  path: ':username',
  name: 'User',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/UserView').default);
    }, 'User');
  },
};
