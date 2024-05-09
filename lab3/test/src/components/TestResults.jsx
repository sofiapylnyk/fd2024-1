import React from 'react';

const TestResults = ({ correctAnswers, totalQuestions, onRestart }) => {
  return (
    <div>
      <h2>Результати тесту</h2>
      <p>Ви відповіли правильно на {correctAnswers} з {totalQuestions} питань.</p>
      <button onClick={onRestart}>Повернутися до вибору тестів</button>
    </div>
  );
};

export default TestResults;
