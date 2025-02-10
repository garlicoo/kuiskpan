import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Option from "./Option";

const Container = ({ name, handleScore, handleLimit }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://api-backend-beige.vercel.app/quiz")
      .then((response) => response.json())
      .then((data) => {
        const parsedData = data.map((question) => ({
          ...question,
          options: JSON.parse(question.options),
        }));
        const limitQuestion = shuffleArray(parsedData).slice(0, 10);
        setData(limitQuestion);
        handleLimit(limitQuestion.length);
        console.log(limitQuestion);
      });
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showResult, setShowResult] = useState(false);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = data[count];
  const answer = currentQuestion.answer;

  const handleSubmit = (e) => {
    if (e.target.textContent === answer) {
      handleScore();
    }
    setSelected(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowVideo(true);
    }, 1000);
  };

  const handleNextVideo = () => {
    setShowVideo(false);
    if (count + 1 < data.length) {
      setCount(count + 1);
      setSelected(false);
    } else {
      setShowResult(true);
      navigate("/result", { state: { name } });
    }
  };

  if (!name) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container">
      {loading && (
        <div className="skeleton-container">
          <div className="question__container">
            <div
              className="skeleton skeleton-text"
              style={{ width: "40%", height: "30px", marginBottom: "10px" }}
            ></div>
            <div
              className="skeleton skeleton-text"
              style={{ height: "8px", marginBottom: "8px" }}
            ></div>
            <div
              className="skeleton skeleton-text"
              style={{ height: "25px" }}
            ></div>
          </div>
          <div className="answer__container">
            <div className="skeleton skeleton-answer"></div>
            <div className="skeleton skeleton-answer"></div>
            <div className="skeleton skeleton-answer"></div>
            <div className="skeleton skeleton-answer"></div>
          </div>
        </div>
      )}
      {!loading && (
        <div>
          {!showVideo && !showResult && (
            <div>
              <div className="question__container">
                <h1 className="question__count">Question - {count + 1}</h1>
                <hr className="hr-line" />
                <img
                  src={`https://admin-panel-teal-nine.vercel.app/${currentQuestion.image}`}
                  alt="question"
                  className="question__image"
                />
                <h3 className="question">{currentQuestion.question}</h3>
                <hr
                  style={{
                    color: "#fcba03",
                    backgroundColor: "#fcba03",
                    height: 0.1,
                    borderColor: "#fcba03",
                  }}
                />
              </div>
              <div className="answer__container">
                {currentQuestion.options.map((opt) => (
                  <Option
                    key={opt.id}
                    opt={opt}
                    selected={selected}
                    handleSubmit={handleSubmit}
                  />
                ))}
              </div>
            </div>
          )}
          {showVideo && (
            <div className="video-container">
              <h2 className="titleVideo">Jawaban Soal Nomor {count + 1}</h2>
              <iframe
                width="560"
                height="315"
                src={`https://admin-panel-teal-nine.vercel.app/${currentQuestion.video}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button onClick={handleNextVideo} className="next-button">
                Next
              </button>
            </div>
          )}
          {showResult && (
            <div className="result-container">
              <h2>Result</h2>
              <p>Thank you for participating, {name}!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Container;
