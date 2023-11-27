import { Dispatch } from 'redux';
import { Navigate } from 'react-router-dom';
import api from '../utils/api';
import {
  SET__LATEST_VIDEO,
  AUTHORITY_SET,
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
  NUM_ALL_VIDEOS,
  YPP_NFT,
  YPP_N_NFT,
  YPP_CHECK,
  YPP_N_CHECK,
  N_YPP_NFT,
  N_YPP_N_NFT,
  N_YPP_CHECK,
  N_YPP_N_CHECK,
  NFT_CHECK,
  NFT_N_CHECK,
  N_NFT_CHECK,
  N_NFT_N_CHECK,
  YPP_NFT_CHECK,
  YPP_NFT_N_CHECK,
  YPP_N_NFT_CHECK,
  YPP_N_NFT_N_CHECK,
  N_YPP_NFT_CHECK,
  N_YPP_NFT_N_CHECK,
  N_YPP_N_NFT_CHECK,
  N_YPP_N_NFT_N_CHECK,
  NEVER_FILTER,
} from './types';

export const getVideoListRange = (start: string,end:string ) => async (dispatch: Dispatch) => {
  try {
    const date = [start, end]
    const res = await api.get(`leader/video-list/date-range/${start}/${end}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch({
      type: GET_VIDEOS,
      payload: res.data
    });
    dispatch({
      type: SET_DATE,
      payload: date
    });
  } catch (error) {
    console.log(error, 'Fetch UnCheckedList Error');
  }
};

export const setAuthority = (data: any, item:any) => async (dispatch: Dispatch) => {
  try {
    const response = await api.post('leader/authority/set', item, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch({
      type: GET_CURATORS,
      payload: data,
    });
  } catch (error) {
    console.log(error, 'Fetch CuratorList Error');
  }
};

export const setDate = (date: string) => async (dispatch: Dispatch) => {
  try {
    // console.log(date, 'datedffffff');
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
      case '':
        dispatch({
          type: ALL_FILTER,
        });
        break;
      case 'A':
        dispatch({
          type: YPP_FILTER,
        });
        break;
      case 'B':
        dispatch({
          type: NON_YPP_FILTER,
        });
        break;
      case 'C':
        dispatch({
          type: NFT_FILTER,
        });
        break;
      case 'D':
        dispatch({
          type: NON_NFT_FILTER,
        });
        break;
      case 'E':
        dispatch({
          type: CHECKED_FILTER,
        });
        break;
      case 'F':
        dispatch({
          type: NON_CHECKED_FILTER,
        });
        break;

      case 'AC':
        dispatch({
          type: YPP_NFT,
        });
        break;
      case 'AD':
        dispatch({
          type: YPP_N_NFT,
        });
        break;
      case 'AE':
        dispatch({
          type: YPP_CHECK,
        });
        break;
      case 'AF':
        dispatch({
          type: YPP_N_CHECK,
        });
        break;
      case 'BC':
        dispatch({
          type: N_YPP_NFT,
        });
        break;
      case 'BD':
        dispatch({
          type: N_YPP_N_NFT,
        });
        break;
      case 'BE':
        dispatch({
          type: N_YPP_CHECK,
        });
        break;
      case 'BF':
        dispatch({
          type: N_YPP_N_CHECK,
        });
        break;
      case 'CE':
        dispatch({
          type: NFT_CHECK,
        });
        break;
      case 'CF':
        dispatch({
          type: NFT_N_CHECK,
        });
        break;
      case 'DE':
        dispatch({
          type: N_NFT_CHECK,
        });
        break;
      case 'DF':
        dispatch({
          type: N_NFT_N_CHECK,
        });
        break;
      case 'ACE':
        dispatch({
          type: YPP_NFT_CHECK,
        });
        break;
      case 'ACF':
        dispatch({
          type: YPP_NFT_N_CHECK,
        });
        break;
      case 'ADE':
        dispatch({
          type: YPP_N_NFT_CHECK,
        });
        break;
      case 'ADF':
        dispatch({
          type: YPP_N_NFT_N_CHECK,
        });
        break;
      case 'BCE':
        dispatch({
          type: N_YPP_NFT_CHECK,
        });
        break;
      case 'BCF':
        dispatch({
          type: N_YPP_NFT_N_CHECK,
        });
        break;
      case 'BDE':
        dispatch({
          type: N_YPP_N_NFT_CHECK,
        });
        break;
      case 'BDF':
        dispatch({
          type: N_YPP_N_NFT_N_CHECK,
        });
        break;

      default:
        dispatch({
          type: NEVER_FILTER,
        });
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

export const getVideoLatest = () => async (dispatch: Dispatch) => {
  try {

    const res = await api.get(`leader/video-list/last/video`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log(res.data, "res.data")
    // dispatch({
    //   type: GET_VIDEOS,
    //   payload: res.data
    // });
    dispatch({
      type: SET__LATEST_VIDEO,
      payload: res.data
    });
  } catch (error) {
    console.log(error, 'Fetch UnCheckedList Error');
  }
};

export const getMemberList = () => async (dispatch: Dispatch) => {
  try {
    const res = await api.get('leader/members/members-list', {
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
    // console.log(email, 'email');
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
