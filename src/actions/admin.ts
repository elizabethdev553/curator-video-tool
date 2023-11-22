import { Dispatch } from 'redux';
import { Navigate } from 'react-router-dom';
import api from '../utils/api';
import { GET_VIDEOS, SET_LOADING,SET_DATE } from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

export const getVideoList = (date: string) => async (dispatch: Dispatch) => {
  try {
    const res = await api.get(`leader/video-list/${date}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch({
      type: GET_VIDEOS,
      payload: res.data,
    });
    dispatch({
      type: SET_DATE,
      payload: date,
    });
  
  } catch (error) {
    console.log(error, 'Fetch UnCheckedList Error');
  }
};

// Load User
// export const loadUser = () => async (dispatch: Dispatch) => {
//   try {
//     const res = await api.get('/auth');

//     dispatch({
//       type: USER_LOADED,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: AUTH_ERROR
//     });
//   }
// };

// // Register User
// export const register = (formData:any) => async (dispatch: Dispatch) => {
//   try {
//     const res = await api.post('/members', formData);

//     dispatch({
//       type: REGISTER_SUCCESS,
//       payload: res.data
//     });
//     dispatch(loadUser() as any);
//   } catch (err:any) {
//     const errors = err.response.data.errors;

//     if (errors) {
//       console.log(errors, "Register Action Error")
//     }

//     dispatch({
//       type: REGISTER_FAIL
//     });
//   }
// };

// // Login User
// export const login = (email:string, password:string) => async (dispatch: Dispatch) => {
//   const body = { email, password };

//   try {
//     const res = await api.post('/auth', body);

//     dispatch({
//       type: LOGIN_SUCCESS,
//       payload: res.data
//     });

//     dispatch(loadUser() as any);
//   } catch (err:any) {
//     const errors = err.response.data.errors;

//     if (errors) {
//       console.log(errors, "auth Action Error")
//     }

//     dispatch({
//       type: LOGIN_FAIL
//     });
//   }
// };

// // Logout
// export const logout = () => ({ type: LOGOUT });
