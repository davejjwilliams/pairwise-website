import { useReducer } from 'react';
import AppReducer from './appReducer';
import AppContext from './appContext';
import axios from 'axios';
import {
  SET_DETAILS,
  GET_INFO,
  SET_RANKING,
  SET_LOADING,
  SET_COMPLETE,
  SET_SUBMITTED
} from './types';

function AppState(props) {
  const initialState = {
    title: '',
    yoe: -1,
    pyoe: -1,
    instanceId: '',
    ranking: [1, 2, 3, 4, 5, 6],
    currentPatch: '',
    currentExplA: '',
    currentExplB: '',
    loading: true,
    complete: false,
    submitted: false
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Set user details
  const setDetails = (title, yoe, pyoe, instanceId) => {
    const details = {
      title: title,
      yoe: yoe,
      pyoe: pyoe,
      instanceId: instanceId
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
  const submitRanking = async desc => {
    const response = await axios.post('/api/end', {
      instanceId: state.instanceId,
      ranking: state.ranking,
      description: desc,
      title: state.title,
      yoe: state.yoe,
      pyoe: state.pyoe
    });

    setSubmitted();
  };

  const setRanking = ranking =>
    dispatch({ type: SET_RANKING, payload: ranking });

  const setLoading = () => dispatch({ type: SET_LOADING });

  const setComplete = () => dispatch({ type: SET_COMPLETE });

  const setSubmitted = () => dispatch({ type: SET_SUBMITTED });

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
        submitted: state.submitted,
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
