import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import Markdown from 'react-markdown';

// TODO: Button functionality

function Vote() {
  const [patch, setPatch] = useState('');
  const [explA, setExplA] = useState('');
  const [explB, setExplB] = useState('');
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState(-10);

  const fetchAPI = async () => {
    setLoading(true);
    const response = await axios.get('/api/patch');
    setPatch(response.data.patch);
    setExplA(response.data.expls[0]);
    setExplB(response.data.expls[1]);
    setLoading(false);
  };

  const submitPress = () => {
    const selections = ['B', 'Tie', 'A'];
    let s = selections[select + 1];
    console.log('Selected ' + s);
    setSelect(-10);
    fetchAPI();
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <h1>Compare</h1>
      {loading ? (
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
              <button
                className={select === 1 ? 'active' : ''}
                onClick={() => {
                  setSelect(1);
                }}
              >
                A is better
              </button>
            </div>
            <div className='column'>
              <h3>Explanation B</h3>
              <div className='card'>
                <Markdown>{explB}</Markdown>
              </div>
              <br />
              <button
                className={select === -1 ? 'active' : ''}
                onClick={() => {
                  setSelect(-1);
                }}
              >
                B is better
              </button>
            </div>
          </div>
          <button
            className={select === 0 ? 'active' : ''}
            onClick={() => {
              setSelect(0);
            }}
          >
            Tie
          </button>
          <br />
          <button
            onClick={() => {
              submitPress();
            }}
          >
            Submit
          </button>
        </div>
      )}
    </>
  );
}

export default Vote;
