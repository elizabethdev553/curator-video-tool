import { Navigate } from 'react-router-dom';
import { Dispatch } from 'redux';

import api from '../utils/api';
import {
  GET_CURATOR_VIDEOS,
  GET_VIDEO_DETAIL
  // AUTHORITY_SET,
} from './types';

export const saveDescriptionResult = (value: any, id: any)  => async (dispatch: Dispatch) => {
  try {
    const data = value;
    data.video_id = id;
    const response = await api.post('/curator/check/description', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const sendVideoListResponse = response.data;
    // setMsg(sendVideoListResponse.Success);
  } catch (error) {
    console.log(error, 'Fetch Description Error');
  }
};

export const getVideoDetail = (video_id: string | undefined) => async (dispatch: Dispatch) => {
  try {
    const res = await api.get(`curator/detail/${video_id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch({
      type:GET_VIDEO_DETAIL,
      payload: res.data
    })

    // Do something with the user data
  } catch (error) {
    console.log(error, 'Fetch UnCheckedList Error');
  }
}


export const getUnCheckedList = (member_id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await api.get(`/curator/${member_id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch({
      type: GET_CURATOR_VIDEOS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error, 'Fetch UnCheckedList Error');
  }
};
