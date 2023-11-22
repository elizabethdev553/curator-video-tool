import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import curator from './curator';
import admin from './admin';

export default combineReducers({
  alert,
  auth,
  admin,
  curator
});
