import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
// import profile from './profile';
import admin from './admin';

export default combineReducers({
  alert,
  auth,
  admin
});
