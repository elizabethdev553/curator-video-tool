import {
  GET_CURATORS,
  DELETE_CURATOR,
  ADD_CURATOR,
  GET_CURATOR_VIDEOS,
  GET_VIDEO_DETAIL,
  
  } from '../actions/types';

const initialState = {
  videos:[],
 curators:[],
  loading: true,
  error: {},
  video:{}
};

function curatorReducer(state = initialState, action:any) {
  const { type, payload } = action;
  switch (type) {
    case GET_CURATORS:
      // console.log(state, 'videos')
      return {
        ...state,
        curators: payload,
        loading: false,
        
      };
      case GET_CURATOR_VIDEOS:
      return {
        ...state,
        videos: payload,
        // loading: false,
        
      };

      case DELETE_CURATOR:
      return {
        ...state,
        curators: state.curators.filter((curator:any) => curator.email !== payload),
        loading: false
      };
    
      case ADD_CURATOR:
      return {
        ...state,
        curators: [payload, ...state.curators],
        loading: false
      };
      case GET_VIDEO_DETAIL:
        return {
          ...state,
          video: payload,
          loading: false
      };

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

export default curatorReducer;
