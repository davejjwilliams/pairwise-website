import { GET_INFO, SET_LOADING } from './types';

const AppReducer = (state, action) => {
  switch (action.type) {
    case GET_INFO:
      return {
        ...state,
        currentPatch: action.payload.patch,
        currentExplA: action.payload.expls[0],
        currentExplB: action.payload.expls[1],
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default AppReducer;
