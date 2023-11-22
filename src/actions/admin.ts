import { Dispatch } from 'redux';
import { Navigate } from 'react-router-dom';
import api from '../utils/api';
import {
  GET_VIDEOS,
  GET_CURATORS,
  SET_DATE,
  ALL_FILTER,
  YPP_FILTER,
  NFT_FILTER,
  CHECKED_FILTER,
  DELETE_CURATOR,
  ADD_CURATOR,
  ASSIGNMENT_VIDEOS,
  NON_CHECKED_FILTER,
  NON_NFT_FILTER,
  NON_YPP_FILTER,
  NUM_ALL_VIDEOS
} from './types';

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
      type: NUM_ALL_VIDEOS,
    });
  } catch (error) {
    console.log(error, 'Fetch UnCheckedList Error');
  }
};
export const setDate = (date: string) => async (dispatch: Dispatch) => {
  try {
    console.log(date, 'datedffffff');
    dispatch({
      type: SET_DATE,
      payload: date,
    });
  } catch (error) {
    console.log(error, 'Fetch UnCheckedList Error');
  }
};

export const setFilter = (filter: any) => async (dispatch: Dispatch) => {
  try {
    switch (filter) {
      case 1:
        dispatch({
          type: ALL_FILTER,
        });
        break;
      case 2:
        dispatch({
          type: YPP_FILTER,
        });
        break;
      case 3:
        dispatch({
          type: NFT_FILTER,
        });
        break;
      case 4:
        dispatch({
          type: CHECKED_FILTER,
        });
        break;
        case 5:
        dispatch({
          type: NON_YPP_FILTER,
        });
        break;
        case 6:
        dispatch({
          type: NON_NFT_FILTER,
        });
        break;
        case 7:
        dispatch({
          type: NON_CHECKED_FILTER,
        });
        break;

      default:
        break;
    }
  } catch (error) {
    console.log(error, 'Fetch UnCheckedList Error');
  }
};

export const sendVideoList = (selectList: any, curator: any) => async (dispatch: Dispatch) => {
  try {
    const data = { selectList, curator };
    const response = await api.post('leader/assignment/send-video-list', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch({
      type: ASSIGNMENT_VIDEOS,
      payload: data,
    });
  } catch (error) {
    console.log(error, 'Fetch CuratorList Error');
  }
};

export const getCuratorList = () => async (dispatch: Dispatch) => {
  try {
    const res = await api.get('leader/curator-list', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch({
      type: GET_CURATORS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error, 'Fetch CuratorList Error');
  }
};

export const delCurator = (email: any) => async (dispatch: Dispatch) => {
  try {
    console.log(email, 'email');
    await api.delete(`/leader/curator-list/${email}`);

    dispatch({
      type: DELETE_CURATOR,
      payload: email,
    });
  } catch (err) {
    console.log(err, 'Delete CuratorList Error');
  }
};

// Add post
export const addCurator = (formData: any) => async (dispatch: Dispatch) => {
  try {
    const res = await api.post('/leader/curator-list/', formData);

    dispatch({
      type: ADD_CURATOR,
      payload: res.data,
    });
  } catch (err) {
    console.log(err, 'ADD CuratorList Error');
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
