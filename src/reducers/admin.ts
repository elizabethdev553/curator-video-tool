import dayjs from 'dayjs';

import {
  ADD_COMMENT,
  ADD_VIDEO,
  ALL_FILTER,
  ASSIGNMENT_VIDEOS,
  CHECKED_FILTER,
  DELETE_VIDEO,
  GET_CURATORS,
  GET_VIDEO,
  GET_VIDEOS,
  N_NFT_CHECK,
  N_NFT_N_CHECK,
  N_YPP_CHECK,
  N_YPP_N_CHECK,
  N_YPP_N_NFT,
  N_YPP_N_NFT_CHECK,
  N_YPP_N_NFT_N_CHECK,
  N_YPP_NFT,
  N_YPP_NFT_CHECK,
  N_YPP_NFT_N_CHECK,
  NEVER_FILTER,
  NFT_CHECK,
  NFT_FILTER,
  NFT_N_CHECK,
  NON_CHECKED_FILTER,
  NON_NFT_FILTER,
  NON_YPP_FILTER,
  REMOVE_COMMENT,
  SET__LATEST_VIDEO,
  SET_DATE,
  SET_LOADING,
  UPDATE_LIKES,
  VIDEO_ERROR,
  YPP_CHECK,
  YPP_FILTER,
  YPP_N_CHECK,
  YPP_N_NFT,
  YPP_N_NFT_CHECK,
  YPP_N_NFT_N_CHECK,
  YPP_NFT,
  YPP_NFT_CHECK,
  YPP_NFT_N_CHECK} from '../actions/types';

const today = new Date();

const year = String(today.getFullYear()).slice(-2);
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');

const TODAY = `20${year}-${month}-${day}`;

const initialState = {
  videos: [],
  video: null,
  loading: true,
  error: {},
  sel_date: TODAY,
  filter_data: [],
  all_num: null,
  ypp_num: null,
  nft_num: null,
  uncheck_num: null,
  cat_A: null,
  cat_B: null,
  cat_C: null,
  cat_D: null,
  toxic: null,
  duplicate: null,
  start: dayjs(dayjs().format('YYYY-MM-DD 00:00')),
  end: dayjs(),
  latest:null
};

