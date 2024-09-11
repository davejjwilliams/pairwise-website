import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/appContext';

function Thanks() {
  const appContext = useContext(AppContext);
  const { submitted } = appContext;

  const navigate = useNavigate();

  useEffect(() => {
    if (!submitted) {
      navigate('/vote');
    }
  }, []);

  return <h1>Thank you! 🎉</h1>;
}

export default Thanks;
