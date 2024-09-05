import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Intro() {
  const [title, setTitle] = useState('');
  const [yoe, setYoe] = useState(0);
  const [pyoe, setPyoe] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    console.log(`${title} ${yoe} ${pyoe}`);
    navigate('/vote');
  };

  return (
    <>
      <h1>Welcome</h1>
      <p>
        This website will present you with pairs of explanations for a given
        patch, and your job is to select which one you feel more accurately
        describes the changes (as in, which explanation you would find more
        helpful if you saw this patch in your repository).
      </p>
      <p>
        Before you start, please enter your current title, years of programming
        experience, and years of python experience.
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your title:
          <input
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Enter your years of programming experience:
          <input
            type='number'
            value={yoe}
            onChange={e => setYoe(e.target.value)}
          />
        </label>
        <br />
        <label>
          Enter your years of python programming experience:
          <input
            type='number'
            value={pyoe}
            onChange={e => setPyoe(e.target.value)}
          />
        </label>
        <br />
        <input type='submit' value='Submit' />
      </form>
    </>
  );
}

export default Intro;
