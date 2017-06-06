export default {
  path: 'home',
  name: 'Home',
  staticName: true,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/HomeView').default);
    }, 'Home');
  },
};
