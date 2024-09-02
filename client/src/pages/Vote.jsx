import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

// TODO: Fix formatting
// TODO: Wrap patch in horizontally scrollable element
// TODO: Wrap explanations in markdown parser
// TODO: Button functionality

function Vote() {
  const [patch, setPatch] = useState('');
  const [explA, setExplA] = useState('');
  const [explB, setExplB] = useState('');

  const fetchAPI = async () => {
    const response = await axios.get('/api/patch');
    setPatch(response.data.patch);
    setExplA(response.data.expls[0]);
    setExplB(response.data.expls[1]);
    console.log(response.data);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <h1>Compare</h1>
      {patch === '' ? (
        'Loading...'
      ) : (
        <>
          <h2>Patch</h2>
          <p>{patch}</p>
          <h3>Explanation A</h3>
          <p>{explA}</p>
          <h3>Explanation B</h3>
          <p>{explB}</p>
          <button>A is better</button>
          <button>Tie</button>
          <button>B is better</button>
        </>
      )}
    </>
  );
}

export default Vote;
