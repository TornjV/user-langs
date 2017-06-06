import CoreLayout from '../components/CoreLayout';
import Home from './Home';
import Users from './Users';

export default {
  path: '/',
  name: 'CoreLayout',
  staticName: true,
  component: CoreLayout,
  indexRoute: {
    onEnter: (nextState, replace, cb) => {
      replace('/home');
      cb();
    },
  },
  childRoutes: [
    Home,
    Users,
  ],
};
