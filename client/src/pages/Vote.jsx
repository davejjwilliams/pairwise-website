import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import Markdown from 'react-markdown';

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
        <div className='comparison'>
          <h2>Patch</h2>
          <div className='card code'>
            <div className='display-linebreak'>{patch}</div>
          </div>
          <div className='row'>
            <div className='column'>
              <h3>Explanation A</h3>
              <div className='card'>
                <Markdown>{explA}</Markdown>
              </div>
              <br />
              <button>A is better</button>
            </div>
            <div className='column'>
              <h3>Explanation B</h3>
              <div className='card'>
                <Markdown>{explB}</Markdown>
              </div>
              <br />
              <button>B is better</button>
            </div>
          </div>
          <button>Tie</button>
        </div>
      )}
    </>
  );
}

export default Vote;
