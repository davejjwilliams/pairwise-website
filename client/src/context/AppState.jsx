import { useReducer } from 'react';
import AppReducer from './appReducer';
import AppContext from './appContext';
import axios from 'axios';
import {
  SET_DETAILS,
  GET_INFO,
  SET_RANKING,
  SET_LOADING,
  SET_COMPLETE
} from './types';

function AppState(props) {
  const initialState = {
    title: '',
    yoe: -1,
    pyoe: -1,
    instanceId: 'astropy__astropy-12907', // Update
    ranking: [1, 2, 3, 4, 5, 6],
    currentPatch: '',
    currentExplA: '',
    currentExplB: '',
    loading: true,
    complete: false
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Set user details
  const setDetails = (title, yoe, pyoe) => {
    const details = {
      title: title,
      yoe: yoe,
      pyoe: pyoe
    };

    dispatch({ type: SET_DETAILS, payload: details });
  };

  // Get Info
  const getInfo = async (idA, idB) => {
    setLoading();

    const response = await axios.post('/api/patch', {
      instanceId: state.instanceId,
      idExplA: idA,
      idExplB: idB
    });

    dispatch({ type: GET_INFO, payload: response.data });
  };

  // Send ranking to server
  const submitRanking = async fb => {
    const response = await axios.post('/api/end', {
      title: state.title,
      yoe: state.yoe,
      pyoe: state.pyoe,
      instanceId: state.instanceId,
      ranking: state.ranking,
      feedback: fb
    });

    alert(response.data.success);
  };

  const setRanking = ranking =>
    dispatch({ type: SET_RANKING, payload: ranking });

  const setLoading = () => dispatch({ type: SET_LOADING });

  const setComplete = () => dispatch({ type: SET_COMPLETE });

  return (
    <AppContext.Provider
      value={{
        title: state.title,
        yoe: state.yoe,
        pyoe: state.pyoe,
        instanceId: state.instanceId,
        ranking: state.ranking,
        currentPatch: state.currentPatch,
        currentExplA: state.currentExplA,
        currentExplB: state.currentExplB,
        loading: state.loading,
        complete: state.complete,
        feedback: state.feedback,
        setDetails,
        getInfo,
        setRanking,
        setComplete,
        submitRanking
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppState;
