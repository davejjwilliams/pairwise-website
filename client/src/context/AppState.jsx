import { useReducer } from 'react';
import AppReducer from './appReducer';
import AppContext from './appContext';
import axios from 'axios';
import { GET_INFO, SET_LOADING } from './types';

function AppState(props) {
  const initialState = {
    instanceId: '',
    ranking: [1, 2, 3],
    currentPatch: '',
    currentExplA: '',
    currentExplB: '',
    loading: true
  };

  function sample(arr, count) {
    const scrambled = arr.sort(() => Math.random() - 0.5);
    return scrambled.slice(0, count);
  }

  const [state, dispatch] = useReducer(AppReducer, initialState);

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

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <AppContext.Provider
      value={{
        instanceId: state.instanceId,
        ranking: state.ranking,
        currentPatch: state.currentPatch,
        currentExplA: state.currentExplA,
        currentExplB: state.currentExplB,
        loading: state.loading,
        getInfo
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppState;
