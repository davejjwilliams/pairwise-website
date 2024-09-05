import React, { useContext, useEffect } from 'react';
import AppContext from '../context/appContext';
import { useNavigate } from 'react-router-dom';

function ExitFeedback() {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const { complete } = appContext;

  useEffect(() => {
    if (!complete) {
      alert('Please complete the ranking first!');
      navigate('/vote');
    }
  }, []);

  return <div>ExitFeedback</div>;
}

export default ExitFeedback;
