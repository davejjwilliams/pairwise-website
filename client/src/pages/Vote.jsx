import { useState, useEffect, useContext } from 'react';
import '../App.css';
import Markdown from 'react-markdown';
import AppContext from '../context/appContext';

// TODO: Button functionality

function Vote() {
  const [select, setSelect] = useState(-10);

  const appContext = useContext(AppContext);

  const { currentPatch, currentExplA, currentExplB, loading, getInfo } =
    appContext;

  const submitPress = () => {
    const selections = ['B', 'Tie', 'A'];
    let s = selections[select + 1];
    console.log('Selected ' + s);
    setSelect(-10);
    getInfo();
  };

  useEffect(() => {
    getInfo();
  }, []);

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
        </div>
      )}
    </>
  );
}

export default Vote;
