import { combineReducers } from 'redux';

import admin from './admin';
import alert from './alert';
import auth from './auth';
import curator from './curator';

export default combineReducers({
  alert,
  auth,
  admin,
  curator
});
