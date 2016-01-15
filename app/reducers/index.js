import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';

import flag from './flag';
import api from '../utils/api';
import admin from '../utils/admin';

const data = combineReducers(Object.assign({},
  api.reducers,
  admin.reducers
));

export default combineReducers({ router, flag, data });
