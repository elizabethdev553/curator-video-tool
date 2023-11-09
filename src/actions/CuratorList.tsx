// import api from '../utils/api';

import axios from 'axios'
// import { setAlert } from './alert';
// import {
//   REGISTER_SUCCESS,
//   REGISTER_FAIL,
//   USER_LOADED,
//   AUTH_ERROR,
//   LOGIN_SUCCESS,
//   LOGIN_FAIL,
//   LOGOUT
// } from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Load User
// export const uploadList = (data) => async (dispatch) => {

//   // console.log( data, "sdfsddfffffffffffffffffffffffffffffffs")
//   try {
//     const res = await api.post('/assignment/upload', data);
    
//     console.log(res.data, "RESPONSE")
//     // dispatch({
//       //   type: USER_LOADED,
//       //   payload: res.data
//       // });
//     } catch (err) {
//     // dispatch({
//     //   type: AUTH_ERROR
//     // });
//     console.log( "ERROR")
//   }
// };

export const getCuratorList = () => async () => {

  // console.log( data, "sdfsddfffffffffffffffffffffffffffffffs")
  try {
    const res = await axios.get('/assignment');
    
    console.log(res.data, "RESPONSE")
    // dispatch({
      //   type: USER_LOADED,
      //   payload: res.data
      // });
    } catch (err) {
    // dispatch({
    //   type: AUTH_ERROR
    // });
    console.log("ERROR")
  }
};