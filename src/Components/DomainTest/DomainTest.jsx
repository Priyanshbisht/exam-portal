import React, { useState, useEffect } from 'react';
import './DomainTest.css';
import { useParams, useNavigate } from 'react-router-dom';

const questions = Array.from({ length: 10 }, (_, i) => ({
  question: `Question ${i + 1}: What is ${i + 1} + ${i + 1}?`,
  options: [i + 1, i + 2, (i + 1) * 2, (i + 1) + 3],
  answer: (i + 1) * 2,
}));

const DomainTest = () => {
  const { domainId } = useParams();
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

  useEffect(() => {
    if (showResult) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowResult(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showResult]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleOptionSelect = (option) => {
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestion]: option,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedOptions[idx] === q.answer) {
        correct++;
      }
    });
    return { correct, percentage: Math.round((correct / questions.length) * 100) };
  };

  const result = calculateResults();

  return (
    <div className="domain-container">
      <div className="question-card">
        <div className="header">
          <h2>{domainId} Test</h2>
          <div className={`timer ${timeLeft < 60 ? 'danger' : ''}`}>
            ⏳ {formatTime(timeLeft)}
          </div>
        </div>

        {showResult ? (
          <div className="result-section">
            <h3>✅ Test Submitted!</h3>
            <p>Correct Answers: {result.correct} / {questions.length}</p>
            <p>Score: {result.percentage}%</p>
            <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
          </div>
        ) : (
          <>
            <p className="question"><strong>{questions[currentQuestion].question}</strong></p>
            <div className="options">
              {questions[currentQuestion].options.map((option, idx) => (
                <div key={idx} className="option">
                  <input
                    type="radio"
                    name={`q-${currentQuestion}`}
                    checked={selectedOptions[currentQuestion] === option}
                    onChange={() => handleOptionSelect(option)}
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>

            <div className="navigation-buttons">
              <button onClick={handleBack} disabled={currentQuestion === 0}>Back</button>
              <button onClick={handleNext}>
                {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DomainTest;
