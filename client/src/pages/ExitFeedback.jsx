import { useContext, useEffect, useState } from 'react';
import AppContext from '../context/appContext';
import { useNavigate } from 'react-router-dom';

function ExitFeedback() {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const { complete, submitted, submitRanking } = appContext;
  const [feedback, setFeedback] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    console.log(`${feedback}`);
    submitRanking(feedback);
  };

  useEffect(() => {
    if (!complete) {
      alert('Please complete the ranking first!');
      navigate('/vote');
    }
  }, []);

  useEffect(() => {
    if (submitted) {
      navigate('/thanks');
    }
  }, [submitted]);

  return (
    <div>
      <h1>Exit Feedback</h1>
      <p>
        Thank you for completing the ranking! Before submitting, could you
        please provide a brief description (2-3 sentences/points) of how you
        picked the best prompts? This could be how you prioritised length over
        correctness, etc. etc.
      </p>
      <form onSubmit={handleSubmit}>
        <label>Enter:</label>
        <br />
        <textarea
          value={feedback}
          style={{
            width: '50vw',
            height: '10vh'
          }}
          onChange={e => setFeedback(e.target.value)}
        />
        <br />
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
}

export default ExitFeedback;
