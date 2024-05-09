import React, { useState } from 'react';

const Test = ({ questions, onCompletion }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleAnswer = (answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = answer;
    setAnswers(updatedAnswers);
  };

  const goToNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const correctAnswers = answers.filter(
        (ans) => ans && ans.isCorrect
      ).length;
      onCompletion({ score: correctAnswers, total: questions.length });
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div>
      <h2>{currentQuestion.question}</h2>
      <ul>
        {currentQuestion.answers.map((answer, index) => (
          <li key={index}>
            <button
              style={{
                background:
                  answers[currentIndex] === answer ? 'lightgray' : 'white',
                color: 'black'
              }}
              onClick={() => handleAnswer(answer)}
            >
              {answer.answer}
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={goToPrevious} disabled={currentIndex <= 0}>
          Попереднє
        </button>
        <button onClick={goToNext}>
          {currentIndex < questions.length - 1 ? 'Наступне' : 'Завершити'}
        </button>
      </div>
    </div>
  );
};

export default Test;