function videoReducer(state = initialState, action: any) {
  const { type, payload } = action;
  let tmp: any = null;
  let tmp1: any = null;
  switch (type) {
    case GET_VIDEOS:
      // console.log(state, 'videos');
      return {
        ...state,
        videos: payload,
        filter_data: payload,
        loading: false,
        all_num: payload.length,
        ypp_num: payload.filter((item: any) => item.video_yt_id !== null).length,
        nft_num: payload.filter((item: any) => item.video_nft_id != 'No' && item.video_nft_id != null).length,
        uncheck_num: payload.filter((item: any) => item.video_check_flag == false).length,
        cat_A: payload.filter((item: any) => item.video_category == 'A').length,
        cat_B: payload.filter((item: any) => item.video_category == 'B').length,
        cat_C: payload.filter((item: any) => item.video_category == 'C').length,
        cat_D: payload.filter((item: any) => item.video_category == 'D').length,
        toxic: payload.filter((item: any) => item.video_check_tag != ''&&null).length,
        duplicate: payload.filter((item: any) => item.video_duplicate == 'Yes').length,
        // start: payload[0],
        // end: payload[1],
      };
    case SET_DATE:
      // console.log(payload, "payloadddddddddddddddddddddddddddddddd")
      return {
        ...state,
        start: dayjs(payload[0]),
        end: dayjs(payload[1]),
        // loading: true,
      };
      case SET__LATEST_VIDEO:
      return {
        ...state,
        latest: payload
      };
    case GET_CURATORS:
      return {
        ...state,
        curators: payload,
      };

    case YPP_NFT:
      tmp = state.videos.filter((item: any) => item.video_yt_id !== null);
      return {
        ...state,
        filter_data: tmp.filter((item: any) => item.video_nft_id !== 'No' && item.video_nft_id !== null),
        loading: false,
      };
    case YPP_N_NFT:
      tmp = state.videos.filter((item: any) => item.video_yt_id !== null);
      return {
        ...state,
        filter_data: tmp.filter((item: any) => item.video_nft_id == 'No' || item.video_nft_id == null),
        loading: false,
      };
    case YPP_CHECK:
      tmp = state.videos.filter((item: any) => item.video_yt_id !== null);
      return {
        ...state,
        filter_data: tmp.filter((item: any) => item.video_check_flag !== false),
        loading: false,
      };

    case YPP_N_CHECK:
      tmp = state.videos.filter((item: any) => item.video_yt_id !== null);
      return {
        ...state,
        filter_data: tmp.filter((item: any) => item.video_check_flag == false),
        loading: false,
      };

    case N_YPP_NFT:
      tmp = state.videos.filter((item: any) => item.video_yt_id == null);
      return {
        ...state,
        filter_data: tmp.filter((item: any) => item.video_nft_id !== 'No' && item.video_nft_id !== null),
        loading: false,
      };

    case N_YPP_N_NFT:
      tmp = state.videos.filter((item: any) => item.video_yt_id == null);
      return {
        ...state,
        filter_data: tmp.filter((item: any) => item.video_nft_id == 'No' || item.video_nft_id == null),
        loading: false,
      };

    case N_YPP_CHECK:
      tmp = state.videos.filter((item: any) => item.video_yt_id == null);
      return {
        ...state,
        filter_data: tmp.filter((item: any) => item.video_check_flag !== false),
        loading: false,
      };

    case N_YPP_N_CHECK:
      tmp = state.videos.filter((item: any) => item.video_yt_id == null);
      return {
        ...state,
        filter_data: tmp.filter((item: any) => item.video_check_flag == false),
        loading: false,
      };

    case NFT_CHECK:
      tmp = state.videos.filter((item: any) => item.video_nft_id !== 'No' && item.video_nft_id !== null);
      return {
        ...state,
        filter_data: tmp.filter((item: any) => item.video_check_flag !== false),
        loading: false,
      };

    case NFT_N_CHECK:
      tmp = state.videos.filter((item: any) => item.video_nft_id !== 'No' && item.video_nft_id !== null);
      return {
        ...state,
        filter_data: tmp.filter((item: any) => item.video_check_flag == false),
        loading: false,
      };
    case N_NFT_CHECK:
      tmp = state.videos.filter((item: any) => item.video_nft_id == 'No' || item.video_nft_id == null);
      return {
        ...state,
        filter_data: tmp.filter((item: any) => item.video_check_flag !== false),
        loading: false,
      };

    case N_NFT_N_CHECK:
      tmp = state.videos.filter((item: any) => item.video_nft_id == 'No' || item.video_nft_id == null);
      return {
        ...state,
        filter_data: tmp.filter((item: any) => item.video_check_flag == false),
        loading: false,
      };
    case YPP_NFT_CHECK:
      tmp = state.videos.filter((item: any) => item.video_yt_id !== null);
      tmp1 = tmp.filter((item: any) => item.video_nft_id !== 'No' && item.video_nft_id !== null);
      return {
        ...state,
        filter_data: tmp1.filter((item: any) => item.video_check_flag !== false),
        loading: false,
      };

    case YPP_NFT_N_CHECK:
      tmp = state.videos.filter((item: any) => item.video_yt_id !== null);
      tmp1 = tmp.filter((item: any) => item.video_nft_id !== 'No' && item.video_nft_id !== null);
      return {
        ...state,
        filter_data: tmp1.filter((item: any) => item.video_check_flag == false),
        loading: false,
      };

    case YPP_N_NFT_N_CHECK:
      tmp = state.videos.filter((item: any) => item.video_yt_id !== null);
      tmp1 = tmp.filter((item: any) => item.video_nft_id == 'No' || item.video_nft_id == null);
      return {
        ...state,
        filter_data: tmp1.filter((item: any) => item.video_check_flag == false),
        loading: false,
      };

    case N_YPP_NFT_CHECK:
      tmp = state.videos.filter((item: any) => item.video_yt_id == null);
      tmp1 = tmp.filter((item: any) => item.video_nft_id !== 'No' && item.video_nft_id !== null);
      return {
        ...state,
        filter_data: tmp1.filter((item: any) => item.video_check_flag !== false),
        loading: false,
      };

    case N_YPP_NFT_N_CHECK:
      tmp = state.videos.filter((item: any) => item.video_yt_id == null);
      tmp1 = tmp.filter((item: any) => item.video_nft_id !== 'No' && item.video_nft_id !== null);
      return {
        ...state,
        filter_data: tmp1.filter((item: any) => item.video_check_flag == false),
        loading: false,
      };
    case N_YPP_N_NFT_CHECK:
      tmp = state.videos.filter((item: any) => item.video_yt_id == null);
      tmp1 = tmp.filter((item: any) => item.video_nft_id == 'No' || item.video_nft_id == null);
      return {
        ...state,
        filter_data: tmp1.filter((item: any) => item.video_check_flag !== false),
        loading: false,
      };
    case N_YPP_N_NFT_N_CHECK:
      tmp = state.videos.filter((item: any) => item.video_yt_id == null);
      tmp1 = tmp.filter((item: any) => item.video_nft_id == 'No' || item.video_nft_id == null);
      return {
        ...state,
        filter_data: tmp1.filter((item: any) => item.video_check_flag == false),
        loading: false,
      };

    case YPP_FILTER:
      return {
        ...state,
        filter_data: state.videos.filter((item: any) => item.video_yt_id !== null),
        loading: false,
      };
    case NON_NFT_FILTER:
      return {
        ...state,
        filter_data: state.videos.filter((item: any) => item.video_nft_id == 'No' || item.video_nft_id == null),
        loading: false,
      };
    case CHECKED_FILTER:
      return {
        ...state,
        filter_data: state.videos.filter((item: any) => item.video_check_flag !== false),
        loading: false,
      };
    case ALL_FILTER:
      return {
        ...state,
        filter_data: state.videos,
        loading: false,
      };

    case NON_YPP_FILTER:
      return {
        ...state,
        filter_data: state.videos.filter((item: any) => item.video_yt_id == null),
        loading: false,
      };
    case NFT_FILTER:
      return {
        ...state,
        filter_data: state.videos.filter((item: any) => item.video_nft_id !== 'No' && item.video_nft_id !== null),
        loading: false,
      };
    case NON_CHECKED_FILTER:
      return {
        ...state,
        filter_data: state.videos.filter((item: any) => item.video_check_flag == false),
        loading: false,
      };

    case NEVER_FILTER:
      return {
        ...state,
        filter_data: [],
        loading: false,
      };

    case ASSIGNMENT_VIDEOS:
      return {
        ...state,
        videos: state.videos.map((item: any) => {
          const tmp = payload.selectList.find((id: any) => id == item.key);
          if (tmp) {
            // console.log(tmp, 'item');
            // return item
            return { ...item, video_curator: payload.curator };
          }
          return item;
        }),
        filter_data: state.filter_data.map((item: any) => {
          const tmp = payload.selectList.find((id: any) => id == item.key);
          if (tmp) {
            // console.log(tmp, 'item');
            // return item
            return { ...item, video_curator: payload.curator };
          }
          return item;
        }),
      };

    default:
      return state;
  }
}

export default videoReducer;
