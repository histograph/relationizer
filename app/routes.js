import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './containers/App';
import MainView from './containers/MainView';
import FlagView from './containers/FlagView';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={MainView}/>
    <Route path="/type/:type" component={MainView}/>
    <Route path="/dataset/:dataset" component={MainView}/>
    <Route path="/flags" component={FlagView}/>
  </Route>
);
