import { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css"

function Vote() {
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get('/api/users');
    setArray(response.data.users);
    console.log(response.data.users);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <h1>Compare</h1>
      {array.length === 0 ? 'Loading...' : 'Loaded!'}
      <div className='card'>
        {array.map((user, index) => (
          <div key={index}>
            <span>{user}</span>
            <br />
          </div>
        ))}
      </div>
    </>
  );
}

export default Vote;
