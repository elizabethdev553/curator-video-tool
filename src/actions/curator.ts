import { Dispatch } from 'redux';
import { Navigate } from 'react-router-dom';
import api from '../utils/api';


import {
  GET_CURATOR_VIDEOS,
  // AUTHORITY_SET,

} from './types';


export const getUnCheckedList = (member_id: string) => async (dispatch: Dispatch) => {

  try {
    const res = await api.get(`/curator/${member_id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch({
      type: GET_CURATOR_VIDEOS,
      payload: res.data
    });
  } catch (error) {
    console.log(error, 'Fetch UnCheckedList Error');
  }
};




