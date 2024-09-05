import { useState, useEffect, useContext } from 'react';
import '../App.css';
import Markdown from 'react-markdown';
import AppContext from '../context/appContext';
import { useNavigate } from 'react-router-dom';

// TODO: Button functionality

function Vote() {
  const [select, setSelect] = useState(-10);
  const appContext = useContext(AppContext);
  const {
    yoe,
    currentPatch,
    currentExplA,
    currentExplB,
    loading,
    complete,
    getInfo,
    setComplete
  } = appContext;
  const navigate = useNavigate();

  const submitPress = () => {
    const selections = ['B', 'Tie', 'A'];
    let s = selections[select + 1];
    console.log('Selected ' + s);
    setSelect(-10);
    getInfo();
  };

  useEffect(() => {
    console.log(yoe);
    if (yoe === -1) {
      navigate('/');
    }

    getInfo();
  }, []);

  useEffect(() => {
    if (complete) {
      alert(
        'You have successfully completed the rankings for this set of explanations!'
      );
      navigate('/exit');
    }
  }, [complete]);

  return (
    <>
      <h1 className='title'>Compare</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className='comparison'>
          <h2>Patch</h2>
          <div className='card code'>
            <div className='display-linebreak'>{currentPatch}</div>
          </div>
          <div className='row'>
            <div className='column'>
              <h3>Explanation A</h3>
              <div className='card'>
                <Markdown>{currentExplA}</Markdown>
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
                <Markdown>{currentExplB}</Markdown>
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
          <br />
          <button
            onClick={() => {
              setComplete();
            }}
          >
            Complete
          </button>
        </div>
      )}
    </>
  );
}

export default Vote;
