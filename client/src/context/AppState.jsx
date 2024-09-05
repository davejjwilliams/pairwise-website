import { useReducer } from 'react';
import AppReducer from './appReducer';
import AppContext from './appContext';
import axios from 'axios';
import { SET_DETAILS, GET_INFO, SET_LOADING, SET_COMPLETE } from './types';

function AppState(props) {
  const initialState = {
    title: '',
    yoe: -1,
    pyoe: -1,
    instanceId: '',
    ranking: [1, 2, 3],
    currentPatch: '',
    currentExplA: '',
    currentExplB: '',
    loading: true,
    complete: false
  };

  function sample(arr, count) {
    const scrambled = arr.sort(() => Math.random() - 0.5);
    return scrambled.slice(0, count);
  }

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
  const getInfo = async () => {
    setLoading();

    const expls = [1, 2, 3];
    const patches = ['astropy__astropy-12907', 'django__django-11141'];
    const selected_patch = sample(patches, 1)[0];
    const selected_expls = sample(expls, 2);

    const response = await axios.post('/api/patch', {
      instanceId: selected_patch,
      idExplA: selected_expls[0],
      idExplB: selected_expls[1]
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
        setComplete,
        submitRanking
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppState;
