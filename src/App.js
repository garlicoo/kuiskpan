import { useState } from 'react';
import './App.css';
import Container from './components/Container';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Result from './components/Result';
import Home from './components/home';

function App() {
  const [score, setScore] = useState(0);
  const [limit, setLimit] = useState(0);
  const [name, setName] = useState('');

  const handleScore = () => {
    setScore(score + 1);
  };

  const resetScore = () => {
    setScore(0);
  };

  const handleLimit = (value) => {
    setLimit(value);
  };

  return (
    <div className='main'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home setName={setName} />}/>
          <Route 
            path="/quiz" 
            element={<Container name={name} handleScore={handleScore} handleLimit={handleLimit}/>} 
          />
          <Route 
            path="/result" 
            element={<Result name={name} score={score} resetScore={resetScore} limit={limit}/>} 
          />
        </Routes>
      </BrowserRouter>
    </div>  
  );
}

export default App;
