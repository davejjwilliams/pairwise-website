import { useState, useEffect, useContext } from 'react';
import '../App.css';
import Markdown from 'react-markdown';
import AppContext from '../context/appContext';
import { useNavigate } from 'react-router-dom';

// TODO: Button functionality

function Vote() {
  const [selection, setSelection] = useState(-10);
  const [comparisons, setComparisons] = useState([]);
  const [currentExpls, setCurrentExpls] = useState([]);
  const appContext = useContext(AppContext);
  const {
    yoe,
    currentPatch,
    currentExplA,
    currentExplB,
    ranking,
    loading,
    complete,
    getInfo,
    setRanking,
    setComplete
  } = appContext;
  const navigate = useNavigate();

  useEffect(() => {
    if (yoe === -1) {
      navigate('/');
    }

    console.log(ranking);
    quickSort(ranking, false);
  }, []);

  useEffect(() => {
    if (currentExpls.length !== 0 && !complete) {
      getInfo(currentExpls[0], currentExpls[1]);
      console.log(
        'useEffect - currentExpls: get next info for: ' + currentExpls
      );
    }
  }, [currentExpls]);

  useEffect(() => {
    if (comparisons.length !== 0) {
      // Attempt quicksort
      console.log('useEffect - comparisons: Attempting Quicksort...');
      let ranked = quickSort(ranking, false);
      console.log(`useEffect - comparisons: Ranked Length = ${ranked.length}`);
      if (ranked !== null && ranked.length === ranking.length) {
        setComplete();
      }
      setSelection(-10);
    }
  }, [comparisons]);

  useEffect(() => {
    if (complete) {
      // Final quicksort
      console.log('useEffect - complete: Ranking Complete! Final Quicksort...');
      let ranked = quickSort(ranking, false);
      console.log('useEffect - complete: Final Ranking:');
      console.log(ranked);
      setRanking(ranked);
      alert(
        'You have successfully completed the rankings for this set of explanations! The final ranking was ' +
          ranked
      );
      navigate('/exit');
    }
  }, [complete]);

  const submitPress = () => {
    if (selection === -10) {
      alert(
        'Please select the explanation you find better before you press submit.'
      );
    } else {
      const newElement = [currentExpls, selection];
      console.log('onPress: newElement is ');
      console.log(newElement);
      setComparisons([...comparisons, newElement]);
      let options = ['A', 'Tie', 'B'];
      console.log('onPress: You selected ' + options[selection + 1]);
    }
  };

  // START QUICKSORT IMPLEMENTATION
  const quickSort = (array, stop) => {
    if (stop) {
      return [];
    }
    if (array.length <= 1) {
      return array;
    }

    var pivot = array[0];

    var left = [];
    var right = [];
    var quit = false;

    for (var i = 1; i < array.length; i++) {
      console.log(`quickSort: Looking for pair ${array[i]} & ${pivot}`);
      let index = findPairIndex(comparisons, array[i], pivot);
      if (index !== -1) {
        let comp = comparisons[index][1];
        comp === 1 ? left.push(array[i]) : right.push(array[i]);
      } else {
        setCurrentExpls([array[i], pivot]);
        quit = true;
        break;
      }
    }

    if (!quit) console.log('quickSort: Needed no pairs!');

    return quickSort(left, quit).concat(pivot, quickSort(right, quit));
  };

  const findPairIndex = (comparisons, item1, item2) => {
    console.log('findPairIndex: Comparisons at entry');
    console.log(comparisons);
    // Iterate over each comparison
    for (let i = 0; i < comparisons.length; i++) {
      let pair = comparisons[i][0]; // The first element is the pair
      // Check if the pair matches item1 and item2
      if (pair[0] === item1 && pair[1] === item2) {
        console.log('findPairIndex: Found Pair!');
        return i; // Return the index if a match is found
      }
    }
    console.log('findPairIndex: Did not find pair!');
    return -1; // Return -1 if no match is found
  };
  // END QUICKSORT IMPLEMENTATION

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
                className={selection === -1 ? 'active' : ''}
                onClick={() => {
                  setSelection(-1);
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
                className={selection === 1 ? 'active' : ''}
                onClick={() => {
                  setSelection(1);
                }}
              >
                B is better
              </button>
            </div>
          </div>
          <button
            className={selection === 0 ? 'active' : ''}
            onClick={() => {
              setSelection(0);
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
