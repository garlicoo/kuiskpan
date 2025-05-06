// Result.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Result = ({ name, nip, score, resetScore, limit }) => {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) {
      const saveResult = async () => {
        try {
          const response = await fetch('http://localhost:5000/results', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, nip, score })
          });
          const data = await response.json();
          console.log('Result saved:', data);
          setSaved(true);
        } catch (error) {
          console.error('Error saving result:', error);
        }
      };
      saveResult();
    }
  }, [name, nip, score, saved]);

  return (
    <div className="container">
      <div className="result__container">
        <p className="result">Name: {name}</p>
        <p className="result">Nip: {nip}</p>
        <p className="result">You Scored: {score} out of {limit}</p>
        <Link className="restart" to="/" onClick={resetScore}>Restart</Link>
      </div>
    </div>
  );
};

export default Result;
