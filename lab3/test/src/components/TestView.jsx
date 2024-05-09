import React, { useState } from 'react';
import TestQuestion from './TestQestion';

const TestView = ({ test, onFinishTest }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState({});

  const handleAnswerSelected = (questionId, isCorrect) => {
    setResults((prevResults) => ({
      ...prevResults,
      [questionId]: isCorrect,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onFinishTest(results);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div>
    <TestQuestion
      question={test.questions[currentQuestionIndex]}
      onAnswerSelected={handleAnswerSelected}
    />
    <div>
      <button
        onClick={handlePreviousQuestion}
        disabled={currentQuestionIndex === 0}
      >
        Попереднє питання
      </button>
      <button onClick={handleNextQuestion}>
        {currentQuestionIndex < test.questions.length - 1 ? 'Наступне питання' : 'Завершити тест'}
      </button>
    </div>
  </div>
  );
};

export default TestView;
