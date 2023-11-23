import {
  GET_VIDEOS,
  VIDEO_ERROR,
  UPDATE_LIKES,
  DELETE_VIDEO,
  ADD_VIDEO,
  GET_VIDEO,
  ADD_COMMENT,
  REMOVE_COMMENT,
  SET_LOADING,
  SET_DATE,
  GET_CURATORS,
  ALL_FILTER,
  YPP_FILTER,
  CHECKED_FILTER,
  NFT_FILTER,
  ASSIGNMENT_VIDEOS,
  NON_YPP_FILTER,
  NON_NFT_FILTER,
  NON_CHECKED_FILTER
  } from '../actions/types';
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
  filter_data:null,
  all_num:null,
  ypp_num:null,
  nft_num:null,
  check_num:null,
  start:null,
  end:null
};

function videoReducer(state = initialState, action:any) {
  const { type, payload } = action;
  switch (type) {
    case GET_VIDEOS:
      console.log(state, 'videos')
      return {
        ...state,
        videos: payload,
        filter_data:payload,
        loading: false,
        all_num: payload.length,
        ypp_num: payload.filter((item:any) => item.video_yt_id !== null).length,
        nft_num: payload.filter((item:any) => item.video_nft_id != 'No'&& item.video_nft_id != null).length,
        check_num:payload.filter((item:any) => item.video_check_flag !== false).length,
        start:payload[0],
        end:payload[1]
        
      };
      case SET_DATE:
      return {
        ...state,
        sel_date:payload,
        loading:true
        
      };
      case GET_CURATORS:
      return {
        ...state,
        curators:payload,
      };
      case YPP_FILTER:
      return {
        ...state,
        filter_data: state.videos.filter((item:any) => item.video_yt_id !== null),
        loading: false,

      };
      case NON_NFT_FILTER:
      return {
        ...state,
        filter_data: state.videos.filter((item:any) =>  item.video_nft_id != 'No'|| item.video_nft_id != null),
        loading: false,

      };
      case CHECKED_FILTER:
      return {
        ...state,
        filter_data: state.videos.filter((item:any) => item.video_check_flag !== false),
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
        filter_data: state.videos.filter((item:any) => item.video_yt_id == null),
        loading: false,

      };
      case NFT_FILTER:
      return {
        ...state,
        filter_data: state.videos.filter((item:any) =>  item.video_nft_id !== 'No'&& item.video_nft_id !== null),
        loading: false,

      };
      case NON_CHECKED_FILTER:
      return {
        ...state,
        filter_data: state.videos.filter((item:any) => item.video_check_flag == false),
        loading: false,

      };
      case ASSIGNMENT_VIDEOS:
        return {
          ...state,
          filter_data: state.videos.map((item:any)=>{
            const tmp = payload.selectList.find((id:any) => id == item.key)
            if (tmp) {
              console.log(tmp, "item")
              // return item
              return { ...item, video_curator: payload.curator };
            }
            return item
          }),
          loading: false,

        };
   
    default:
      return state;
  }
}

export default videoReducer;
