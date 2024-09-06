import { useContext, useEffect, useState } from 'react';
import AppContext from '../context/appContext';
import { useNavigate } from 'react-router-dom';

function ExitFeedback() {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const { complete, submitRanking } = appContext;
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

  return (
    <div>
      <h1>ExitFeedback</h1>
      <p>
        Thank you for completing the ranking. Could you please provide a brief
        description (2-3 sentences/points) of how you picked the best prompts.
        This could be how you prioritised length over correctness, etc. etc.
      </p>
      <form onSubmit={handleSubmit}>
        <label>Enter your title:</label>
        <br />
        <textarea
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
        />
        <br />
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
}

export default ExitFeedback;
