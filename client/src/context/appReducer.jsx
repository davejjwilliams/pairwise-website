import {
  GET_INFO,
  SET_LOADING,
  SET_RANKING,
  SET_COMPLETE,
  SET_DETAILS
} from './types';

const AppReducer = (state, action) => {
  switch (action.type) {
    case SET_DETAILS:
      return {
        ...state,
        title: action.payload.title,
        yoe: action.payload.yoe,
        pyoe: action.payload.pyoe
      };
    case GET_INFO:
      return {
        ...state,
        currentPatch: action.payload.patch,
        currentExplA: action.payload.expls[0],
        currentExplB: action.payload.expls[1],
        loading: false
      };
    case SET_RANKING:
      return {
        ...state,
        ranking: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_COMPLETE:
      return {
        ...state,
        complete: true
      };
    default:
      return state;
  }
};

export default AppReducer;
