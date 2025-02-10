// Result.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Result = ({ name, score, resetScore, limit }) => {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) {
      const saveResult = async () => {
        try {
          const response = await fetch('https://api-backend-git-main-toriqs-projects-6abf52de.vercel.app/results', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, score })
          });
          const data = await response.json();
          console.log('Result saved:', data);
          setSaved(true); // Set the flag to true after the result is saved
        } catch (error) {
          console.error('Error saving result:', error);
        }
      };
      saveResult();
    }
  }, [name, score, saved]);

  return (
    <div className="container">
      <div className="result__container">
        <p className="result">Name: {name}</p>
        <p className="result">You Scored: {score} out of {limit}</p>
        <Link className="restart" to="/" onClick={resetScore}>Restart</Link>
      </div>
    </div>
  );
};

export default Result;
