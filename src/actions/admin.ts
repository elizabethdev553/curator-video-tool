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


export const getVideoListRange = (date: string) => async (dispatch: Dispatch) => {
  try {
    const start= date[0]
    const end= date[1]
    const res = await api.get(`leader/video-list/date-range/${start}/${end}`, {
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
      payload:date
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
