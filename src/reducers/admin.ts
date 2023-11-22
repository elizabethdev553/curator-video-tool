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
  SET_DATE
} from '../actions/types';
const today = new Date();

const year = String(today.getFullYear()).slice(-2);
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');

const TODAY = `20${year}-${month}-${day}`;

const initialState = {
  videos: null,
  video: null,
  loading: true,
  error: {},
  sel_date: TODAY
};

function videoReducer(state = initialState, action:any) {
  const { type, payload } = action;

  switch (type) {
    case GET_VIDEOS:
      return {
        ...state,
        videos: payload,
        loading: false,
        
      };
      case SET_DATE:
      return {
        ...state,
        sel_date:payload
        
      };
      // case GET_VIDEOS:
      //   return {
      //     ...state,
      //     videos: payload,
      //     loading: false
      // };

    // case SET_LOADING:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case GET_VIDEO:
    //   return {
    //     ...state,
    //     video: payload,
    //     loading: false
    //   };
    // case ADD_VIDEO:
    //   return {
    //     ...state,
    //     videos: [payload, ...state.videos],
    //     loading: false
    //   };
    // case DELETE_VIDEO:
    //   return {
    //     ...state,
    //     videos: state.videos.filter((video) => video._id !== payload),
    //     loading: false
    //   };
    // case VIDEO_ERROR:
    //   return {
    //     ...state,
    //     error: payload,
    //     loading: false
    //   };
    // case UPDATE_LIKES:
    //   return {
    //     ...state,
    //     videos: state.videos.map((video) =>
    //       video._id === payload.id ? { ...video, likes: payload.likes } : video
    //     ),
    //     loading: false
    //   };
    // case ADD_COMMENT:
    //   return {
    //     ...state,
    //     video: { ...state.video, comments: payload },
    //     loading: false
    //   };
    // case REMOVE_COMMENT:
    //   return {
    //     ...state,
    //     video: {
    //       ...state.video,
    //       comments: state.video.comments.filter(
    //         (comment) => comment._id !== payload
    //       )
    //     },
    //     loading: false
    //   };
    default:
      return state;
  }
}

export default videoReducer;
