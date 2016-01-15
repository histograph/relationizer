import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import createHistory from 'history/lib/createBrowserHistory';
import routes from '../routes';
import reducers from '../reducers';

const store = compose(
  applyMiddleware(thunk),
  reduxReactRouter({
    routes,
    createHistory,
  }),
  applyMiddleware(createLogger({
    predicate: () => __DEV__,
    collapsed: true,
  }))
)(createStore)(reducers);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers', () => {
    const nextRootReducer = require('../reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
