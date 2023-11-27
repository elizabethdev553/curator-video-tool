import { Dispatch } from 'redux';
import {Navigate} from 'react-router-dom'
import api from '../utils/api';
import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED} from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Load User
export const loadUser = () => async (dispatch: Dispatch) => {
  try {
    const res = await api.get('/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = (formData:any) => async (dispatch: Dispatch) => {
  try {
    const res = await api.post('/members', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    // dispatch(loadUser() as any);
  } catch (err:any) {
    const errors = err.response.data.errors;

    if (errors) {
      console.log(errors, "Register Action Error")
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = (email:string, password:string) => async (dispatch: Dispatch) => {
  const body = { email, password };

  try {
    const res = await api.post('/auth', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser() as any);
  } catch (err:any) {
    const errors = err.response.data.errors;

    // if (errors) {
      console.log(errors, "auth Action Error")
    // }

    dispatch({
      type: LOGIN_FAIL,
      payload: errors
    });
  }
};

// Logout
export const logout = () => ({ type: LOGOUT });
